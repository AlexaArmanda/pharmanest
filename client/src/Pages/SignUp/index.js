import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MyContext from "../../MyContext";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import backgroundImage from "../../assets/images/signUp.jpeg";

const SignUp = () => {
  const context = useContext(MyContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    FullName: "",
    Email: "",
    Password: "",
    Phone: "",
    Address: "",
  });

  const [message, setMessage] = useState(""); 


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", formData);
      setMessage(response.data.message);
      setTimeout(() => navigate("/signIn"), 2000); 
    } catch (error) {
      setMessage("Registration failed: " + (error.response?.data?.error || "Server error"));
    }
  };

  return (
    <section style={{ backgroundImage: `url(${backgroundImage})` }} className="section signInPage signUpPage">
      <div className="container">
        <div className="box card p-3 shadow border-0">
          <form className="mt-3" onSubmit={handleSubmit}>
            <h2 className="mb-3 text-center">Sign Up</h2>

            {message && <p className="text-center">{message}</p>}

            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <TextField
                    label="Full Name"
                    type="text"
                    name="FullName"
                    required
                    variant="standard"
                    className="w-100"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <TextField
                    label="Phone Number"
                    type="text"
                    name="Phone"
                    required
                    variant="standard"
                    className="w-100"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <TextField
                label="Email"
                type="email"
                name="Email"
                required
                variant="standard"
                className="w-100"
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <TextField
                label="Password"
                type="password"
                name="Password"
                required
                variant="standard"
                className="w-100"
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <TextField
                label="Address"
                type="text"
                name="Address"
                required
                variant="standard"
                className="w-100"
                onChange={handleChange}
              />
            </div>

            <div className="d-flex align-items-center">
              <Button className="signButton w-100 mt-3 mb-3" type="submit">
                Sign Up
              </Button>
            </div>

            <p className="text-center text-dark">
              Already have an account? <Link to="/signIn" className="border-effect cursor">Sign In</Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
