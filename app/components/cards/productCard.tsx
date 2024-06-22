import { CiEdit, CiTrash } from 'react-icons/ci';
import '../../style/productCard.css'

interface Product {
    id: string;
    name: string;
    quantity: number;
    category: string;
    price: number;
    units_available: number;
}

interface ProductCardProps {
    product: Product;
    deleteProduct: (id: string) => void;
}

export default function ProductCard({ product, deleteProduct }: ProductCardProps) {
    return (
        <div className="card custom-card card-rounded" style={{ width: "200px" }}>
            <div className="custom-card-body card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">category: {product.category}</p>
                <p>price: ${product.price}</p>
                <p>quantity: {product.quantity}</p>
                <p>unit: {product.units_available}</p>
            </div>
            <div className='card-footer'>
                <a href="#" className="card-link btn btn-sm btn-outline-dark"><CiEdit /></a>
                <a href="#" className="card-link btn btn-sm btn-outline-dark" onClick={() => deleteProduct(product.id)}><CiTrash /></a>
            </div>
        </div>
    );
}
