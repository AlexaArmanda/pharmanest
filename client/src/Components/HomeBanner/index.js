import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomeBanner = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2500,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  const banners = [
    "https://i.postimg.cc/0QM6nK6w/Gym-Beam-Banner.png",
    "https://i.postimg.cc/0N96hGZg/minimalist-spring-sale-banner-1.png",
    "https://i.postimg.cc/BnspCntm/Blue-And-White-Modern-Pharmacy-Services-Banner.png",
  ];

  return (
    <div className="container mt-3">
      <div className="homeBannerSection">
        <Slider {...settings}>
          {banners.map((src, index) => (
            <div key={index} className="banner-slide">
              <img src={src} alt={`banner-${index}`} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default HomeBanner;
