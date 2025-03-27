const { sql, poolPromise } = require("../config/db");


const getProducts = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM Products");

    // Log the result to see if data is being fetched correctly
    console.log("Fetched Products:", result.recordset);

    res.json(result.recordset);
  } catch (error) {
    res.status(500).send(error.message);
  }
};


const getProductById = async (req, res) => {
    try {
      const { id } = req.params;
      const pool = await poolPromise;
      
      const result = await pool
        .request()
        .input("ProductID", sql.Int, id) // ✅ Prevents SQL Injection
        .query("SELECT * FROM Products WHERE ProductID = @ProductID");
  
      if (result.recordset.length === 0) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      res.json(result.recordset[0]); // ✅ Send only the found product
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const getProductsByCategory = async (req, res) => {
    try {
      const { categoryId } = req.params;
      const pool = await poolPromise;
  
      const result = await pool
        .request()
        .input("CategoryID", sql.Int, categoryId)
        .query("SELECT * FROM Products WHERE CategoryID = @CategoryID");
  
      if (result.recordset.length === 0) {
        return res.status(404).json({ message: "No products found for this category" });
      }
  
      res.json(result.recordset);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const searchProducts = async (req, res) => {
    try {
      const { q } = req.query;
      console.log("Search query received:", q); // Log the search query
  
      if (!q) {
        return res.json([]); // Return empty array if no query
      }
  
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input("query", sql.VarChar, `%${q}%`) // Ensure partial match with '%'
        .query("SELECT * FROM Products WHERE UPPER(Name) LIKE UPPER(@query)");  
      // Log query and results for debugging
      console.log("Executed SQL Query:", `SELECT * FROM Products WHERE Name LIKE ${'%'+q+'%'}`);
      console.log("Search results:", result.recordset);
  
      res.json(result.recordset); // Return the search results
    } catch (error) {
      console.error("Error in searchProducts:", error); // Log error details
      res.status(500).json({ error: error.message });
    }
  };
  


module.exports = { getProducts, getProductById, searchProducts, getProductsByCategory };
