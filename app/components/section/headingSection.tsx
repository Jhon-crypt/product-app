import AddProductsModal from "../modal/addProductsModal"

export default function HeadingSection() {

    return (

        <>
            <div className="d-flex justify-content-center align-content-center mt-4 pt-5">
                <div>
                    <h1>Product Inventory</h1>
                    <div className="d-grid">
                        <button className="btn btn-outline-dark py-3 btn-rounded" data-bs-toggle="modal" data-bs-target="#exampleModal">Add Product</button>
                    </div>
                </div>
            </div>

            <AddProductsModal />
        </>

    )

}