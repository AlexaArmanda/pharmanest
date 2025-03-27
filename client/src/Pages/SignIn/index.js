import {useContext, useState, useEffect } from "react";
import MyContext from "../../MyContext";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import backgroundImage from '../../assets/images/signIn.jpeg';
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
const SignIn =() => {

    const context = useContext(MyContext);
    const { login } = useContext(AuthContext);
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
    

    const handleLogin = async () => {
        try {
          const res = await fetch("http://localhost:5000/api/auth/signIn", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ Email: Email, Password: Password }),
          });
      
          if (!res.ok) {
            const errorData = await res.json();
            console.error("Login failed:", errorData.message);
            alert(`Login failed: ${errorData.message}`);
            return;
          }
      
          const data = await res.json();
      
          if (data.token) {
            login(data.user, data.token); 
            setMessage("Login Successful!"); 
            setTimeout(() => {
              navigate("/"); 
            }, 2000);
          } else {
            console.error("Login failed:", data.message);
            setMessage("Login failed: No token received.");
          }
        } catch (error) {
          console.error("Login request failed:", error);
          setMessage("Login request failed. Please try again later.");
        }
      };
      
    

    return (
        <section style={{ backgroundImage: `url(${backgroundImage})` }} className="section signInPage">
            <div className="container">
                <div className="box card p-3 shadow border-0">                    

                    <form className="mt-3">
                    <h2 className="mb-3 text-center">Sign In</h2>
                        <div className="form-group">
                        <TextField id="standard-basic" label="Email" type="email" required variant="standard"  onChange={(e) => setEmail(e.target.value)} className="w-100"/>
                        </div>

                        <div className="form-group">
                        <TextField id="standard-basic" label="Password" type="password" required variant="standard" onChange={(e) => setPassword(e.target.value)} className="w-100"/>
                        </div>

                        <a className="border-effect cursor">Forgot Password?</a>

                        <div className="d-flex align-items-center">
                            <Button onClick={handleLogin} className=" signButton w-100 mt-3 mb-3">Sign In</Button>
                        </div>
                        {message && <p className="text-center">{message}</p>}
                        <p className="text-center">Don't have an account? <Link to="/signUp" className="border-effect cursor">Sign Up</Link></p>

                    </form>
                </div>
            </div>
        </section>
    )
}

export default SignIn;