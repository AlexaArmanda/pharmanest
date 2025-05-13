import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  IconButton,
  TextField,
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
  CircularProgress,
  Avatar,
  Paper,
  Button,
  Dialog,
  Rating,
} from "@mui/material";
import {
  Favorite,
  RateReview,
  UploadFile,
  Menu,
  ShoppingBag,
  CloudUpload,
  ExitToApp,
    Edit as EditIcon, // ✅ Fix icon imports
  Delete as DeleteIcon,
} from "@mui/icons-material";
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
  const [mobileOpen, setMobileOpen] = useState(false);
  const [totalSpent, setTotalSpent] = useState(0);
  const [couponDialogOpen, setCouponDialogOpen] = useState(true);
const [editingReviewId, setEditingReviewId] = useState(null);
const [editedText, setEditedText] = useState("");
const [editedRating, setEditedRating] = useState(0);




    const fetchUserReviews = async () => {
      try {
        const userID = localStorage.getItem("UserID");
        const response = await axios.get(
          `http://localhost:5000/api/review/user/${userID}`
        );
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching user reviews:", error);
      }
    };

    fetchUserReviews();

    const handleEdit = (review) => {
  setEditingReviewId(review.ReviewID);
  setEditedText(review.ReviewText);
  setEditedRating(review.Rating);
};

const handleCancelEdit = () => {
  setEditingReviewId(null);
  setEditedText("");
  setEditedRating(0);
};

const handleSaveEdit = async () => {
  try {
    await axios.put(`http://localhost:5000/api/review/${editingReviewId}`, {
      ReviewText: editedText,
      Rating: editedRating,
    });
    setEditingReviewId(null);
    fetchUserReviews(); // refresh reviews
  } catch (error) {
    console.error("Error updating review:", error);
    alert("Failed to update review.");
  }
};

const handleDeleteReview = async (reviewID) => {
  if (!window.confirm("Are you sure you want to delete this review?")) return;

  try {
    await axios.delete(`http://localhost:5000/api/review/${reviewID}`);
    fetchUserReviews(); // refresh
  } catch (error) {
    console.error("Delete failed:", error);
    alert("Failed to delete review.");
  }
};

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


const sum = orders.reduce((acc, order) => acc + order.TotalAmount, 0);
  setTotalSpent(sum);

  const fetchTotalSpent = async () => {
    try {
      const token = localStorage.getItem("token");  // Get user token from localStorage
      const response = await axios.get(
        "http://localhost:5000/api/orders/totalSpent",  // API endpoint to fetch total spent
        {
          headers: { Authorization: `Bearer ${token}` },  // Send token for authentication
        }
      );
  
      const totalSpent = response.data.totalSpent;  // Get total spent from response
      console.log("Total Spent:", totalSpent);  // Display total spent (you can update the state/UI here)
    } catch (error) {
      console.error("Error fetching total spent:", error);
    }
  };
  
  // Call the function when needed (for example, on page load)
  fetchTotalSpent();




    const fetchUserFavorites = () => {
      const userData = JSON.parse(localStorage.getItem("user"));
      const userID = userData?.UserID;

      if (!userID) {
        console.warn("User not logged in, no favorites to load");
        setFavorites([]);
        return;
      }

      const storedFavorites =
        JSON.parse(localStorage.getItem(`favorites_${userID}`)) || [];
      setFavorites(storedFavorites);
    };

    fetchUserFavorites();
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

  

  const handleProfilePictureUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
  
    const formData = new FormData();
    formData.append("profilePicture", file);
  
    try {
      const response = await fetch("http://localhost:5000/api/users/upload-profile-picture", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      // refresh user data or update user.ProfilePictureURL
    } catch (error) {
      console.error("Upload error:", error);
    }
  };


   

  <Dialog open={couponDialogOpen} onClose={() => setCouponDialogOpen(false)} maxWidth="sm" fullWidth>
  <Paper
    elevation={5}
    sx={{
      background: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
      p: 4,
      textAlign: 'center',
      borderRadius: 4,
      position: 'relative',
    }}
  >
    <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#fff' }}>
      🎁 Your Coupon
    </Typography>
    <Typography variant="h2" sx={{ my: 3, fontFamily: 'monospace', letterSpacing: 2, color: '#fff' }}>
      30OFF
    </Typography>
    <Typography variant="body1" sx={{ color: '#fff' }}>
      Use this code at checkout to get <strong>30% off</strong> your order!
    </Typography>
    <Button
      onClick={() => setCouponDialogOpen(true)}
      variant="contained"
      sx={{
        position: 'absolute',
        top: 8,
        right: 8,
        backgroundColor: 'rgba(255,255,255,0.2)',
        color: '#fff',
        '&:hover': { backgroundColor: 'rgba(255,255,255,0.4)' },
      }}
    >
      Close
    </Button>
  </Paper>
