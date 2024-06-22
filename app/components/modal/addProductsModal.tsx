"use client"

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createProduct } from '@/app/store/slice/productsSlice';
import { AppDispatch } from '@/app/store/store';
import { ToastContainer, toast } from 'react-toastify';
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

interface ProductFormProps {
    product: Product;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const ProductForm = ({ product, handleChange }: ProductFormProps) => (
    <form>
        <div className="row">
            <div className="col">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Product name</label>
                    <input type="text" className="form-control" name="name" value={product.name} onChange={handleChange} placeholder="E.g Ps5" />
                </div>
            </div>
            <div className="col">
                <div className="mb-3">
                    <label htmlFor="quantity" className="form-label">Product Quantity</label>
                    <input type="number" className="form-control" name="quantity" value={product.quantity} onChange={handleChange} placeholder="E.g 5" />
                </div>
            </div>
        </div>

        <div className="row">
            <div className="col">
                <div className="mb-3">
                    <label htmlFor="category" className="form-label">Category</label>
                    <select className="form-select" name="category" value={product.category} onChange={handleChange}>
                        <option value="" disabled>Category</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Home Appliance">Home Appliance</option>
                        <option value="Fashion">Fashion</option>
                        <option value="Beauty and Personal Care">Beauty and Personal Care</option>
                        <option value="Health and Wellness">Health and Wellness</option>
                        <option value="Home and Furniture">Home and Furniture</option>
                        <option value="Groceries">Groceries</option>
                        <option value="Sports and Outdoors">Sports and Outdoors</option>
                    </select>
                </div>
            </div>
            <div className="col">
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Price</label>
                    <input type="number" className="form-control" name="price" value={product.price} onChange={handleChange} placeholder="E.g 400" />
                </div>
            </div>
        </div>

        <div className="row">
            <div className="col">
                <div className="mb-3">
                    <label htmlFor="units_available" className="form-label">Units Available</label>
                    <input type="number" className="form-control" name="units_available" value={product.units_available} onChange={handleChange} placeholder="E.g 2" />
                </div>
            </div>
        </div>
    </form>
);
