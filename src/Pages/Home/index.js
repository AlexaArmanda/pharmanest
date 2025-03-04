import HomeBanner from "../../Components/HomeBanner"
import Button from '@mui/material/Button';
import { FaArrowRight } from "react-icons/fa";
import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation} from 'swiper/modules';
import Rating from '@mui/material/Rating';
import ProductItem from "../../Components/ProductItem";
import HomeCat from "../../Components/HomeCat";
import { MdMailOutline } from "react-icons/md";
import Footer from "../../Components/Footer";

const Home = () => {
    
    return(
        <>
        <HomeBanner />
        <HomeCat />
        

        <section className="homeProducts">
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                    <div className="sticky">
                        <div className="banner">
                        <img src="https://plus.unsplash.com/premium_photo-1671098088734-8b8532731aef?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="leftAd" className="cursor w-100"></img>
                        </div>
                    
                        <div className="banner mt-3">
                        <img src="https://plus.unsplash.com/premium_photo-1671098088734-8b8532731aef?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="leftAd" className="cursor w-100"></img>
                        </div>
                    </div>    
                    </div>
                    <div className="col-md-9 productRow">
                        <div className="d-flex align-items-center">
                            <div className="info w-75">
                                <h3 className="mb-0 hd">BEST SELLERS</h3>
                                <p className="textLight text-sml mb-0">Do not miss these offers</p>
                            </div>

                            <Button className="viewAllBtn ml-auto">View All<FaArrowRight /></Button>
                        </div>

                        <div className="productRow w-100 mt-4">
                        <Swiper
                            slidesPerView={4}
                            spaceBetween={10}
                            pagination={{
                            type: 'fraction',
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

                        <div className="d-flex align-items-center mt-4">
                            <div className="info w-75">
                                <h3 className="mb-0 hd">NEW ARRIVALS</h3>
                                <p className="textLight text-sml mb-0">Get the best for your health!</p>
                            </div>

                            <Button className="viewAllBtn ml-auto">View All<FaArrowRight /></Button>
                        </div>

                        <div className="productRow w-100 mt-4">
                        <Swiper
                            slidesPerView={4}
                            spaceBetween={10}
                            pagination={{
                            type: 'fraction',
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

                        <div className="d-flex align-items-center mt-4">
                            <div className="info w-75">
                                <h3 className="mb-0 hd">OUR TOP PICKS</h3>
                                <p className="textLight text-sml mb-0">Get the best for your health!</p>
                            </div>

                            <Button className="viewAllBtn ml-auto">View All<FaArrowRight /></Button>
                        </div>
                        <div className="productRow productRow2 w-100 mt-4 d-flex">
                        
                            
                            <ProductItem />
                            <ProductItem />
                            <ProductItem />
                            <ProductItem />
                            <ProductItem />
                            <ProductItem />
                            <ProductItem />
                        </div>

                        

                        <div className="d-flex mt-4 mb-5 bannerSec justify-content-between">
                            <div className="banner">
                                 <img src="https://images.unsplash.com/photo-1565071783280-719b01b29912?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="leftAd" className="cursor w-100"></img>
                            </div>
                        
                            <div className="banner">
                                 <img src="https://images.unsplash.com/photo-1565071783280-719b01b29912?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="leftAd" className="cursor w-100"></img>
                            </div>
                        </div>

                      </div> 
                    
                  

                </div>
            </div>

        </section>

        <section className="newsLetterSection mt-3 mb-3 d-flex align-items-center">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <p className="text-white mb-1">$20% discount for first order!</p>
                        <h3 className="text-white">Join our Newsletter!</h3>
                        <p className="text-light">Get unlimited access to premium meds</p>
                    
                    <form> 
                        <MdMailOutline />
                        <input type="text" placeholder="Enter your email address"/>
                        <Button>Subscribe</Button>
                    </form>
                            
                    </div>
                    <div className="col-md-6">

                    </div>
                </div>
            </div>
        </section>

        {/* <Footer/> */}
        
        </>
    )
}

export default Home;