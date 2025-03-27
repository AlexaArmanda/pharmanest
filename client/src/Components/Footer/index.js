import { TbTruckDelivery } from "react-icons/tb";
import { MdOutlineMedicalInformation } from "react-icons/md";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { GiLaurelsTrophy } from "react-icons/gi";
import { Link } from "react-router-dom";
import { CgFacebook } from "react-icons/cg";
import { CgInstagram } from "react-icons/cg";
import { FaLocationDot } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="topInfo row">
          <div className="col d-flex align-items-center">
            <span>
              <TbTruckDelivery />
            </span>
            <span className="ml-2">Fast delivery</span>
          </div>

          <div className="col d-flex align-items-center">
            <span>
              <MdOutlineMedicalInformation />
            </span>
            <span className="ml-2">Certified Proffessionals</span>
          </div>

          <div className="col d-flex align-items-center">
            <span>
              <MdOutlineVerifiedUser />
              Authentic Medication
            </span>
            <span className="ml-2"></span>
          </div>

          <div className="col d-flex align-items-center">
            <span>
              <GiLaurelsTrophy />
            </span>
            <span className="ml-2">No. 1 in Romania</span>
          </div>
        </div>

        <div className="row mt-5 linkWrapper">
          <div className="col">
            <h5>Customer Service</h5>
            <ul>
              <li>
                <Link to="#">Offer Details</Link>
              </li>
              <li>
                <Link to="#">Shipping</Link>
              </li>
              <li>
                <Link to="#">Returns</Link>
              </li>
              <li>
                <Link to="#">Payments</Link>
              </li>
              <li>
                <Link to="#">Contact Us</Link>
              </li>
              <li>
                <Link to="#">Help</Link>
              </li>
            </ul>
          </div>
          <div className="col">
            <h5>Company Information</h5>
            <ul>
              <li>
                <Link to="#">Careers</Link>
              </li>
              <li>
                <Link to="#">Social Responsibility</Link>
              </li>
              <li>
                <Link to="#">PharmaNest Advertising Group</Link>
              </li>
              <li>
                <Link to="#">Charity Affiliations</Link>
              </li>
              <li>
                <Link to="#">Blog</Link>
              </li>
              <li>
                <Link to="#">Diversity & Inclusion</Link>
              </li>
              <li>
                <Link to="#">FAQs</Link>
              </li>
            </ul>
          </div>
          <div className="col">
            <h5>Locations</h5>
            <ul>
              <li>
                <Link to="#">
                  <FaLocationDot />
                  PharmaNest Lipscani
                </Link>
              </li>
              <li>
                <Link to="#">
                  <FaLocationDot />
                  PharmaNest Nicolae Iorga
                </Link>
              </li>
              <li>
                <Link to="#">
                  <FaLocationDot />
                  PharmaNest Unirii No. 43
                </Link>
              </li>
              <li>
                <Link to="#">
                  <FaLocationDot />
                  PharmaNest Coltunas Craiova
                </Link>
              </li>
              <li>
                <Link to="#">
                  <FaLocationDot />
                  PharmaNest Sibiu
                </Link>
              </li>
              <li>
                <Link to="#">
                  <FaLocationDot />
                  PharmaNest Aaman
                </Link>
              </li>
              <li>
                <Link to="#">
                  <FaLocationDot />
                  PharmaNest Caracal
                </Link>
              </li>
            </ul>
          </div>
          <div className="col">
            <h5>Privacy Information</h5>
            <ul>
              <li>
                <Link to="#">Privacy Center</Link>
              </li>
              <li>
                <Link to="#">Notice of Privacy Practices(HIPAA)</Link>
              </li>
              <li>
                <Link to="#">Online Privacy & Security Policy</Link>
              </li>
              <li>
                <Link to="#">Your Privacy Choices</Link>
              </li>
              <li>
                <Link to="#">Dolj Consumer Health Privacy Policy</Link>
              </li>
              <li>
                <Link to="#">Terms & Conditions</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="copyright mt-3 pt-3 pb-3 d-flex">
          <p className="mb-0">Copyright 2025. All rights reserved</p>
          <ul className="list list-inline ml-auto mb-0">
            <li className="list-inline-item">
              <Link to="#">
                <CgFacebook />
              </Link>
            </li>

            <li className="list-inline-item">
              <Link to="#">
                <CgInstagram />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
