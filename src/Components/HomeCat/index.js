import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const HomeCat = () => {
  return (
    <section className="homeCat">
      <div className="container">
      <h3 class="mb-4 hd">FEATURED CATEGORIES</h3>

        <Swiper
          slidesPerView={10}
          spaceBetween={10}
          pagination={{
            type: "fraction",
          }}
          navigation={true}
          slidesPerGroup={1}
          modules={[Navigation]}
          className="mySwiper"
        >
            <SwiperSlide>
            <div className="item text-center">
                <img src="https://media.farmaciatei.ro/gallery/26542/small/crema-antirid-cu-extrate-de-musetel-galbenele-si-sunatoare-100-ml-herbagen-3844.webp" />
                <h4>Herbagen Cream</h4>
            </div>
            </SwiperSlide>

            <SwiperSlide>
            <div className="item text-center">
                <img src="https://media.farmaciatei.ro/gallery/26542/small/crema-antirid-cu-extrate-de-musetel-galbenele-si-sunatoare-100-ml-herbagen-3844.webp" />
                <h4>Herbagen Cream</h4>
            </div>
            </SwiperSlide>

            <SwiperSlide>
            <div className="item text-center">
                <img src="https://media.farmaciatei.ro/gallery/26542/small/crema-antirid-cu-extrate-de-musetel-galbenele-si-sunatoare-100-ml-herbagen-3844.webp" />
                <h4>Herbagen Cream</h4>
            </div>
            </SwiperSlide>

            <SwiperSlide>
            <div className="item text-center">
                <img src="https://media.farmaciatei.ro/gallery/26542/small/crema-antirid-cu-extrate-de-musetel-galbenele-si-sunatoare-100-ml-herbagen-3844.webp" />
                <h4>Herbagen Cream</h4>
            </div>
            </SwiperSlide>

            <SwiperSlide>
            <div className="item text-center">
                <img src="https://media.farmaciatei.ro/gallery/26542/small/crema-antirid-cu-extrate-de-musetel-galbenele-si-sunatoare-100-ml-herbagen-3844.webp" />
                <h4>Herbagen Cream</h4>
            </div>
            </SwiperSlide>

            <SwiperSlide>
            <div className="item text-center">
                <img src="https://media.farmaciatei.ro/gallery/26542/small/crema-antirid-cu-extrate-de-musetel-galbenele-si-sunatoare-100-ml-herbagen-3844.webp" />
                <h4>Herbagen Cream</h4>
            </div>
            </SwiperSlide>

            <SwiperSlide>
            <div className="item text-center">
                <img src="https://media.farmaciatei.ro/gallery/26542/small/crema-antirid-cu-extrate-de-musetel-galbenele-si-sunatoare-100-ml-herbagen-3844.webp" />
                <h4>Herbagen Cream</h4>
            </div>
            </SwiperSlide>

            <SwiperSlide>
            <div className="item text-center">
                <img src="https://media.farmaciatei.ro/gallery/26542/small/crema-antirid-cu-extrate-de-musetel-galbenele-si-sunatoare-100-ml-herbagen-3844.webp" />
                <h4>Herbagen Cream</h4>
            </div>
            </SwiperSlide>

            <SwiperSlide>
            <div className="item text-center">
                <img src="https://media.farmaciatei.ro/gallery/26542/small/crema-antirid-cu-extrate-de-musetel-galbenele-si-sunatoare-100-ml-herbagen-3844.webp" />
                <h4>Herbagen Cream</h4>
            </div>
            </SwiperSlide>

            <SwiperSlide>
            <div className="item text-center">
                <img src="https://media.farmaciatei.ro/gallery/26542/small/crema-antirid-cu-extrate-de-musetel-galbenele-si-sunatoare-100-ml-herbagen-3844.webp" />
                <h4>Herbagen Cream</h4>
            </div>
            </SwiperSlide>


            <SwiperSlide>
            <div className="item text-center">
                <img src="https://media.farmaciatei.ro/gallery/26542/small/crema-antirid-cu-extrate-de-musetel-galbenele-si-sunatoare-100-ml-herbagen-3844.webp" />
                <h4>Herbagen Cream</h4>
            </div>
            </SwiperSlide>

            <SwiperSlide>
            <div className="item text-center">
                <img src="https://media.farmaciatei.ro/gallery/26542/small/crema-antirid-cu-extrate-de-musetel-galbenele-si-sunatoare-100-ml-herbagen-3844.webp" />
                <h4>Herbagen Cream</h4>
            </div>
            </SwiperSlide>




        </Swiper>
      </div>
    </section>
  );
};

export default HomeCat;
