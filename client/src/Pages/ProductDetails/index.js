import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import { CiShoppingCart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { IoGitCompareOutline } from "react-icons/io5";
import Tooltip from "@mui/material/Tooltip";
import { useCart } from "../../context/CartContext";

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeSize, setActiveSize] = useState(null);
    const [activeTab, setActiveTab] = useState("description");
    const { addToCart } = useCart();
    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/products/${id}`)
            .then((response) => {
                setProduct(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching product:", error);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div>Loading product details...</div>;
    if (!product) return <div>Product not found.</div>;

    return (
        <section className="productDetails section">
            <div className="container">

                <div className="row">

                    <div className="col-md-6">
                        <img
                            src={product.imageURL || "https://via.placeholder.com/300"}
                            alt={product.Name}
                            className="product-image w-100 mb-3"
                        />
                    </div>


                    <div className="col-md-6">
                        <h2 className="hd text-capitalize">{product.Name}</h2>

                        <ul className="list list-inline d-flex align-items-center">
                            <li className="list-inline-item">
                                <div className="d-flex align-items-center">
                                    <span className="text-dark mr-2">Brand: </span>
                                    <span>{product.Brand}</span>
                                </div>
                            </li>
                            <li className="list-inline-item">
                                <div className="d-flex align-items-center">
                                    <Rating name="read-only" precision={0.5} value={4.5} readOnly size="small" />
                                    <span className="text-dark cursor ml-2">1 Review</span>
                                </div>
                            </li>
                        </ul>

                        <div className="d-flex info mb-3">
                            <span className="oldPrice">${product.Price + 5}</span>
                            <span className="newPrice text-danger ml-2">${product.Price}</span>
                        </div>

                        <span className={`badge ${product.Stock > 0 ? "badge-success" : "badge-danger"}`}>
                            {product.Stock > 0 ? `IN STOCK (${product.Stock} left)` : "OUT OF STOCK"}
                        </span>

                        <div className="productSize d-flex align-items-center mt-3">
                            <span>Size / Weight:</span>
                            <ul className="list list-inline mb-0 pl-4">
                                {[50, 100, 150, 250].map((size, index) => (
                                    <li className="list-inline-item" key={index}>
                                        <button
                                            className={`tag ${activeSize === index ? "active" : ""}`}
                                            onClick={() => setActiveSize(index)}
                                        >
                                            {size}g
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="d-flex align-items-center mt-3">
                            <Button className="btn-green" onClick={() => addToCart(product)}>
                                <CiShoppingCart /> Add to cart
                            </Button>
                            <Tooltip title="Add to favorites" placement="top-start">
                                <Button className="btn btn-fav">
                                    <FaHeart />
                                </Button>
                            </Tooltip>
                            <Tooltip title="Compare" placement="top-start">
                                <Button className="btn btn-cmp">
                                    <IoGitCompareOutline />
                                </Button>
                            </Tooltip>
                        </div>
                    </div>
                </div>

                <div className="card mt-5 p-5 detailsPageTabs">
                    <div className="customTabs">
                        <ul className="list list-inline">
                            {["description", "additional-info", "reviews"].map((tab) => (
                                <li className="list-inline-item" key={tab}>
                                    <button
                                        className={`tab-btn ${activeTab === tab ? "active" : ""}`}
                                        onClick={() => setActiveTab(tab)}
                                    >
                                        {tab.replace("-", " ")}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {activeTab === "description" && (
                        <div className="tabContent">
                            <p>{product.Description || "No description available."}</p>
                        </div>
                    )}

                    {activeTab === "additional-info" && (
                        <div className="tabContent">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Mineral</th>
                                        <th>Content</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Calcium</td>
                                        <td>100mg</td>
                                    </tr>
                                    <tr>
                                        <td>Iron</td>
                                        <td>2mg</td>
                                    </tr>
                                    <tr>
                                        <td>Magnesium</td>
                                        <td>50mg</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )}

                    {activeTab === "reviews" && (
                        <div className="tabContent">
                            <h3>Customer questions & answers</h3>
                            <p>No reviews yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ProductDetails;
