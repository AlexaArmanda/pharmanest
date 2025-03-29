import { FaRegHeart } from "react-icons/fa6";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const ProductItem = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (

    <div className="productItem">
    <Link to={`/product/${product.ProductID}`} className="product-link">
      
        <div className="imgWrapper">
          <img
            src={product.imageURL}
            alt={product.Name}
            className="w-100"
          />
          <span className="badge badge-primary">50%</span>
          <div className="actions">
            <Button className="button">
              <FaRegHeart />
            </Button>
          </div>
        </div>
        <div className="ml-2">
        <h4 className="mt-3 text-dark">{product.Name}</h4>
        <span className="text-success">In Stock: {product.Stock}</span>
        <div><Rating
          className="mt-2 mb-2"
          name="read-only"
          value={4}
          readOnly
          size="small"
          precision={0.5}
        />
        </div>
        <div className="d-flex">
          <span className="oldPrice">{product.Price}</span>
          <span className="newPrice text-danger ml-2">$10</span>
         
        </div>
        
        </div>
    </Link>
    <button className="btn-green product" onClick={handleAddToCart}>
            Add to Cart
          </button>
    </div>
  );
};

export default ProductItem;
