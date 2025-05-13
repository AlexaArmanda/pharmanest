import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products/best-sellers") 
      .then((response) => {
        setBestSellers(response.data); 
      })
      .catch((error) => {
        console.error("Error fetching best sellers:", error);
      });
  }, []);

  return (
    <>
      <HomeBanner />
      <HomeCat />

      <section className="homeProducts">
        <div className="container">
          <div className="row">
            {/* <div className="col-md-4 col-sm-12">
      <div className="sticky">
        <div className="banner">
          <img
            src="https://i.postimg.cc/MZfFcn44/Discover-the-Wonder-of-Natural-Hair-Treatments.png"
            alt="Banner"
            className="leftAd cursor w-100"
          />
        </div>
      </div>
    </div> */}

            <div className="col-lg-12 col-sm-12">
              <div className="d-flex align-items-center">
                <div className="info w-75">
                  <h3 className="mb-0 hd">New Arrivals</h3>
                </div>
                <Button
                  onClick={() => {
                    navigate("/new-products");
                  }}
                  className="viewAllBtn ml-auto"
                >
                  View All
                  <FaArrowRight />
                </Button>
              </div>

              <div className="productRow w-100 mt-4">
                <Swiper
                  slidesPerView={8}
                  spaceBetween={10}
                  pagination={{
                    type: "fraction",
                  }}
                  navigation={true}
                  slidesPerGroup={1}
                  modules={[Navigation]}
                  className="mySwiper"
                  breakpoints={{
                    320: { slidesPerView: 2 },
                    768: { slidesPerView: 4 },
                    1000: { slidesPerView: 6 },
                  }}
                >
                  {products.length > 0 ? (
                    products.slice(0, 15).map((product) => (
                      <SwiperSlide key={product.id}>
                        <ProductItem product={product} />
                      </SwiperSlide>
                    ))
                  ) : (
                    <p>Loading products...</p>
                  )}
                </Swiper>
              </div>

              <div className="imgBanDisplay mt-5 mb-3 w-100 d-flex align-items-center">
                <ImageBanner />
              </div>

              <div className="d-flex align-items-center">
                <div className="info w-75">
                  <h3 className="mb-0 hd">Best Sellers</h3>
                </div>
                <Button className="viewAllBtn ml-auto">
                  View All
                  <FaArrowRight />
                </Button>
              </div>

              <div className="productRow w-100 mt-4">
                <Swiper
                  slidesPerView={8}
                  spaceBetween={10}
                  pagination={{
                    type: "fraction",
                  }}
                  navigation={true}
                  slidesPerGroup={1}
                  modules={[Navigation]}
                  className="mySwiper"
                  breakpoints={{
                    320: { slidesPerView: 2 },
                    768: { slidesPerView: 4 },
                    1000: { slidesPerView: 6 },
                  }}
                >
                  {bestSellers.length > 0 ? (
                    bestSellers.map((product) => (
                      <SwiperSlide key={product.id}>
                        <ProductItem
            product={{
              ...product,
              id: product.ProductID,
              image: product.imageURL,
            }}
          />
                      </SwiperSlide>
                    ))
                  ) : (
                    <p>No best sellers found</p>
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
