import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [value, setValue] = useState([100, 600000]);
  const [value2, setValue2] = useState(0);

  return (
    <>
      <div className="sidebar">
        <div className="sticky">
          <div className="filterBox">
            <h5>PRODUCT CATEGORIES</h5>

            <div className="scroll">
              <ul>
                <li>
                  <FormControlLabel
                    className="w-100"
                    control={<Checkbox />}
                    label="Vitamins"
                  />
                </li>

                <li>
                  <FormControlLabel
                    className="w-100"
                    control={<Checkbox />}
                    label="Vitamins"
                  />
                </li>

                <li>
                  <FormControlLabel
                    className="w-100"
                    control={<Checkbox />}
                    label="Vitamins"
                  />
                </li>

                <li>
                  <FormControlLabel
                    className="w-100"
                    control={<Checkbox />}
                    label="Vitamins"
                  />
                </li>

                <li>
                  <FormControlLabel
                    className="w-100"
                    control={<Checkbox />}
                    label="Vitamins"
                  />
                </li>

                <li>
                  <FormControlLabel
                    className="w-100"
                    control={<Checkbox />}
                    label="Vitamins"
                  />
                </li>

                <li>
                  <FormControlLabel
                    className="w-100"
                    control={<Checkbox />}
                    label="Vitamins"
                  />
                </li>

                <li>
                  <FormControlLabel
                    className="w-100"
                    control={<Checkbox />}
                    label="Vitamins"
                  />
                </li>

                <li>
                  <FormControlLabel
                    className="w-100"
                    control={<Checkbox />}
                    label="Vitamins"
                  />
                </li>

                <li>
                  <FormControlLabel
                    className="w-100"
                    control={<Checkbox />}
                    label="Vitamins"
                  />
                </li>
              </ul>
            </div>
          </div>

          <div className="filterBox">
            <h5>FILTER BY PRICE</h5>
            <RangeSlider
              value={value}
              onInput={setValue}
              min={100}
              max={600000}
              step={5}
            />
            <div className="d-flex pt-2 pb-2 priceRange">
              <span>
                From: <strong className="text-dark">RON:{value[0]}</strong>
              </span>
              <span className="ml-auto">
                To: <strong className="text-dark">RON:{value[1]}</strong>
              </span>
            </div>
          </div>
          <div className="filterBox">
            <h5>PRODUCT STATUS</h5>

            <div className="scroll">
              <ul>
                <li>
                  <FormControlLabel
                    className="w-100"
                    control={<Checkbox />}
                    label="Last Pieces"
                  />
                </li>

                <li>
                  <FormControlLabel
                    className="w-100"
                    control={<Checkbox />}
                    label="On Sale"
                  />
                </li>

                <li>
                  <FormControlLabel
                    className="w-100"
                    control={<Checkbox />}
                    label="Gift Cards"
                  />
                </li>
              </ul>
            </div>
          </div>

          <div className="filterBox">
            <h5>FILTER BY BRAND</h5>

            <div className="scroll">
              <ul>
                <li>
                  <FormControlLabel
                    className="w-100"
                    control={<Checkbox />}
                    label="Mivolis"
                  />
                </li>

                <li>
                  <FormControlLabel
                    className="w-100"
                    control={<Checkbox />}
                    label="Oscilum"
                  />
                </li>

                <li>
                  <FormControlLabel
                    className="w-100"
                    control={<Checkbox />}
                    label="Farmec"
                  />
                </li>

                <li>
                  <FormControlLabel
                    className="w-100"
                    control={<Checkbox />}
                    label="Pielor"
                  />
                </li>
              </ul>
            </div>
          </div>

          <div>
            <Link to="#">
              <img
                src="https://images.unsplash.com/photo-1491147334573-44cbb4602074?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="w-100"
              />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
