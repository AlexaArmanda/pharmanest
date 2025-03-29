const { sql, poolPromise } = require("../config/db");

const getCartProducts = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query("SELECT * FROM Cart INNER JOIN Products ON Cart.ProductID = Products.ProductID");

    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getCartProducts };


