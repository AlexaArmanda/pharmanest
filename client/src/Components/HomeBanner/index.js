
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";

const HomeBanner =() =>{
 
    
    return(
    
        <div className="container mt-3">
            <div className="homeBannerSection">

        <Swiper
          slidesPerView={1}
          spaceBetween={0}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          navigation={true}
          modules={[Navigation, Autoplay]}
          className="mySwiper"
        >

        <SwiperSlide>
         <div className="item">
             <img src="https://static.vecteezy.com/system/resources/previews/023/417/426/non_2x/medical-infographic-banner-background-clinic-pharmacy-laboratory-test-and-research-healthcare-concept-backdrop-illustration-vector.jpg" alt="ups" className="w-100"></img>
             
         </div>
         </SwiperSlide>
         <SwiperSlide>
         <div className="item">
             <img src="https://static.vecteezy.com/system/resources/previews/023/417/426/non_2x/medical-infographic-banner-background-clinic-pharmacy-laboratory-test-and-research-healthcare-concept-backdrop-illustration-vector.jpg" alt="ups" className="w-100"></img>
             
         </div>
         </SwiperSlide>
         <SwiperSlide>
         <div className="item">
             <img src="https://static.vecteezy.com/system/resources/previews/023/417/426/non_2x/medical-infographic-banner-background-clinic-pharmacy-laboratory-test-and-research-healthcare-concept-backdrop-illustration-vector.jpg" alt="ups" className="w-100"></img>
             
         </div>
         
        </SwiperSlide>
        </Swiper>
        </div>
        </div>
     
    )
}

export default HomeBanner;