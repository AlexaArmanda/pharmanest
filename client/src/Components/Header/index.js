import Logo from "../../assets/images/PharmaNest.png";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { FaRegUser } from "react-icons/fa";
import { GrCart } from "react-icons/gr";
import SearchBox from "./SearchBox";
import Navigation from "./Navigation";
import { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { cart } = useCart();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 770);

  const [isLoggedIn, setIsLoggedIn] = useState(false);


  const navigate = useNavigate();


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 770);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); 
  }, []);


  const totalItemsInCart = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="headerWrapper">
      <div className="top-strip bg-green">
        <div className="container-fluid">
          <p className="mb-0 mt-0 text-center">
            Use the code SPRING20 for 20% off your next purchase!
          </p>
        </div>
      </div>

      <header className="header">
        <div className="container">
          <div className="row">
            {!isMobile && (
              <div className="logoWrapper d-flex col-sm-12">
                <Link to={"/"}>
                  <img src={Logo} alt="Logo"></img>
                </Link>

                <div className="logoWrapper col-sm-11 d-flex align-items-center">
                  <SearchBox />
                  <div className="part3 d-flex ml-auto">
                  <Button
                      onClick={() => navigate(isLoggedIn ? "/profile" : "/signIn")}
                      className="circle mr-3"
                    >
                      <FaRegUser />
                    </Button>
                    <div className="ml-auto cartTab d-flex align-items-center">
                      <div className="position-relative ml-2">
                        <Button
                          className="circle ml-2"
                          onClick={() => navigate("/cart")}
                        >
                          <GrCart />
                        </Button>
                        {totalItemsInCart > 0 && (
                          <span className="count d-flex align-items-center justify-content-center">
                            {totalItemsInCart}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {isMobile && (
              <div className="logoWrapper d-flex col-sm-12">
                <Link to={"/"}>
                  <img src={Logo} alt="Logo"></img>
                </Link>

                <div className="part3 d-flex align-items-center ml-auto">
                <Button
                      onClick={() => navigate(isLoggedIn ? "/profile" : "/signIn")}
                      className="circle mr-3"
                    >
                      <FaRegUser />
                    </Button>
                  <div className="ml-auto cartTab d-flex align-items-center">
                  <div className="position-relative ml-2">
                        <Button
                          className="circle ml-2"
                          onClick={() => navigate("/cart")}
                        >
                          <GrCart />
                        </Button>
                        {totalItemsInCart > 0 && (
                          <span className="count d-flex align-items-center justify-content-center">
                            {totalItemsInCart}
                          </span>
                        )}
                      </div>
                  </div>
                </div>
              </div>
            )}

            <div className="visibleSM">
              <SearchBox /> 
            </div>
          </div>
        </div>
      </header>

      <Navigation />
    </div>
  );
};

export default Header;
