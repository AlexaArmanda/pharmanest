import React, { useState } from "react";
import Button from "@mui/material/Button";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; 

const SearchBox = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate(); 

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 0) {
      try {
        const response = await fetch(`http://localhost:5000/api/products/search?q=${value}`);
        const data = await response.json();
        setSuggestions(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    } else {
      setSuggestions([]); 
    }
  };

  const handleSearchClick = () => {

    navigate(`/search?query=${query}`);
  };

  return (
    <div className="headerSearch ml-3 mr-3">
      <input 
        type="text"
        placeholder="What would you like to search?"
        value={query}
        onChange={handleSearch} 
      />
      <Button onClick={handleSearchClick}>
        <FaSearch />
      </Button>

      {suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((product) => (
            <li key={product.Name}>{product.Name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBox;
