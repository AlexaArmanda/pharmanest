import { FaRegHeart } from "react-icons/fa6";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";

const ProductItem = (props) => {
  return (
    <div className={`productItem ${props.itemView}`}>
      <div className="imgWrapper">
        <img
          src="https://www.ecomagazin.ro/wp-content/uploads/2013/01/supa-la-plic.jpg"
          alt="tea"
          className="w-100"
        ></img>

        <span className="badge badge-primary">50%</span>

        <div className="actions">
          <Button className="button">
            <FaRegHeart />
          </Button>
        </div>
      </div>
      <h4>Supa la plic mmm</h4>
      <span className="text-success">In Stock</span>
      <Rating
        className="mt-2 mb-2"
        name="read-only"
        value={4}
        readOnly
        size="small"
        precision={0.5}
      />

      <div className="d-flex">
        <span className="oldPrice">$20</span>
        <span className="newPrice text-danger ml-2">$10</span>
      </div>
    </div>
  );
};
export default ProductItem;
