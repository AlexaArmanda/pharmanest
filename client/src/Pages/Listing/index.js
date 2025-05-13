import Sidebar from "../../Components/Sidebar";
import ProductItem from "../../Components/ProductItem";
import { useState, useEffect, useCallback } from "react";
import Pagination from "@mui/material/Pagination";
import axios from "axios";
import { useParams, useLocation  } from "react-router-dom";

const Listing = () => {
  const [productView, setProductView] = useState("four");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);
  const { categoryId } = useParams();
  const location = useLocation();
  const isNewProductsPage = location.pathname === "/new-products";
  const isSaleProductsPage = location.pathname === "/sale-products";
  const isClearanceProductsPage = location.pathname === "/clearance-products";

  const isBestSellersPage = location.pathname === "/best-sellers";

  const [filteredProducts, setFilteredProducts] = useState([]);
  
  const [filters, setFilters] = useState({
    brands: [],
    priceRange: [1, 60],
    stock: [],
    ratings: [],
  });

  const applyFilters = useCallback((newFilters) => {
    setFilters((prevFilters) => ({
        ...prevFilters,
        brands: newFilters.brands ? [...newFilters.brands] : prevFilters.brands,
        priceRange: newFilters.priceRange || prevFilters.priceRange,
        stock: newFilters.stock !== undefined ? newFilters.stock : prevFilters.stock,
        ratings: newFilters.ratings || prevFilters.ratings,
    }));
}, []);

  const handleRatingFilter = (ratings) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ratings: ratings, 
    }));
  };

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      let url = `http://localhost:5000/api/products/category/${categoryId}`;

      if (isNewProductsPage) {
        url = "http://localhost:5000/api/products/new";
      } else if (isSaleProductsPage) {
        url = "http://localhost:5000/api/products/sale";
      } else if (isClearanceProductsPage) {
        url = "http://localhost:5000/api/products/clearance";
      } else if (isBestSellersPage) {
        url = "http://localhost:5000/api/products/best-sellers";
      } else if (categoryId) {

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

if (filters.ratings.length > 0) {
  filterParams.push(`ratings:${filters.ratings.join("|")}`);
}

const filtersQuery = filterParams.length > 0 ? filterParams.join(",") : "";

if (filtersQuery) {
    url += `/filtered/${filtersQuery}`;
    console.log("Fetching products with URL:", url);

}

    }


try {
    const response = await axios.get(url);
    setFilteredProducts(response.data);
} catch (error) {
    console.error("Error fetching filtered products:", error);
}

      
    };

    fetchFilteredProducts();
  }, [categoryId, filters, isNewProductsPage, isSaleProductsPage, isClearanceProductsPage, isBestSellersPage]);



  return (
    <section className="productListingPage">
      <div className="container">
        <div className="productListing d-flex">
        {!isNewProductsPage && !isSaleProductsPage && !isClearanceProductsPage && !isBestSellersPage && (
            <Sidebar categoryId={categoryId} applyFilters={applyFilters} />
          )}
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
