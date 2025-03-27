import React, { useEffect, useState } from "react";
import HomeBanner from "../../Components/HomeBanner";
import Button from "@mui/material/Button";
import { FaArrowRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import ProductItem from "../../Components/ProductItem";
import HomeCat from "../../Components/HomeCat";
import ImageBanner from "../../Components/ImageBanner";
import axios from "axios";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((response) => {
        setProducts(response.data); 
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <>
      <HomeBanner />
      <HomeCat />

      <section className="homeProducts">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div className="sticky">
                <div className="banner">
                  <img
                    src="https://plus.unsplash.com/premium_photo-1671098088734-8b8532731aef?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="leftAd"
                    className="cursor w-100"
                  />
                </div>
              </div>
            </div>

            <div className="col-md-9 productRow">
              <div className="d-flex align-items-center">
                <div className="info w-75">
                  <h3 className="mb-0 hd">Our Products</h3>
                  <p className="textLight text-sml mb-0">Explore our collection</p>
                </div>
                <Button className="viewAllBtn ml-auto">View All<FaArrowRight /></Button>
              </div>

              <div className="productRow w-100 mt-4">
                <Swiper slidesPerView={4} spaceBetween={10} navigation={true} modules={[Navigation]} className="mySwiper">
                  {products.length > 0 ? (
                    products.map((product) => (
                      <SwiperSlide key={product.id}>
                        <ProductItem product={product} />
                      </SwiperSlide>
                    ))
                  ) : (
                    <p>Loading products...</p>
                  )}
                </Swiper>
              </div>

              <div className="imgBanDisplay mt-3 mb-3 w-100 d-flex align-items-center">
                <ImageBanner />
              </div>

              <div className="productRow w-100 mt-4">
                <Swiper slidesPerView={4} spaceBetween={10} navigation={true} modules={[Navigation]} className="mySwiper">
                  {products.length > 0 ? (
                    products.map((product) => (
                      <SwiperSlide key={product.id}>
                        <ProductItem product={product} />
                      </SwiperSlide>
                    ))
                  ) : (
                    <p>Loading products...</p>
                  )}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
