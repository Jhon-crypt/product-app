// store/productsSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface Product {
    id: string;
    name: string;
    quantity: number;
    category: string;
    price: number;
    units_available: number;
}

interface ProductsState {
    products: Product[];
    loading: boolean;
    error: string | null;
}

const initialState: ProductsState = {
    products: [],
    loading: false,
    error: null,
};

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await fetch('https://inventory.free.beeceptor.com/api/inventory');
    const data = await response.json();
    return data;
});

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (productId: string) => {
    await fetch(`https://inventory.free.beeceptor.com/api/inventory/${productId}`, {
        method: 'DELETE',
    });
    return productId;
});

export const createProduct = createAsyncThunk('products/createProduct', async (product: Omit<Product, 'id'>) => {
    const response = await fetch('https://inventory.free.beeceptor.com/api/inventory', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
    });
    const data = await response.json();
    return data;
});

export const updateProduct = createAsyncThunk('products/updateProduct', async (product: Product) => {
    const response = await fetch(`https://inventory.free.beeceptor.com/api/inventory/${product.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
    });
    if (!response.ok) {
        throw new Error('Failed to update product');
    }
    const data = await response.json();
    return data;
});

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //Fetch
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch products';
            })
            //delete
            .addCase(deleteProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products = state.products.filter(product => product.id !== action.payload);
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to delete product';
            })
            //create
            .addCase(createProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products.push(action.payload);
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to create product';
            })
            //update
            .addCase(updateProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                const index = state.products.findIndex(product => product.id === action.payload.id);
                if (index !== -1) {
                    state.products[index] = action.payload;
                }
                state.loading = false;
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to update product';
            });
    },
});

export default productsSlice.reducer;
