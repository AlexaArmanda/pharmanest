import Sidebar from "../../Components/Sidebar";
import ProductItem from "../../Components/ProductItem";
import { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import axios from "axios";
import { useParams } from "react-router-dom";

const Listing = () => {
  const [productView, setProductView] = useState("four");
  const [products, setProducts] = useState([]); 
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8); 
  const { categoryId } = useParams(); 

  useEffect(() => {
    let url = "http://localhost:5000/api/products";
    if (categoryId) {
      url = `http://localhost:5000/api/products/category/${categoryId}`; 
    }

    axios
      .get(url)
      .then((response) => {
        console.log("Fetched Products:", response.data);
        setProducts(response.data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, [categoryId]);

  // Get products for the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Handle pagination click
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <section className="productListingPage">
      <div className="container">
        <div className="productListing d-flex">
          <Sidebar />
          <div className="contentRight">
            <div className="productListing">
              {currentProducts.length > 0 ? (
                currentProducts.map((product) => (
                  <ProductItem key={product.id} product={product} itemView={productView} />
                ))
              ) : (
                <p>No products found.</p>
              )}
            </div>

            <div className="d-flex align-items-center justify-content-center mt-5">
              <Pagination
                count={Math.ceil(products.length / productsPerPage)}
                page={currentPage}
                onChange={handlePageChange}
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
