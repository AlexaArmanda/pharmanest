import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

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
    <div className="search-results">
      <h2>Search Results for: {query}</h2>

      {products.length > 0 ? (
        <div className="product-list">
          {products.map((product) => (
            <div key={product.ProductID} className="product-item">
              <h3>{product.Name}</h3>
              <p>{product.Description}</p>
              <span>${product.Price}</span>
            </div>
          ))}
        </div>
      ) : (
        <p>No products found matching your search.</p>
      )}
    </div>
  );
};

export default SearchResults;
