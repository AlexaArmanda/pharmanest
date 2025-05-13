import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ProductItem from "../ProductItem";

const SearchResults = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query");

  useEffect(() => {
    if (query) {
      const fetchData = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/products/search?q=${query}`);
          const data = await response.json();
          setProducts(data);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };

      fetchData();
    }
  }, [query]);

  return (
    <div className="search-results-page-container"> 
      <h2 className="search-results-title">
        Search Results for: <span>{query}</span>
      </h2>

      {products.length > 0 ? (
        <div className="search-results-grid">
          {products.map((product) => (
            <div key={product.ProductID} className="search-results-item">
              <ProductItem product={product} />
            </div>
          ))}
        </div>
      ) : (
        <p className="no-results">No products found matching your search.</p>
      )}
    </div>
  );
};

export default SearchResults;
