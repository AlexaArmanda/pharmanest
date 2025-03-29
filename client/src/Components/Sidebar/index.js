import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { useState, useEffect } from "react";
import axios from "axios";

const Sidebar = ({ categoryId, applyFilters }) => {
  const [value, setValue] = useState([1, 60]);
  const [brands, setBrands] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedStock, setSelectedStockState] = useState('');

  useEffect(() => {
    const fetchBrands = async () => {
        if (!categoryId) return;

        try {
            const response = await axios.get(`http://localhost:5000/api/products/brands?category=${categoryId}`);
            setBrands(response.data);
        } catch (error) {
            console.error("Error fetching brands:", error);
        }
    };

    fetchBrands();
}, [categoryId]);


  const handleBrandChange = (event) => {
    const brand = event.target.value;
    setSelectedBrands((prevBrands) => {
        const newBrands = prevBrands.includes(brand)
            ? prevBrands.filter((item) => item !== brand)
            : [...prevBrands, brand];

        return newBrands;
    });
};


  const handleStockChange = (event) => {
    const stockValue = event.target.value;
    setSelectedStockState((prevStock) => {
      if (prevStock.includes(stockValue)) {
        return prevStock.filter((item) => item !== stockValue);
      } else {
        return [...prevStock, stockValue];
      }
    });
  };
  
  const handlePriceChange = (newValue) => {
    setValue(newValue);
    
  };

  return (
    <div className="sidebar">
      <div className="sticky">
        <h2>FILTER BY:</h2>

        <div className="filterBox">
          <h5>BRAND</h5>
          <div className="scroll">
            <ul>
              {brands.map((brand) => (
                <li key={brand}>
                  <FormControlLabel
                    className="w-100"
                    control={
                      <Checkbox
                        onChange={handleBrandChange}
                        value={brand}
                        checked={selectedBrands.includes(brand)}
                      />
                    }
                    label={brand}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="filterBox">
          <h5>FILTER BY PRICE</h5>
          <RangeSlider value={value} onInput={handlePriceChange} min={1} max={60} step={5} />
          <div className="d-flex pt-2 pb-2 priceRange">
            <span>
              From: <strong className="text-dark">RON:{value[0]}</strong>
            </span>
            <span className="ml-auto">
              To: <strong className="text-dark">RON:{value[1]}</strong>
            </span>
          </div>
        </div>

        <div className="filterBox">
          <h5>STOCK</h5>
          <div className="scroll">
            <ul>
              <li>
                <FormControlLabel
                  className="w-100"
                  control={<Checkbox onChange={handleStockChange} value="inStock" />}
                  label="In Stock"
                />
              </li>
              <li>
                <FormControlLabel
                  className="w-100"
                  control={<Checkbox onChange={handleStockChange} value="lowStock" />}
                  label="Low Stock"
                />
              </li>
            </ul>
          </div>
        </div>

        <button onClick={() => applyFilters({ brands: selectedBrands, priceRange: value, stock: selectedStock })}>
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
