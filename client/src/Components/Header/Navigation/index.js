import Button from "@mui/material/Button";
import { FaAngleDown } from "react-icons/fa";
import { useState } from "react";
import { FaAngleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Link } from "@mui/material";
import ContactForm from "../../ContactForm";

const Navigation = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId) => {
    navigate(`/category/${categoryId}`);
  };

  const [isOpenSidebarVal, setisOpenSidebarVal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  
  
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
                <span className="text">All products</span>
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
                    <Button>
                      Prescription Medicines{" "}
                      <FaAngleRight className="ml-auto" />{" "}
                    </Button>

                    <div className="submenu">
                      <Button onClick={() => handleCategoryClick(1)}>
                        Antibiotics
                      </Button>

                      <Button onClick={() => handleCategoryClick(2)}>
                        Blood Pressure Medications
                      </Button>

                      <Button onClick={() => handleCategoryClick(3)}>
                        Diabetes Medications
                      </Button>

                      <Button onClick={() => handleCategoryClick(4)}>
                        Pain Relievers
                      </Button>

                      <Button onClick={() => handleCategoryClick(5)}>
                        Mental Health & Neurology
                      </Button>

                      <Button onClick={() => handleCategoryClick(6)}>
                        Thyroid Medications
                      </Button>

                      <Button onClick={() => handleCategoryClick(7)}>
                        Hormonal Therapies
                      </Button>
                    </div>
                  </li>
                  <li>
                    <Button>
                      Over-the-Counter Medicines
                      <FaAngleRight className="ml-auto" />
                    </Button>

                    <div className="submenu">
                      <Button onClick={() => handleCategoryClick(8)}>
                        Pain & Fever Relief
                      </Button>

                      <Button onClick={() => handleCategoryClick(9)}>
                        Cold & Flu
                      </Button>

                      <Button onClick={() => handleCategoryClick(10)}>
                        Digestive Health
                      </Button>

                      <Button onClick={() => handleCategoryClick(11)}>
                        Allergy Relief
                      </Button>

                      <Button onClick={() => handleCategoryClick(12)}>
                        Motion Sickness
                      </Button>

                      <Button onClick={() => handleCategoryClick(13)}>
                        Sleep Aids
                      </Button>
                    </div>
                  </li>
                  <li>
                    <Button>
                      Vitamins & Supplements
                      <FaAngleRight className="ml-auto" />
                    </Button>

                    <div className="submenu">
                      <Button onClick={() => handleCategoryClick(14)}>
                        Multivitamins
                      </Button>

                      <Button onClick={() => handleCategoryClick(15)}>
                        Immune Boosters
                      </Button>

                      <Button onClick={() => handleCategoryClick(16)}>
                        Joint Health
                      </Button>

                      <Button onClick={() => handleCategoryClick(17)}>
                        Protein & Weight Management
                      </Button>

                      <Button onClick={() => handleCategoryClick(18)}>
                        Hair, Skin & Nails
                      </Button>

                      <Button onClick={() => handleCategoryClick(19)}>
                        GSports Nutrition
                      </Button>
                    </div>
                  </li>
                  <li>
                    <Button>
                      Personal Care & Hygiene
                      <FaAngleRight className="ml-auto" />
                    </Button>

                    <div className="submenu">
                      <Button onClick={() => handleCategoryClick(20)}>
                        Oral Care
                      </Button>

                      <Button onClick={() => handleCategoryClick(21)}>
                        Feminine Hygiene
                      </Button>

                      <Button onClick={() => handleCategoryClick(22)}>
                        Skin Care
                      </Button>

                      <Button onClick={() => handleCategoryClick(23)}>
                        Hair Care
                      </Button>

                      <Button onClick={() => handleCategoryClick(24)}>
                        Deodorants & Antiperspirants
                      </Button>

                      <Button onClick={() => handleCategoryClick(25)}>
                        Shaving & Grooming
                      </Button>
                    </div>
                  </li>
                  <li>
                    <Button>
                      Baby & Mother Care
                      <FaAngleRight className="ml-auto" />
                    </Button>

                    <div className="submenu">
                      <Button onClick={() => handleCategoryClick(26)}>
                        Baby Formula & Food
                      </Button>

                      <Button onClick={() => handleCategoryClick(27)}>
                        Diapers & Wipes
                      </Button>

                      <Button onClick={() => handleCategoryClick(28)}>
                        Breastfeeding Essentials
                      </Button>

                      <Button onClick={() => handleCategoryClick(29)}>
                        Baby Health
                      </Button>

                      <Button onClick={() => handleCategoryClick(30)}>
                        Baby Care
                      </Button>

                      <Button onClick={() => handleCategoryClick(31)}>
                        Baby Bottles & Accessories
                      </Button>
                    </div>
                  </li>
                  <li>
                    <Button>
                      First Aid & Wound Care
                      <FaAngleRight className="ml-auto" />
                    </Button>

                    <div className="submenu">
                      <Button onClick={() => handleCategoryClick(32)}>
                        Bandages & Dressings
                      </Button>

                      <Button onClick={() => handleCategoryClick(33)}>
                        Antiseptics & Disinfectants
                      </Button>

                      <Button onClick={() => handleCategoryClick(34)}>
                        Pain Relief Sprays & Balms
                      </Button>

                      <Button onClick={() => handleCategoryClick(35)}>
                        Thermometers & BP Monitors
                      </Button>

                      <Button onClick={() => handleCategoryClick(36)}>
                        Burn Care
                      </Button>
                    </div>
                  </li>
                  <li>
                    <Button>
                      Medical Devices & Equipment
                      <FaAngleRight className="ml-auto" />
                    </Button>

                    <div className="submenu">
                      <Button onClick={() => handleCategoryClick(37)}>
                        Blood Pressure Monitors
                      </Button>

                      <Button onClick={() => handleCategoryClick(38)}>
                        Glucometers & Test Strips
                      </Button>

                      <Button onClick={() => handleCategoryClick(39)}>
                        Nebulizers & Inhalers
                      </Button>

                      <Button onClick={() => handleCategoryClick(40)}>
                        Oximeters & Thermometers
                      </Button>

                      <Button onClick={() => handleCategoryClick(41)}>
                        Wheelchairs & Mobility Aids
                      </Button>
                    </div>
                  </li>
                  <li>
                    <Button>
                      Herbal & Ayurvedic Products
                      <FaAngleRight className="ml-auto" />
                    </Button>

                    <div className="submenu">
                      <Button onClick={() => handleCategoryClick(42)}>
                        Ayurvedic Medicines
                      </Button>

                      <Button onClick={() => handleCategoryClick(43)}>
                        Homeopathic Remedies
                      </Button>

                      <Button onClick={() => handleCategoryClick(44)}>
                        Herbal Supplements
                      </Button>

                      <Button onClick={() => handleCategoryClick(45)}>
                        Essential Oils
                      </Button>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-sm-9 navPart2 d-flex align-items-center">
            <ul className="list list-inline ml-auto">
              <li className="list-inline-item">
                <Link>
                  <Button
                    onClick={() => {
                      navigate("/");
                    }}
                  >
                    Home
                  </Button>
                </Link>
              </li>
              <li className="list-inline-item">
                <Link>
                  <Button onClick={() => {
                      navigate("/new-products");
                    }}>New Products</Button>
                </Link>
              </li>
              <li className="list-inline-item">
                <Link>
                <Button onClick={() => {
                      navigate("/sale-products");
                    }}>On Sale</Button>
                </Link>
              </li>

              <li className="list-inline-item">
               <Link>              <Button onClick={() => setIsModalOpen(true)}>Contact</Button>
               </Link> 
              {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setIsModalOpen(false)}>X</button>
            <ContactForm />
          </div>
        </div>
      )}
              </li>
              <li className="list-inline-item">
                <Link>
                <Button onClick={() => {
                      navigate("/about");
                    }}>About Us</Button>
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
