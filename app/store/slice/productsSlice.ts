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

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
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
            });
    },
});

export default productsSlice.reducer;
