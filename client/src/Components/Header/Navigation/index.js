import Button from "@mui/material/Button";
import { IoMenu } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FaAngleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId) => {
    navigate(`/category/${categoryId}`);
  };

  const [isOpenSidebarVal, setisOpenSidebarVal] = useState(false);
  return (
    <nav>
      <div className="container">
        <div className="row">
          <div className="col-sm-3 navPart1">
            <div className="catWrapper">
              <Button
                className="allcatTable align-items-center"
                onClick={() => setisOpenSidebarVal(!isOpenSidebarVal)}
              >
                <span className="icon1 mr-2">
                  <IoMenu />
                </span>
                <span className="text">All Categories</span>
                <span className="icon2 ml-2">
                  <FaAngleDown />
                </span>
              </Button>

              <div
                className={`sidebarNav ${
                  isOpenSidebarVal === true ? "open" : ""
                }`}
              >
                <ul>
                  <li>
                    <Link to="/">
                      <Button>
                        Prescription Medicines{" "}
                        <FaAngleRight className="ml-auto" />{" "}
                      </Button>
                    </Link>
                    <div className="submenu">
                      <Button onClick={() => handleCategoryClick(1)}>
                        Antibiotics
                      </Button>
                      <Link to="/">
                        <Button>Blood Pressure Medications</Button>
                      </Link>
                      <Link to="/">
                        <Button>Diabetes Medications</Button>
                      </Link>
                      <Link to="/">
                        <Button>Pain Relievers</Button>
                      </Link>
                      <Link to="/">
                        <Button>Mental Health & Neurology</Button>
                      </Link>
                      <Link to="/">
                        <Button>Thyroid Medications</Button>
                      </Link>
                      <Link to="/">
                        <Button>Hormonal Therapies</Button>
                      </Link>
                    </div>
                  </li>
                  <li>
                    <Link to="/">
                      <Button>
                        Over-the-Counter Medicines
                        <FaAngleRight className="ml-auto" />
                      </Button>
                    </Link>
                    <div className="submenu">
                      <Link to="/">
                        <Button>Pain & Fever Relief</Button>
                      </Link>
                      <Link to="/">
                        <Button>Cold & Flu</Button>
                      </Link>
                      <Link to="/">
                        <Button>Digestive Health</Button>
                      </Link>
                      <Link to="/">
                        <Button>Allergy Relief</Button>
                      </Link>
                      <Link to="/">
                        <Button>Motion Sickness</Button>
                      </Link>
                      <Link to="/">
                        <Button>Sleep Aids</Button>
                      </Link>
                    </div>
                  </li>
                  <li>
                    <Link to="/">
                      <Button>
                        Vitamins & Supplements
                        <FaAngleRight className="ml-auto" />
                      </Button>
                    </Link>
                    <div className="submenu">
                      <Link to="/">
                        <Button>Multivitamins</Button>
                      </Link>
                      <Link to="/">
                        <Button>Immune Boosters</Button>
                      </Link>
                      <Link to="/">
                        <Button>Joint Health</Button>
                      </Link>
                      <Link to="/">
                        <Button>Protein & Weight Management</Button>
                      </Link>
                      <Link to="/">
                        <Button>Hair, Skin & Nails</Button>
                      </Link>
                      <Link to="/">
                        <Button>GSports Nutrition</Button>
                      </Link>
                    </div>
                  </li>
                  <li>
                    <Link to="/">
                      <Button>
                        Personal Care & Hygiene
                        <FaAngleRight className="ml-auto" />
                      </Button>
                    </Link>
                    <div className="submenu">
                      <Link to="/">
                        <Button>Oral Care</Button>
                      </Link>
                      <Link to="/">
                        <Button>Feminine Hygiene</Button>
                      </Link>
                      <Link to="/">
                        <Button>Skin Care</Button>
                      </Link>
                      <Link to="/">
                        <Button>Hair Care</Button>
                      </Link>
                      <Link to="/">
                        <Button>Deodorants & Antiperspirants</Button>
                      </Link>
                      <Link to="/">
                        <Button>Shaving & Grooming</Button>
                      </Link>
                    </div>
                  </li>
                  <li>
                    <Link to="/">
                      <Button>
                        Baby & Mother Care
                        <FaAngleRight className="ml-auto" />
                      </Button>
                    </Link>
                    <div className="submenu">
                      <Link to="/">
                        <Button>Baby Formula & Food</Button>
                      </Link>
                      <Link to="/">
                        <Button>Diapers & Wipes</Button>
                      </Link>
                      <Link to="/">
                        <Button>Breastfeeding Essentials</Button>
                      </Link>
                      <Link to="/">
                        <Button>Baby Health</Button>
                      </Link>
                      <Link to="/">
                        <Button>Baby Care</Button>
                      </Link>
                      <Link to="/">
                        <Button>Baby Bottles & Accessories</Button>
                      </Link>
                    </div>
                  </li>
                  <li>
                    <Link to="/">
                      <Button>
                        First Aid & Wound Care
                        <FaAngleRight className="ml-auto" />
                      </Button>
                    </Link>
                    <div className="submenu">
                      <Link to="/">
                        <Button>Bandages & Dressings</Button>
                      </Link>
                      <Link to="/">
                        <Button>Antiseptics & Disinfectants</Button>
                      </Link>
                      <Link to="/">
                        <Button>Pain Relief Sprays & Balms</Button>
                      </Link>
                      <Link to="/">
                        <Button>Thermometers & BP Monitors</Button>
                      </Link>
                      <Link to="/">
                        <Button>Burn Care</Button>
                      </Link>
                    </div>
                  </li>
                  <li>
                    <Link to="/">
                      <Button>
                        Medical Devices & Equipment
                        <FaAngleRight className="ml-auto" />
                      </Button>
                    </Link>
                    <div className="submenu">
                      <Link to="/">
                        <Button>Blood Pressure Monitors</Button>
                      </Link>
                      <Link to="/">
                        <Button>Glucometers & Test Strips</Button>
                      </Link>
                      <Link to="/">
                        <Button>Nebulizers & Inhalers</Button>
                      </Link>
                      <Link to="/">
                        <Button>Oximeters & Thermometers</Button>
                      </Link>
                      <Link to="/">
                        <Button>Wheelchairs & Mobility Aids</Button>
                      </Link>
                    </div>
                  </li>
                  <li>
                    <Link to="/">
                      <Button>
                        Herbal & Ayurvedic Products
                        <FaAngleRight className="ml-auto" />
                      </Button>
                    </Link>
                    <div className="submenu">
                      <Link to="/">
                        <Button>Ayurvedic Medicines</Button>
                      </Link>
                      <Link to="/">
                        <Button>Homeopathic Remedies</Button>
                      </Link>
                      <Link to="/">
                        <Button>Herbal Supplements</Button>
                      </Link>
                      <Link to="/">
                        <Button>Essential Oils</Button>
                      </Link>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-sm-9 navPart2 d-flex align-items-center">
            <ul className="list list-inline ml-auto">
              <li className="list-inline-item">
                <Link to="/">
                  <Button>Home</Button>
                </Link>
              </li>
              <li className="list-inline-item">
                <Link to="/">
                  <Button>New Products</Button>
                </Link>
                <div className="submenu shadow">
                  <Link to="/">
                    <Button>General Health</Button>
                  </Link>
                  <Link to="/">
                    <Button>General Health</Button>
                  </Link>
                  <Link to="/">
                    <Button>General Health</Button>
                  </Link>
                </div>
              </li>
              <li className="list-inline-item">
                <Link to="/">
                  <Button>On Sale</Button>
                </Link>
              </li>
              <li className="list-inline-item">
                <Link to="/">
                  <Button>Contact</Button>
                </Link>
              </li>
              <li className="list-inline-item">
                <Link to="/">
                  <Button>About Us</Button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
