import { Link } from "@mui/material";
import Rating from '@mui/material/Rating';
import { MdDeleteForever } from "react-icons/md";
import Button from '@mui/material/Button';

const Cart =() => {
    return (
        <>
        <section className="section cartPage">
            <div className="container">
            <h2 className="hd mb-1">Your Cart</h2>
            <p>There are <b>3</b> products in your cart</p>
                <div className="row">
                    <div className="col-md-9 pr-5">
                    
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th width="35%">Product</th>
                                <th width="15%">Unit Price</th>
                                <th width="25%">Quantity</th>
                                <th width="15%">Subtotal</th> 
                                <th width="10%">Remove</th>
                            </tr>
                        </thead>
                   
                    <tbody>
                        <tr>
                            <td width="35%">

                                <Link to="/product/1">
                                <div className="d-flex align-items-center cartItemImgWrapper">
                                    <div className="imgWrapper">
                                        <img src="https://www.ecomagazin.ro/wp-content/uploads/2013/01/supa-la-plic.jpg" alt="supa" className="w-100"/>
                                    </div>

                                    <div className="info px-3">
                                        <h6>Supa la plic mmm Supa la plic mmm Supa la plic mmm</h6>
                                        <Rating name="read-only" value={4.5} precision={0.5} readOnly size="small" />
                                    </div>
                                </div>
                                </Link>

                            </td>
                            <td width="15%">$4.5</td>
                            {/* <QuantityBox/> */}
                            <td width="25%"></td>
                            <td width="15%">$4.5</td>
                            <td width="10%"><span className="remove"><MdDeleteForever /></span></td>
                        </tr> 
                        <tr>
                            <td width="35%">

                                <Link to="/product/1">
                                <div className="d-flex align-items-center cartItemImgWrapper">
                                    <div className="imgWrapper">
                                        <img src="https://www.ecomagazin.ro/wp-content/uploads/2013/01/supa-la-plic.jpg" alt="supa" className="w-100"/>
                                    </div>

                                    <div className="info px-3">
                                        <h6>Supa la plic mmm Supa la plic mmm Supa la plic mmm</h6>
                                        <Rating name="read-only" value={4.5} precision={0.5} readOnly size="small" />
                                    </div>
                                </div>
                                </Link>

                            </td>
                            <td width="15%">$4.5</td>
                            {/* <QuantityBox/> */}
                            <td width="25%"></td>
                            <td width="15%">$4.5</td>
                            <td width="10%"><span className="remove"><MdDeleteForever /></span></td>
                        </tr>
                        <tr>
                            <td width="35%">

                                <Link to="/product/1">
                                <div className="d-flex align-items-center cartItemImgWrapper">
                                    <div className="imgWrapper">
                                        <img src="https://www.ecomagazin.ro/wp-content/uploads/2013/01/supa-la-plic.jpg" alt="supa" className="w-100"/>
                                    </div>

                                    <div className="info px-3">
                                        <h6>Supa la plic mmm Supa la plic mmm Supa la plic mmm</h6>
                                        <Rating name="read-only" value={4.5} precision={0.5} readOnly size="small" />
                                    </div>
                                </div>
                                </Link>

                            </td>
                            <td width="15%">$4.5</td>
                            {/* <QuantityBox/> */}
                            <td width="25%"></td>
                            <td width="15%">$4.5</td>
                            <td width="10%"><span className="remove"><MdDeleteForever /></span></td>
                        </tr>
                        <tr>
                            <td width="35%">

                                <Link to="/product/1">
                                <div className="d-flex align-items-center cartItemImgWrapper">
                                    <div className="imgWrapper">
                                        <img src="https://www.ecomagazin.ro/wp-content/uploads/2013/01/supa-la-plic.jpg" alt="supa" className="w-100"/>
                                    </div>

                                    <div className="info px-3">
                                        <h6>Supa la plic mmm Supa la plic mmm Supa la plic mmm</h6>
                                        <Rating name="read-only" value={4.5} precision={0.5} readOnly size="small" />
                                    </div>
                                </div>
                                </Link>

                            </td>
                            <td width="15%">$4.5</td>
                            {/* <QuantityBox/> */}
                            <td width="25%"></td>
                            <td width="15%">$4.5</td>
                            <td width="10%"><span className="remove"><MdDeleteForever /></span></td>
                        </tr>
                        <tr>
                            <td width="35%">

                                <Link to="/product/1">
                                <div className="d-flex align-items-center cartItemImgWrapper">
                                    <div className="imgWrapper">
                                        <img src="https://www.ecomagazin.ro/wp-content/uploads/2013/01/supa-la-plic.jpg" alt="supa" className="w-100"/>
                                    </div>

                                    <div className="info px-3">
                                        <h6>Supa la plic mmm Supa la plic mmm Supa la plic mmm</h6>
                                        <Rating name="read-only" value={4.5} precision={0.5} readOnly size="small" />
                                    </div>
                                </div>
                                </Link>

                            </td>
                            <td width="15%">$4.5</td>
                            {/* <QuantityBox/> */}
                            <td width="25%"></td>
                            <td width="15%">$4.5</td>
                            <td width="10%"><span className="remove"><MdDeleteForever /></span></td>
                        </tr>
                        <tr>
                            <td width="35%">

                                <Link to="/product/1">
                                <div className="d-flex align-items-center cartItemImgWrapper">
                                    <div className="imgWrapper">
                                        <img src="https://www.ecomagazin.ro/wp-content/uploads/2013/01/supa-la-plic.jpg" alt="supa" className="w-100"/>
                                    </div>

                                    <div className="info px-3">
                                        <h6>Supa la plic mmm Supa la plic mmm Supa la plic mmm</h6>
                                        <Rating name="read-only" value={4.5} precision={0.5} readOnly size="small" />
                                    </div>
                                </div>
                                </Link>

                            </td>
                            <td width="15%">$4.5</td>
                            {/* <QuantityBox/> */}
                            <td width="25%"></td>
                            <td width="15%">$4.5</td>
                            <td width="10%"><span className="remove"><MdDeleteForever /></span></td>
                        </tr>
                        <tr>
                            <td width="35%">

                                <Link to="/product/1">
                                <div className="d-flex align-items-center cartItemImgWrapper">
                                    <div className="imgWrapper">
                                        <img src="https://www.ecomagazin.ro/wp-content/uploads/2013/01/supa-la-plic.jpg" alt="supa" className="w-100"/>
                                    </div>

                                    <div className="info px-3">
                                        <h6>Supa la plic mmm Supa la plic mmm Supa la plic mmm</h6>
                                        <Rating name="read-only" value={4.5} precision={0.5} readOnly size="small" />
                                    </div>
                                </div>
                                </Link>

                            </td>
                            <td width="15%">$4.5</td>
                            {/* <QuantityBox/> */}
                            <td width="25%"></td>
                            <td width="15%">$4.5</td>
                            <td width="10%"><span className="remove"><MdDeleteForever /></span></td>
                        </tr>
                    </tbody>

                    </table>
                </div>
                    </div>

                    <div className="col-md-3">
                        <div className="card border p-3 cardDetails">
                            <h4>Cart Totals</h4>

                            <div className="d-flex align-items-center mb-3">
                                <span>Subtotal</span>
                                <span className="ml-auto"><b>$15.50</b></span>
                            </div>

                            <div className="d-flex align-items-center mb-3">
                                <span>Shipping</span>
                                <span className="ml-auto"><b>FREE</b></span>
                            </div>

                            <div className="d-flex align-items-center ">
                                <span>Total</span>
                                <span className="ml-auto"><b>$15.50</b></span>
                            </div>

                            <Button className="btn-checkout">Checkout</Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}

export default Cart;