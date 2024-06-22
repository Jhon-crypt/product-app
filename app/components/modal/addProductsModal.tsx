export default function AddProductsModal() {

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
                            <form>
                                <div className="row">
                                    <div className="col">
                                        <div className="mb-3">
                                            <label htmlFor="exampleFormControlInput1" className="form-label">Product name</label>
                                            <input type="text" className="form-control" placeholder="E.g Ps5" />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="mb-3">
                                            <label htmlFor="exampleFormControlInput1" className="form-label">Product Quantity</label>
                                            <input type="number" className="form-control" placeholder="E.g 5" />
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col">
                                        <div className="mb-3">
                                            <label htmlFor="exampleFormControlInput1" className="form-label">Category</label>
                                            <select className="form-select" aria-label="Default select example">
                                                <option selected>Category</option>
                                                <option value="1">Electronics</option>
                                                <option value="2">Home Appliance</option>
                                                <option value="3">Fashion</option>
                                                <option value="3">Beauty and Personal Care</option>
                                                <option value="3">Health and Wellness</option>
                                                <option value="3">Home and Furniture</option>
                                                <option value="3">Groceries</option>
                                                <option value="3">Sports and Outdoors</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="mb-3">
                                            <label htmlFor="exampleFormControlInput1" className="form-label">Product Quantity</label>
                                            <input type="number" className="form-control" placeholder="E.g 5" />
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col">
                                        <div className="mb-3">
                                            <label htmlFor="exampleFormControlInput1" className="form-label">Price</label>
                                            <input type="number" className="form-control" placeholder="E.g 400" />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="mb-3">
                                            <label htmlFor="exampleFormControlInput1" className="form-label">Units Available</label>
                                            <input type="number" className="form-control" placeholder="E.g 2" />
                                        </div>
                                    </div>
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary btn-rounded py-2 px-3" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary btn-rounded py-2 px-3">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )

}