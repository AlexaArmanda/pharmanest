import Sidebar from "../../Components/Sidebar";
import ProductItem from "../../Components/ProductItem";
import { useState, useEffect, useCallback } from "react";
import Pagination from "@mui/material/Pagination";
import axios from "axios";
import { useParams } from "react-router-dom";

const Listing = () => {
  const [productView, setProductView] = useState("four");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);
  const { categoryId } = useParams();
  const [filteredProducts, setFilteredProducts] = useState([]);
  
  // Initialize filters
  const [filters, setFilters] = useState({
    brands: [],
    priceRange: [1, 60],
    stock: [],
  });

  const applyFilters = useCallback((newFilters) => {
    setFilters((prevFilters) => ({
        ...prevFilters,
        brands: newFilters.brands ? [...newFilters.brands] : prevFilters.brands,
        priceRange: newFilters.priceRange || prevFilters.priceRange,
        stock: newFilters.stock !== undefined ? newFilters.stock : prevFilters.stock,
    }));
}, []);


  useEffect(() => {
    const fetchFilteredProducts = async () => {
      if (!categoryId) return;
      
      let filterParams = [];

if (filters.brands.length > 0) {
    filterParams.push(`brand:${filters.brands.join("|")}`); 
}
if (filters.priceRange) {
    filterParams.push(`price:${filters.priceRange[0]}-${filters.priceRange[1]}`);
}
if (filters.stock) {
    filterParams.push(`stock:${filters.stock}`);
}

const filtersQuery = filterParams.length > 0 ? filterParams.join(",") : "";

let url = `http://localhost:5000/api/products/category/${categoryId}`;
if (filtersQuery) {
    url += `/filtered/${filtersQuery}`;
}

console.log("Fetching products with URL:", url);

try {
    const response = await axios.get(url);
    setFilteredProducts(response.data);
} catch (error) {
    console.error("Error fetching filtered products:", error);
}

      
    };

    fetchFilteredProducts();
  }, [categoryId, filters]);

  return (
    <section className="productListingPage">
      <div className="container">
        <div className="productListing d-flex">
          <Sidebar categoryId={categoryId} applyFilters={applyFilters} />
          <div className="contentRight">
            <div className="productListing">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <ProductItem key={product.ProductID} product={product} itemView={productView} />
                ))
              ) : (
                <p>Loading products...</p>
              )}
            </div>

            <div className="d-flex align-items-center justify-content-center mt-5">
              <Pagination
                count={Math.ceil(filteredProducts.length / productsPerPage)}
                page={currentPage}
                onChange={(event, value) => setCurrentPage(value)}
                color="primary"
                size="large"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Listing;
