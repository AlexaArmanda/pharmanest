import { FaRegHeart, FaHeart } from "react-icons/fa6";
import Rating from "@mui/material/Rating";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useState, useEffect } from "react";
import axios from "axios";

const ProductItem = ({ product }) => {
  const { addToCart } = useCart();
  const [favorites, setFavorites] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);


  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    const userID = userData?.UserID;
    const storedFavorites = JSON.parse(localStorage.getItem(`favorites_${userID}`)) || [];
    setFavorites(storedFavorites);
  }, []);
  

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/review/${product.ProductID}`);
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoadingReviews(false);
      }
    };

    fetchReviews();
  }, [product.ProductID]);

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

  const getDiscountPercentage = () => {
    if (product.IsOnSale && product.Price > 0 && product.SalePrice) {
      return Math.round(((product.Price - product.SalePrice) / product.Price) * 100);
    }
    return 0;
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="card product-item imgWrapper" style={{ position: 'relative', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Link to={`/product/${product.ProductID}`} style={{ display: 'block', flexShrink: 0 }}>
        <img
          src={product.imageURL}
          alt={product.Name}
          className="card-img-top"
          style={{ width: '100%', height: '200px', objectFit: 'cover' }}
        />
      </Link>
      <div className="card-body text-center d-flex flex-column justify-content-between" style={{ flexGrow: 1 }}>
        <div style={{ position: 'absolute', top: '10px', right: '15px' }}>
          <button onClick={toggleFavorite} className="btn btn-link heart-btn p-0">
            {favorites.some((fav) => fav.ProductID === product.ProductID) ? <FaHeart className="heart-icon favorited" /> : <FaRegHeart className="heart-icon" />}
          </button>
        </div>
        <h5 className="card-title" style={{ minHeight: '3em' }}>{product.Name}</h5>
        <div className="d-flex justify-content-center align-items-center mb-2">
          <Rating value={getAverageRating()} precision={0.5} readOnly size="small" />
          <span className="ml-2 text-muted">({reviews.length})</span>
        </div>


        {product.IsOnSale ? (
          <>
            <p className="card-text text-danger">
              ${product.SalePrice}{" "}
              <span style={{ textDecoration: 'line-through', color: 'grey' }}>${product.Price}</span>
            </p>
            <div className="sale-percentage">
              <span className="badge badge-danger">{getDiscountPercentage()}% Off</span>
            </div>
          </>
        ) : (
          <p className="card-text text-danger">${product.Price}</p>
        )}


        <div className="mt-auto">
          <Link to={`/product/${product.ProductID}`} className="btn btn-details w-100">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
