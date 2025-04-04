import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import { CiShoppingCart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import Tooltip from "@mui/material/Tooltip";
import { useCart } from "../../context/CartContext";

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeSize, setActiveSize] = useState(null);
    const [activeTab, setActiveTab] = useState("description");
    const { addToCart } = useCart();
    const [reviews, setReviews] = useState([]);
    const [loadingReviews, setLoadingReviews] = useState(true);


    const [newReview, setNewReview] = useState({ rating: 0, text: "" });
    

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

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/review/${id}`);
                setReviews(response.data);
            } catch (error) {
                console.error("Error fetching reviews:", error);
            } finally {
                setLoadingReviews(false);
            }
        };
    
        fetchReviews();
    }, [id]);

    const handleSubmitReview = async () => {
        if (newReview.rating === 0 || newReview.text.trim() === "") {
            alert("Please add a rating and a comment before submitting.");
            return;
        }
    
        try {
            await axios.post(`http://localhost:5000/api/review/${id}`, {
                ProductID: id,
                UserID: 5, 
                Rating: newReview.rating,
                ReviewText: newReview.text,
            });
    
            alert("Review submitted successfully!");
    
            setNewReview({ rating: 0, text: "" });

        } catch (error) {
            console.error("Error submitting review:", error);
            alert("Failed to submit review. Please try again.");
        }
    };

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
                        
                        </div>
                        <div className="desc">{product.Description}</div>
                    </div>
                </div>

                <div className="card mt-5 p-5 detailsPageTabs">
                    <div className="customTabs">
                        <ul className="list list-inline">
                            {["Description", "PIL", "Reviews"].map((tab) => (
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

                    {activeTab === "Description" && (
                        <div className="tabContent">
                            {/* <p>{product.Description || "No description available."}</p> */}
                        </div>
                    )}

                    {activeTab === "PIL" && (
                        <div className="tabContent">
                            {/* <table>
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
                            </table> */}
                        </div>
                    )}

{activeTab === "Reviews" && (
    <div className="tabContent">
        <h3>Customer Reviews</h3>
        
        {loadingReviews ? (
            <p>Loading reviews...</p>
        ) : reviews.length === 0 ? (
            <p>No reviews yet. Be the first to review this product!</p>
        ) : (
            reviews.map((review) => (
                <div key={review.ReviewID} className="review">
                    <h5>{review.FullName}</h5>
                    <Rating name="read-only" value={review.Rating} readOnly />
                    <p>{review.ReviewText}</p>
                    <small>Posted on: {new Date(review.CreatedAt).toLocaleDateString()}</small>
                </div>
            ))
        )}

        
        <div className="add-review">
            <h4>Add Your Review</h4>
            <Rating
                name="user-rating"
                value={newReview.rating}
                onChange={(event, newValue) => setNewReview({ ...newReview, rating: newValue })}
            />
            <textarea
                placeholder="Write your review..."
                value={newReview.text}
                onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
            />
            <button className="btn btn-green mt-2" onClick={handleSubmitReview}>
                Submit Review
            </button>
        </div>
    </div>
)}

                </div>
            </div>
        </section>
    );
};

export default ProductDetails;
