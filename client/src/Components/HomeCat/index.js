import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Link, useNavigate } from "react-router-dom";

const HomeCat = () => {
  const navigate = useNavigate();

  const handleClearanceClick = () => {
    navigate("/clearance-products");
  };

  return (
    <section className="homeCat">
      <div className="container">
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
            320: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1000: { slidesPerView: 6 },
            1280: { slidesPerView: 8 },
          }}
        >
          <SwiperSlide>
            <div className="item text-center">
              <img src="https://i.postimg.cc/zGbMT1d8/Untitled-design-5.png" />
              <Link to={`/category/15`}><h4>Immunity Boost</h4></Link>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="item text-center">
              <img src="https://i.postimg.cc/Y9kT9BRR/Pharma-Nest-4.png" />
              <Link to={`/category/22`}><h4>Smooth Skin</h4></Link>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="item text-center">
              <img src="https://i.postimg.cc/90WwDjVY/Untitled-design-6.png" />
              <Link to={`/category/23`}><h4>Hair Care</h4></Link>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="item text-center">
              <img src="https://i.postimg.cc/nrK3LRrb/Untitled-design-4.png" />
              <h4></h4><Link to={`/category/42`}><h4>Natural Remedies</h4></Link>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="item text-center">
              <img src="https://i.postimg.cc/hv0cmQ0J/Pharma-Nest-6.png" />
              <h4>PharmaNest Own Brand</h4>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div onClick={handleClearanceClick} className="item text-center">
              <img src="https://i.postimg.cc/x1SCJFZc/last-pieces.png" />
              <h4>Clearance</h4>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="item text-center">
              <img src="https://i.postimg.cc/X74HC6RB/Untitled-design-3.png" />
              <h4>
                <Link to={`/featured/1`}>Gifts & Giftcards</Link>
              </h4>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="item text-center">
              <img src="https://i.postimg.cc/KvBL7Ky0/Untitled-design-2.png" />
              <h4>Online Catalogue</h4>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};

export default HomeCat;
