import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const HomeCat = () => {
  return (
    <section className="homeCat">
      <div className="container">
      <h3 className="mb-4 hd">FEATURED CATEGORIES</h3>

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
            480: { slidesPerView: 2 }, 
            768: { slidesPerView: 4 },  
            1000: { slidesPerView: 6 }, 
            1280: { slidesPerView: 8 }, 
          }}
        >
            <SwiperSlide>
            <div className="item text-center">
                <img src="https://media.farmaciatei.ro/gallery/26542/small/crema-antirid-cu-extrate-de-musetel-galbenele-si-sunatoare-100-ml-herbagen-3844.webp" />
                <h4>Immunity Boost</h4>
            </div>
            </SwiperSlide>

            <SwiperSlide>
            <div className="item text-center">
                <img src="https://media.farmaciatei.ro/gallery/26542/small/crema-antirid-cu-extrate-de-musetel-galbenele-si-sunatoare-100-ml-herbagen-3844.webp" />
                <h4>Smooth Skin Essentials</h4>
            </div>
            </SwiperSlide>

            <SwiperSlide>
            <div className="item text-center">
                <img src="https://media.farmaciatei.ro/gallery/26542/small/crema-antirid-cu-extrate-de-musetel-galbenele-si-sunatoare-100-ml-herbagen-3844.webp" />
                <h4>Clean Diet</h4>
            </div>
            </SwiperSlide>

            <SwiperSlide>
            <div className="item text-center">
                <img src="https://media.farmaciatei.ro/gallery/26542/small/crema-antirid-cu-extrate-de-musetel-galbenele-si-sunatoare-100-ml-herbagen-3844.webp" />
                <h4>Natural Remedies</h4>
            </div>
            </SwiperSlide>

            <SwiperSlide>
            <div className="item text-center">
                <img src="https://media.farmaciatei.ro/gallery/26542/small/crema-antirid-cu-extrate-de-musetel-galbenele-si-sunatoare-100-ml-herbagen-3844.webp" />
                <h4>PharmaNest Own Brand</h4>
            </div>
            </SwiperSlide>

            <SwiperSlide>
            <div className="item text-center">
                <img src="https://media.farmaciatei.ro/gallery/26542/small/crema-antirid-cu-extrate-de-musetel-galbenele-si-sunatoare-100-ml-herbagen-3844.webp" />
                <h4>Clearance</h4>
            </div>
            </SwiperSlide>

            <SwiperSlide>
            <div className="item text-center">
                <img src="https://media.farmaciatei.ro/gallery/26542/small/crema-antirid-cu-extrate-de-musetel-galbenele-si-sunatoare-100-ml-herbagen-3844.webp" />
                <h4>Gifts & Giftcards</h4>
            </div>
            </SwiperSlide>

            <SwiperSlide>
            <div className="item text-center">
                <img src="https://media.farmaciatei.ro/gallery/26542/small/crema-antirid-cu-extrate-de-musetel-galbenele-si-sunatoare-100-ml-herbagen-3844.webp" />
                <h4>Online Catalogue</h4>
            </div>
            </SwiperSlide>


        </Swiper>
      </div>
    </section>
  );
};

export default HomeCat;
