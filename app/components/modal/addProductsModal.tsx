"use client"

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createProduct } from '@/app/store/slice/productsSlice';
import { AppDispatch } from '@/app/store/store';
import { ToastContainer, toast } from 'react-toastify';
import ProductForm from '../form/productForm';
import "react-toastify/dist/ReactToastify.css";

interface Product {
    name: string;
    quantity: number;
    category: string;
    price: number;
    units_available: number;
}

const initialProductState: Product = {
    name: '',
    quantity: 0,
    category: '',
    price: 0,
    units_available: 0,
};

export default function AddProductsModal() {
    const dispatch: AppDispatch = useDispatch();
    const [product, setProduct] = useState<Product>(initialProductState);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value,
        });
    };

    const validateProduct = (product: Product): string | null => {
        if (!product.name) return "Product name is required";
        if (product.quantity <= 0) return "Product quantity must be greater than 0";
        if (!product.category) return "Category is required";
        if (product.price <= 0) return "Price must be greater than 0";
        if (product.units_available <= 0) return "Units available must be greater than 0";
        return null;
    };

    const handleSubmit = async () => {
        const validationError = validateProduct(product);
        if (validationError) {
            toast.error(validationError, { position: "top-right" });
            return;
        }

        try {
            await dispatch(createProduct(product)).unwrap();
            toast.success("Product created successfully!", { position: "top-right" });
            setProduct(initialProductState); 
        } catch (err) {
            toast.error("Failed to create product", { position: "top-right" });
        }
    };

    return (
        <>
            <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Add Products</h1>
                            <button type="button" className="btn-close btn-rounded" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <ProductForm product={product} handleChange={handleChange} />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary btn-rounded py-2 px-3" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary btn-rounded py-2 px-3" onClick={handleSubmit} data-bs-dismiss="modal">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}

