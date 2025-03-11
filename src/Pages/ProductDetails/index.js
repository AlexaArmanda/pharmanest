import Rating from "@mui/material/Rating";
import Button from '@mui/material/Button';
import { CiShoppingCart } from "react-icons/ci";
import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { IoGitCompareOutline } from "react-icons/io5";
import Tooltip from '@mui/material/Tooltip';
import RelatedProducts from "./RelatedProducts";

const ProductDetails = () => {

   const [activeSize, setActiveSize] = useState(null);
   const isActive = (index) => {
      setActiveSize(index);
   }

   const [activeTab, setActiveTab] = useState("description");

  return (
    <section className="productDetails section">
      <div className="container">
        <div className="row">
          <div className="col-md-4 pl-5">
            {/* <ProductZoom/> */}
            </div>

          <div className="col-md-7 pl-5 pr-5">
            <h2 className="hd text-capitalize">Supa la plic deliciu</h2>
            <ul className="list list-inline d-flex align-items-center">
              <li className="list-inline-item">
                <div className="d-flex align-items-center">
                  <span className="text-dark mr-2">Brand: </span>
                  <span>Maggy</span>
                </div>
              </li>
              <li className="list-inline-item ">
                <div className="d-flex align-items-center">
                  <Rating
                    name="read-only"
                    precision={0.5}
                    value={4.5}
                    readOnly
                    size="small"
                  />

                  <span className="text-dark cursor ml-2">1 Review</span>
                </div>
              </li>
            </ul>

            <div className="d-flex info mb-3">
              <span className="oldPrice">$20</span>
              <span className="newPrice text-danger ml-2">$10</span>
            </div>

            <span className="badge badge-success">IN STOCK</span>
            <p className="mt-3">
            Supa crema de ciuperci MAGGI este un deliciu culinar in
             fiecare sezon pentru fanii adevarati ai ciupercilor. 
             Supa crema de ciuperci MAGGI este un deliciu culinar in
             fiecare sezon pentru fanii adevarati ai ciupercilor. 
            </p>

            <div className="productSize d-flex align-items-center">
               <span>Size / Weight:</span>
               <ul className="list list-inline mb-0 pl-4">
               <li className="list-inline-item">
                  <a className={`tag ${activeSize === 0 ? 'active' : ''}`} onClick={() => isActive(0)}
                   >50g</a>
               </li>
               <li className="list-inline-item">
                  <a className={`tag ${activeSize === 1 ? 'active' : ''}`} onClick={() => isActive(1)}
                   >100g</a>
               </li>
               <li className="list-inline-item">
                  <a className={`tag ${activeSize === 2 ? 'active' : ''}`} onClick={() => isActive(2)}
                   >150g</a>
               </li>
               <li className="list-inline-item">
                  <a className={`tag ${activeSize === 3 ? 'active' : ''}`} onClick={() => isActive(3)}
                   >250g</a>
               </li>
         

               </ul>
            </div>

            <div className="d-flex align-items-center mt-3">
               {/* <QuantityBox/> */}
               <Button className="btn-green"><CiShoppingCart />Add to cart</Button>
               <Tooltip title="Add to favorites" placement="top-start">
                  <Button className="btn btn-fav"><FaHeart /></Button>
               </Tooltip>

               <Tooltip title="Compare" placement="top-start">
                  <Button className="btn btn-cmp"><IoGitCompareOutline /></Button>
               </Tooltip>
            </div>

          </div>
        </div>


         <div className="card mt-5 p-5 detailsPageTabs">
            <div className="customTabs">
                <ul className="list list-inline">
                    <li className="list-inline-item">
                        <button 
                            className={`tab-btn ${activeTab === "description" ? "active" : ""}`} 
                            onClick={() => setActiveTab("description")}
                        >
                            Description
                        </button>
                    </li>
                    <li className="list-inline-item">
                        <button 
                            className={`tab-btn ${activeTab === "additional-info" ? "active" : ""}`} 
                            onClick={() => setActiveTab("additional-info")}
                        >
                            Additional Info
                        </button>
                    </li>
                    <li className="list-inline-item">
                        <button 
                            className={`tab-btn ${activeTab === "reviews" ? "active" : ""}`} 
                            onClick={() => setActiveTab("reviews")}
                        >
                            Reviews (10)
                        </button>
                    </li>
                </ul>
            </div>

            {/* Description Tab */}
            {activeTab === "description" && (
                <div className="tabContent">
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                    </p>
                </div>
            )}

            {/* Additional Info Tab */}
            {activeTab === "additional-info" && (
                <div className="tabContent">
                    <table>
                        <thead>
                            <tr>
                                <th>Mineral</th>
                                <th>Content</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Calcium</td>
                                <td>100mg</td>
                            </tr>
                            <tr>
                                <td>Iron</td>
                                <td>2mg</td>
                            </tr>
                            <tr>
                                <td>Magnesium</td>
                                <td>50mg</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}

            {/* Reviews Tab */}
            {activeTab === "reviews" && (
                <div className="tabContent">
                    <h3>Customer questions & answers</h3>
                    <div className="review">
                        <p className="review-name">Kurosaki Hayato <span className="review-date">2025-02-21</span></p>
                        <p className="review-text">hi</p>
                        <p className="review-stars">⭐⭐⭐☆☆</p>
                    </div>
                    <hr />
                    <div className="review">
                        <p className="review-name">Kundan Yadav <span className="review-date">2025-02-18</span></p>
                        <p className="review-text">Hello</p>
                        <p className="review-stars">⭐☆☆☆☆</p>
                    </div>
                    <hr />
                    <div className="review">
                        <p className="review-name">Sumanth D <span className="review-date">2025-01-29</span></p>
                        <p className="review-text">kmkmkm</p>
                        <p className="review-stars">⭐☆☆☆☆</p>
                    </div>
                </div>
            )}
        </div>

        <RelatedProducts title="Related products"/>

        <RelatedProducts title="Recent products"/>

      </div>
    </section>
  );
};

export default ProductDetails;
