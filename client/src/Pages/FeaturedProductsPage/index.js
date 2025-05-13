import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const FeaturedProductsPage = () => {
  const { featuredID } = useParams();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/featured/${featuredID}`
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Full error response:", error);
        setError(error.response?.data?.message || error.message || "Something went wrong");
      }
      
    };

    fetchFeaturedProducts();
  }, [featuredID]);



  return (
    <div className="featured-products-page">
      <h2>Featured Products</h2>

      {error && <p>{error}</p>}

      <div className="featured-products-grid">
        {products.map((product) => (
          <div key={product.ProductID} className="product-card">
            <img src={product.ImageURL} alt={product.Name} />
            <h3>{product.Name}</h3>
            <p>{product.Description}</p>
            <span>${product.Price.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProductsPage;
