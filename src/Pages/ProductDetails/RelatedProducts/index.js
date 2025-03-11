import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import ProductItem from "../../../Components/ProductItem";

const RelatedProducts = (props) => {
  return (
    <>
      <div className="d-flex align-items-center mt-3">
        <div className="info w-75">
          <h3 className="mb-0 hd">{props.title}</h3>
          <p className="textLight text-sml mb-0">Find what suits you best!</p>
        </div>

      </div>

      <div className="productRow w-100 mt-3">
        <Swiper
          slidesPerView={5}
          spaceBetween={10}
          pagination={{
            type: "fraction",
          }}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper"
        >
          <SwiperSlide>
            <ProductItem />
          </SwiperSlide>

          <SwiperSlide>
            <ProductItem />
          </SwiperSlide>

          <SwiperSlide>
            <ProductItem />
          </SwiperSlide>

          <SwiperSlide>
            <ProductItem />
          </SwiperSlide>

          <SwiperSlide>
            <ProductItem />
          </SwiperSlide>

          <SwiperSlide>
            <ProductItem />
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
};

export default RelatedProducts;
