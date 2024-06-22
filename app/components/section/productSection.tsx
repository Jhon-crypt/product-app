// components/section/productSection.tsx
'use client';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { fetchProducts, deleteProduct } from '@/app/store/slice/productsSlice';
import { Oval } from 'react-loader-spinner';
import ProductCard from '../cards/productCard';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";



export default function ProductSection() {
    const dispatch: AppDispatch = useDispatch();
    const { products, loading, error } = useSelector((state: RootState) => state.products);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleDeleteProduct = async (id: string) => {
        try {
            await dispatch(deleteProduct(id)).unwrap();
            toast.success("Product deleted", {
                position: "top-right"
            });
        } catch (error) {
            toast.error("Failed to delete product", {
                position: "top-right",
            });
        }
        

    };

    if (loading) return <>
        <div className="mt-4 d-flex justify-content-center align-content-center">
            <Oval
                visible={true}
                height="80"
                width="80"
                color="black"
                ariaLabel="oval-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    </>;
    if (error) return <p>Error: {error}</p>;

    return (
        <>
            <div className="container mt-5 mb-4">
                <div className="d-flex align-content-center justify-content-center">
                    <div className="row">
                        {products.map((product) => (
                            <div className="col mb-4" key={product.id}>
                                <ProductCard product={product} deleteProduct={handleDeleteProduct} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}
