import { TbTruckDelivery } from "react-icons/tb";
import { MdOutlineMedicalInformation } from "react-icons/md";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { GiLaurelsTrophy } from "react-icons/gi";
import { Link } from "react-router-dom";
import { FaTiktok } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import L from "leaflet"; 
import { useState } from "react";
import { Modal, Button } from "@mui/material"; 
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"; 
import "leaflet/dist/leaflet.css"; 
import ReactDOMServer from "react-dom/server"; 

const Footer = () => {
  const locations = [
    {
      name: "PharmaNest Lipscani",
      coordinates: [44.4268, 26.1025],
    },
    {
      name: "PharmaNest Nicolae Iorga",
      coordinates: [44.4241, 26.0981], 
    },
    {
      name: "PharmaNest Unirii No. 43",
      coordinates: [44.426, 26.1027], 
    },
    {
      name: "PharmaNest Coltunas Craiova",
      coordinates: [44.3166, 23.8], 
    },
    {
      name: "PharmaNest Sibiu",
      coordinates: [45.7923, 24.148],
    },
    {
      name: "PharmaNest Aaman",
      coordinates: [44.418, 26.0502], 
    },
    {
      name: "PharmaNest Caracal",
      coordinates: [44.0895, 24.3691], 
    },
  ];

  const iconHtml = ReactDOMServer.renderToStaticMarkup(<FaLocationDot style={{ color: 'red', fontSize: '24px' }} />);

  const customIcon = L.divIcon({
    html: iconHtml,
    iconSize: [24, 24],
    className: ""
  });
  
  const [open, setOpen] = useState(false); 
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleOpen = (location) => {
    setSelectedLocation(location);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedLocation(null);
  };

  return (
    <footer>
      <div className="container">
        <div className="topInfo row">
          <div className="col d-flex align-items-center">
            <span>
              <TbTruckDelivery />
            </span>
            <span className="ml-2">Fast & Secure Delivery</span>
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
              {locations.map((location) => (
                <li key={location.name}>
                  <Link to="#" onClick={() => handleOpen(location)}>
                    <FaLocationDot />
                    {location.name}
                  </Link>
                </li>
              ))}
            </ul>
            <Modal open={open} onClose={handleClose}>
              <div
                className="modal-content"
                style={{
                  padding: "20px",
                  maxWidth: "600px",
                  margin: "auto",
                  backgroundColor: "white",
                }}
              >
                <h2>{selectedLocation?.name}</h2>

                <MapContainer
                  center={selectedLocation?.coordinates || [44.4268, 26.1025]}
                  zoom={13}
                  style={{ height: "400px", width: "100%" }}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker position={selectedLocation?.coordinates || [44.4268, 26.1025]} icon={customIcon}>
                    <Popup>{selectedLocation?.name}</Popup>
                  </Marker>
                </MapContainer>

                <Button onClick={handleClose} style={{ marginTop: "10px" }}>
                  Close
                </Button>
              </div>
            </Modal>
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
            
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit our Facebook page"
            ><span className="facebook">
            <FaFacebook />
          </span></a>

            
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit our Twitter page"
            ><span className="tiktok">
            <FaTiktok />
          </span></a>

            
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit our Instagram page"
            ><span className="instagram">
            <FaInstagram />
          </span></a>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
