interface Product {
    name: string;
    quantity: number;
    category: string;
    price: number;
    units_available: number;
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
                        <option value="Appliance">Appliance</option>
                        <option value="Fashion">Fashion</option>
                        <option value="Care">Care</option>
                        <option value="Health">Health</option>
                        <option value="Furniture">Furniture</option>
                        <option value="Groceries">Groceries</option>
                        <option value="Sports">Sports</option>
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

export default ProductForm;
