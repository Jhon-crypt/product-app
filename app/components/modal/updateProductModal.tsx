"use client"
import ProductForm from "../form/productForm"
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateProduct } from '@/app/store/slice/productsSlice';
import { AppDispatch } from '@/app/store/store';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

interface UpdateProductModalProps {
    product: {
        id: string;
        name: string;
        quantity: number;
        category: string;
        price: number;
        units_available: number;
    };
}

const UpdateProductModal = ({ product }: UpdateProductModalProps) => {
    const dispatch: AppDispatch = useDispatch();
    const [currentProduct, setCurrentProduct] = useState(product);

    useEffect(() => {
        setCurrentProduct(product);
    }, [product]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setCurrentProduct({
            ...currentProduct,
            [e.target.name]: e.target.value,
        });
    };

    const validateProduct = (product: typeof currentProduct): string | null => {
        if (!product.name) return "Product name is required";
        if (product.quantity <= 0) return "Product quantity must be greater than 0";
        if (!product.category) return "Category is required";
        if (product.price <= 0) return "Price must be greater than 0";
        if (product.units_available <= 0) return "Units available must be greater than 0";
        return null;
    };

    const handleSubmit = async () => {
        const validationError = validateProduct(currentProduct);
        if (validationError) {
            toast.error(validationError, { position: "top-right" });
            return;
        }

        try {
            await dispatch(updateProduct(currentProduct)).unwrap();
            toast.success("Product updated successfully!", { position: "top-right" });
        } catch (err) {
            toast.error("Failed to update product", { position: "top-right" });
        }
    }

    return (

        <>

            <div className="modal fade" id="updateProductModal" aria-labelledby="updateProductModal" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Update Product</h1>
                            <button type="button" className="btn-close btn-rounded" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                        <ProductForm product={currentProduct} handleChange={handleChange} />
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

    )

}

export default UpdateProductModal;
