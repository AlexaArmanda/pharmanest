import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {Box,List,ListItem,ListItemText,Typography,Divider,CircularProgress,Avatar,Paper,Button,} from "@mui/material";
import {Favorite,RateReview,UploadFile,ShoppingBag,CloudUpload,ExitToApp,} from "@mui/icons-material";
import axios from "axios";
import ProductItem from "../../Components/ProductItem";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("favorites");
  const [favorites, setFavorites] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.warn("No token found, redirecting...");
          navigate("/signIn");
          return;
        }

        const response = await axios.get(
          "http://localhost:5000/api/auth/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );

        setUser(response.data);
      } catch (error) {
        console.error("Profile fetch error:", error.message || "Unknown error");

        if (error.response?.status === 401) {
          console.warn("Token expired, logging out...");
          localStorage.removeItem("token");
          navigate("/signIn");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();

    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5000/api/orders/history",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setOrders(response.data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };
    fetchOrders();

    const fetchUserReviews = async () => {
        try {
            const userID = localStorage.getItem("UserID");
            const response = await axios.get(`http://localhost:5000/api/review/user/${userID}`);
            setReviews(response.data);
        } catch (error) {
            console.error("Error fetching user reviews:", error);
        }
    };

    fetchUserReviews();

    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signIn");
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const token = localStorage.getItem("token");
    const UserID = localStorage.getItem("UserID");
    
  
    if (!UserID) {
      alert("User is not logged in. Please log in first.");
      return;
    }
  
    const formData = new FormData();
    formData.append("prescription", file);
    formData.append("UserID", UserID);
  
    try {
      const response = await axios.post(
        "http://localhost:5000/api/upload/upload-prescription",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      console.log("Upload successful:", response.data);
      alert("Prescription uploaded successfully!");
  
      setPrescriptions([...prescriptions, response.data]);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload prescription.");
    }
  };
  

  const renderContent = () => {
    switch (activeTab) {
      case "favorites":
        return (
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              My Favorites
            </Typography>
            {favorites.length > 0 ? (
              <div>
                {favorites.map((product) => (
                  <ProductItem key={product.ProductID} product={product} />
                ))}
              </div>
            ) : (
              <Typography>No favorites yet</Typography>
            )}
          </Paper>
        );
        case "reviews":
  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        My Reviews
      </Typography>
      {reviews.length > 0 ? (
        <List>
          {reviews.map((review) => (
            <ListItem key={review.ReviewID} divider sx={{ display: "block" }}>
              <Box sx={{ width: "100%" }}>
                <Typography variant="h6" sx={{ display: "block" }}>
                  {review.Name}
                </Typography>

                <Typography variant="body1" sx={{ display: "block", mt: 1 }}>
                  ⭐ Rating: {review.Rating}/5
                </Typography>

                <Typography variant="body2" sx={{ display: "block", mt: 1 }}>
                  {review.ReviewText}
                </Typography>

                <Typography variant="caption" color="textSecondary" sx={{ display: "block", mt: 1 }}>
                  Posted on: {new Date(review.CreatedAt).toLocaleDateString()}
                </Typography>
              </Box>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography>No reviews yet</Typography>
      )}
    </Paper>
  );

        
      
      case "prescriptions":
        return (
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              My Prescriptions
            </Typography>
            <Button
              variant="contained"
              component="label"
              startIcon={<CloudUpload />}
            >
              Upload Here
              <input type="file" hidden onChange={handleFileUpload} />
            </Button>
            {prescriptions.length > 0 ? (
              <div>{/* add prescription list */}</div>
            ) : (
              <Typography>No prescriptions yet</Typography>
            )}
          </Paper>
        );
      case "orders":
        return (
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Order History
            </Typography>
            {orders.length > 0 ? (
              <List>
                {orders.map((order) => (
                  <ListItem key={order.OrderID} divider>
                    <ListItemText
                      primary={`Order #${order.OrderID} - ${order.Status}`}
                      secondary={`Total: $${
                        order.TotalAmount
                      } | Date: ${new Date(
                        order.OrderDate
                      ).toLocaleDateString()}`}
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography>No orders yet</Typography>
            )}
          </Paper>
        );

      default:
        return (
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              My Profile
            </Typography>
            {user ? (
              <>
                <Avatar sx={{ width: 100, height: 100, mb: 2 }}>
                  {user.Name?.charAt(0)}
                </Avatar>
                <Typography variant="h6">Name: {user.Name}</Typography>
                <Typography variant="h6">Email: {user.Email}</Typography>
              </>
            ) : (
              <Typography>No user data available</Typography>
            )}
          </Paper>
        );
    }
  };

  if (loading)
    return <CircularProgress sx={{ display: "block", margin: "20% auto" }} />;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        minHeight: "100vh",
        padding: 2,
        gap: 2,
      }}
    >
      <Paper sx={{ width: { xs: "100%", md: 240 }, p: 2, flexShrink: 0 }}>
        <Typography variant="h6" gutterBottom>
          My Account
        </Typography>
        <Divider sx={{ my: 2 }} />
        <List>
          <ListItem
            onClick={() => setActiveTab("profile")}
            sx={{ cursor: "pointer" }}
          >
            <Avatar sx={{ width: 24, height: 24, mr: 2 }} />
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem
            onClick={() => setActiveTab("favorites")}
            sx={{ cursor: "pointer" }}
          >
            <Favorite sx={{ mr: 2 }} />
            <ListItemText primary="Favorites" />
          </ListItem>
          <ListItem
            onClick={() => setActiveTab("reviews")}
            sx={{ cursor: "pointer" }}
          >
            <RateReview sx={{ mr: 2 }} />
            <ListItemText primary="Reviews" />
          </ListItem>
          <ListItem
            onClick={() => setActiveTab("prescriptions")}
            sx={{ cursor: "pointer" }}
          >
            <UploadFile sx={{ mr: 2 }} />
            <ListItemText primary="Prescriptions" />
          </ListItem>
          <ListItem
            onClick={() => setActiveTab("orders")}
            sx={{ cursor: "pointer" }}
          >
            <ShoppingBag sx={{ mr: 2 }} />
            <ListItemText primary="Orders" />
          </ListItem>
          <ListItem onClick={handleLogout} sx={{ cursor: "pointer" }}>
            <ExitToApp sx={{ mr: 2 }} />
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Paper>
      <Paper sx={{ flexGrow: 1, p: 3, minHeight: 400 }}>
        {renderContent()}
      </Paper>
    </Box>
  );
};

export default Profile;
