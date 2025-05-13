import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import { useCart } from "../../context/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSize, setActiveSize] = useState(null);
  const [activeTab, setActiveTab] = useState("description");
  const { addToCart } = useCart();
  const [favorites, setFavorites] = useState([]);

  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [newReview, setNewReview] = useState({ rating: 0, text: "" });
  const userData = JSON.parse(localStorage.getItem("user"));
  const userID = userData?.UserID; 

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
        const response = await axios.get(
          `http://localhost:5000/api/review/${id}`
        );
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
        UserID: userID,
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

  const getAverageRating = () => {
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((sum, r) => sum + r.Rating, 0);
    return total / reviews.length;
  };

  const toggleFavorite = () => {
    const userData = JSON.parse(localStorage.getItem("user"));
    const userID = userData?.UserID;
  
    let updatedFavorites;
    if (favorites.some((fav) => fav.ProductID === product.ProductID)) {
      updatedFavorites = favorites.filter((fav) => fav.ProductID !== product.ProductID);
    } else {
      updatedFavorites = [...favorites, product];
    }
    
    setFavorites(updatedFavorites);
    localStorage.setItem(`favorites_${userID}`, JSON.stringify(updatedFavorites));
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

<div className="col-md-6 pharmacy-summary">
  <h1 className="product-title">{product.Name}</h1>

  <div className="product-brand-stock mb-3">
    <p><strong>Brand:</strong> {product.Brand}</p>
    <p className={product.Stock > 0 ? "in-stock" : "out-of-stock"}>
      {product.Stock > 0 ? "In Stock" : "Out of Stock"}
    </p>
    <p className="pickup-note">FREE pharmacy pickup available</p>
  </div>

  <div className="pricing-box mb-3">
    <p className="original-price">
      <s>$91.50</s>
    </p>
    <p className="final-price">${product.Price}</p>
    <span className="discount-badge">-10%</span>
  </div>

  <div className="quantity-cart mb-4 d-flex align-items-center">
    <div className="quantity-selector mr-3">
      <button onClick={() => setActiveSize(prev => Math.max(prev - 1, 1))}>-</button>
      <input type="text" value={activeSize || 1} readOnly />
      <button onClick={() => setActiveSize(prev => prev + 1)}>+</button>
    </div>
    <Button className="btn-green" onClick={() => addToCart(product)}>
      Adaugă în coș
    </Button>
  </div>

  <p className="promo-note">
    * This price is valid only for online orders. May vary in pharmacies.<br />
    * Promotion valid until 31.05.2025, while stocks last.
  </p>
</div>


        </div>

        <div className="card mt-5 p-5 detailsPageTabs">
          <div className="customTabs">
            <ul className="list list-inline">
              {["Description", "Reviews"].map((tab) => (
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

          {activeTab === "Description" && <div className="tabContent">
            <div className="desc">{product.Description}</div>
            </div>}

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
                    <small>
                      Posted on:{" "}
                      {new Date(review.CreatedAt).toLocaleDateString()}
                    </small>
                  </div>
                ))
              )}

              <div className="add-review">
                <h4>Add Your Review</h4>
                <Rating
                  name="user-rating"
                  value={newReview.rating}
                  onChange={(event, newValue) =>
                    setNewReview({ ...newReview, rating: newValue })
                  }
                />
                <textarea
                  placeholder="Write your review..."
                  value={newReview.text}
                  onChange={(e) =>
                    setNewReview({ ...newReview, text: e.target.value })
                  }
                />
                <button className="submit-btn" onClick={handleSubmitReview}>
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
