const { sql, poolPromise } = require("../config/db");

const getProductReviews = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await poolPromise;

    const query = `
      SELECT r.ReviewID, r.Rating, r.ReviewText, r.CreatedAt, u.FullName, p.Name
      FROM Reviews r
      INNER JOIN Users u ON r.UserID = u.UserID
      INNER JOIN Products p ON r.ProductID = p.ProductID
      WHERE r.ProductID = @ProductID
      ORDER BY r.CreatedAt DESC;
    `;

    const result = await pool
      .request()
      .input("ProductID", sql.Int, id)
      .query(query);

    return res.json(result.recordset);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const addReview = async (req, res) => {
  try {
    const { ProductID, UserID, Rating, ReviewText } = req.body;

    if (!ProductID || !UserID || !Rating || !ReviewText) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const pool = await poolPromise;

    await pool
      .request()
      .input("ProductID", sql.Int, ProductID)
      .input("UserID", sql.Int, UserID)
      .input("Rating", sql.Int, Rating)
      .input("ReviewText", sql.NVarChar, ReviewText)
      .query(`
        INSERT INTO Reviews (ProductID, UserID, Rating, ReviewText, CreatedAt) 
        VALUES (@ProductID, @UserID, @Rating, @ReviewText, GETDATE())
      `);

    res.status(201).json({ message: "Review added successfully" });
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const getUserReviews = async (req, res) => {
  try {
    const { userID } = req.params;
    const pool = await poolPromise;

    const result = await pool.request().input("UserID", sql.Int, userID).query(`
                SELECT r.ReviewID, r.Rating, r.ReviewText, r.CreatedAt, 
                       p.Name
                FROM Reviews r
                JOIN Products p ON r.ProductID = p.ProductID
                WHERE r.UserID = @UserID
                ORDER BY r.CreatedAt DESC
            `);

    res.status(200).json(result.recordset);
  } catch (error) {
    console.error("Error fetching user reviews:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const updateReview = async (req, res) => {
  try {
    const { reviewID } = req.params;
    const { Rating, ReviewText } = req.body;

    if (!Rating || !ReviewText) {
      return res.status(400).json({ error: "Missing Rating or ReviewText" });
    }

    const pool = await poolPromise;

    await pool
      .request()
      .input("ReviewID", sql.Int, reviewID)
      .input("Rating", sql.Int, Rating)
      .input("ReviewText", sql.NVarChar, ReviewText)
      .query(`
        UPDATE Reviews
        SET Rating = @Rating,
            ReviewText = @ReviewText
        WHERE ReviewID = @ReviewID
      `);

    res.status(200).json({ message: "Review updated successfully" });
  } catch (error) {
    console.error("Error updating review:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteReview = async (req, res) => {
  try {
    const { reviewID } = req.params;

    const pool = await poolPromise;

    await pool
      .request()
      .input("ReviewID", sql.Int, reviewID)
      .query(`
        DELETE FROM Reviews
        WHERE ReviewID = @ReviewID
      `);

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getProductReviews,
  addReview,
  getUserReviews,
  updateReview,
  deleteReview,
};
