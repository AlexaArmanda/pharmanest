import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CategorySort = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/products?category=${id}`
        );
        const data = await res.json();
        setProducts(data.products);
        setCategoryName(data.categoryName);
      } catch (error) {
        console.error("Error fetching category products:", error);
      }
    };

    fetchProducts();
  }, [id]);

  return (
    <div className="container">
      <h2>{categoryName} Products</h2>
      <div className="row">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.ProductID} className="col-md-4">
              <div className="product-card">
                <h5>{product.Name}</h5>
                <p>{product.Description}</p>
                <p>Price: ${product.Price}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No products found for this category.</p>
        )}
      </div>
    </div>
  );
};

export default CategorySort;