</Dialog>


  const drawerContent = (
    <Box sx={{ width: 240, p: 2 }}>
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
    </Box>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "favorites":
        return (
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              My Favorites
            </Typography>
            {favorites.length > 0 ? (
              <div className="favorites-container">
                {favorites.map((product) => (
                  <div key={product.ProductID} className="product-item">
                    <ProductItem key={product.ProductID} product={product} />
                  </div>
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
          <Typography variant="h6">{review.Name || review.ProductName}</Typography>

          {editingReviewId === review.ReviewID ? (
            <>
              <Rating
                value={editedRating}
                onChange={(e, newValue) => setEditedRating(newValue)}
              />
              <TextField
                fullWidth
                multiline
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                sx={{ my: 1 }}
              />
              <Box sx={{ display: "flex", gap: 1 }}>
                <Button onClick={handleSaveEdit} variant="contained" size="small">
                  Save
                </Button>
                <Button onClick={handleCancelEdit} variant="outlined" size="small">
                  Cancel
                </Button>
              </Box>
            </>
          ) : (
            <>
              <Typography sx={{ mt: 1 }}>⭐ {review.Rating}/5</Typography>
              <Typography sx={{ mt: 1 }}>{review.ReviewText}</Typography>
              <Typography variant="caption" color="textSecondary" sx={{ mt: 1, display: "block" }}>
                Posted on: {new Date(review.CreatedAt).toLocaleDateString()}
              </Typography>

              <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
                <Button
                  onClick={() => handleEdit(review)}
                  startIcon={<EditIcon />}
                  size="small"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDeleteReview(review.ReviewID)}
                  color="error"
                  startIcon={<DeleteIcon />}
                  size="small"
                >
                  Delete
                </Button>
              </Box>
            </>
          )}
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
              {loading ? (
  <CircularProgress />
) : user && typeof totalSpent === 'number' ? (
  <>
    <Avatar
      src={user.ProfilePictureURL}
      sx={{ width: 100, height: 100, mb: 2 }}
    >
      {user.Name?.charAt(0)}
    </Avatar>
    <Typography variant="h6">Name: {user.Name}</Typography>
    <Typography variant="h6">Email: {user.Email}</Typography>

    <Button variant="contained" component="label" sx={{ mt: 2 }}>
      Add Profile Picture
      <input
        type="file"
        accept="image/*"
        hidden
        onChange={handleProfilePictureUpload}
      />
    </Button>

    <Paper elevation={2} sx={{ p: 2, mt: 4 }}>
      <Typography variant="h6" gutterBottom>My Coupons</Typography>
      {totalSpent >= 500 ? (
        <>
          <Typography color="success.main" gutterBottom>
            🎉 Congrats! You unlocked a 30% off voucher!
          </Typography>
          <Button variant="contained" color="secondary" onClick={() => setCouponDialogOpen(true)}>
            See Coupon Code
          </Button>
        </>
      ) : (
        <Typography>
          Spend ${500 - totalSpent} more to unlock a 30% off voucher.
        </Typography>
      )}

      <Box sx={{ mt: 2 }}>
        <Typography variant="body2" gutterBottom>
          Total spent: ${totalSpent.toFixed(2)} / $500
        </Typography>
        <Box sx={{ width: '100%', backgroundColor: '#eee', borderRadius: 1 }}>
          <Box
            sx={{
              width: `${Math.min((totalSpent / 500) * 100, 100)}%`,
              bgcolor: totalSpent >= 500 ? 'success.main' : 'primary.main',
              height: 20,
              borderRadius: 1,
            }}
          />
        </Box>
      </Box>
    </Paper>
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
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          minHeight: "100vh",
        }}
      >
        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            justifyContent: "flex-start",
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setMobileOpen(true)}
            sx={{ m: 1 }}
          >
            <Menu />
          </IconButton>
        </Box>

        {mobileOpen && (
          <Box
            sx={{
              position: "absolute",
              top: "64px",
              left: 0,
              width: "100%",
              bgcolor: "background.paper",
              boxShadow: 3,
              zIndex: 1200,
              display: { xs: "block", md: "none" },
            }}
          >
            {drawerContent}
          </Box>
        )}

        <Box sx={{ display: { xs: "none", md: "block" } }}>{drawerContent}</Box>

        <Box sx={{ flexGrow: 1, p: 3 }}>{renderContent()}</Box>
      </Box>
    </Container>
  );

  
};

export default Profile;
