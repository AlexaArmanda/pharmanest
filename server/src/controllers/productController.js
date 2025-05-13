const { sql, poolPromise } = require("../config/db");


const getProducts = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM Products");

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
        .input("ProductID", sql.Int, id) 
        .query("SELECT * FROM Products WHERE ProductID = @ProductID");
  
      if (result.recordset.length === 0) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      res.json(result.recordset[0]);
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
      console.log("Search query received:", q); 
  
      if (!q) {
        return res.json([]); 
      }
  
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input("query", sql.VarChar, `%${q}%`) 
        .query("SELECT * FROM Products WHERE UPPER(Name) LIKE UPPER(@query)");  
      console.log("Executed SQL Query:", `SELECT * FROM Products WHERE Name LIKE ${'%'+q+'%'}`);
      console.log("Search results:", result.recordset);
  
      res.json(result.recordset); 
    } catch (error) {
      console.error("Error in searchProducts:", error);
      res.status(500).json({ error: error.message });
    }
  };

  const getBrands = async (req, res) => {
    try {
        const pool = await poolPromise;
        const categoryId = req.query.category;

        let query = `
            SELECT DISTINCT Brand 
            FROM Products 
            WHERE Brand IS NOT NULL AND Brand <> ''
        `;

        if (categoryId) {
            query += ` AND CategoryID = @categoryId`;
        }

        const request = pool.request();
        if (categoryId) {
            request.input("categoryId", categoryId);
        }

        const result = await request.query(query);

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: "No brands found" });
        }

        res.json(result.recordset.map(row => row.Brand));
    } catch (error) {
        console.error("Error fetching brands:", error);
        res.status(500).json({ error: error.message });
    }
};

const getFilteredProductsByCategory = async (req, res) => {
  try {
    const { id, filters } = req.params;
    const filterArray = filters.split(',');

    const pool = await poolPromise;
    const request = pool.request();

    let whereClause = "p.CategoryID = @CategoryID";
    let havingClause = "";
    let selectedRatings = [];

    request.input("CategoryID", sql.Int, id);

    filterArray.forEach((filter) => {
      const [filterType, filterValue] = filter.split(':');

      if (filterType === 'brand') {
        const brands = filterValue.split('|');
        const brandParams = brands.map((_, i) => `@Brand${i}`).join(', ');
        whereClause += ` AND p.Brand IN (${brandParams})`;
        brands.forEach((brand, i) => {
          request.input(`Brand${i}`, sql.VarChar, brand);
        });
      }

      if (filterType === 'price') {
        const [minPrice, maxPrice] = filterValue.split('-').map(Number);
        whereClause += ` AND p.Price BETWEEN @MinPrice AND @MaxPrice`;
        request.input("MinPrice", sql.Decimal(10, 2), minPrice || 0);
        request.input("MaxPrice", sql.Decimal(10, 2), maxPrice || 9999999);
      }

      if (filterType === 'stock') {
        const stockFilters = filterValue.split('|');
        const conditions = [];
        if (stockFilters.includes('lowStock')) conditions.push("p.Stock < 10");
        if (stockFilters.includes('inStock')) conditions.push("p.Stock >= 10");
        if (conditions.length) whereClause += ` AND (${conditions.join(' OR ')})`;
      }

      if (filterType === 'ratings') {
        selectedRatings = filterValue.split('|').map(Number);
        const minRating = Math.min(...selectedRatings);
        request.input("MinRating", sql.Float, minRating);
        havingClause = "HAVING COUNT(r.Rating) > 0 AND AVG(CAST(r.Rating AS FLOAT)) >= @MinRating";
      }
    });

    const query = `
      SELECT 
        p.ProductID,
        p.Name,
        p.Description,
        p.Price,
        p.SalePrice,
        p.IsOnSale,
        p.Brand,
        p.Stock,
        p.CategoryID,
        p.imageURL,
        p.CreatedAt,
        p.RequiresPrescription,
        ISNULL(AVG(CAST(r.Rating AS FLOAT)), 0) AS AverageRating
      FROM Products p
      LEFT JOIN Reviews r ON p.ProductID = r.ProductID
      WHERE ${whereClause}
      GROUP BY 
        p.ProductID,
        p.Name,
        p.Description,
        p.Price,
        p.SalePrice,
        p.IsOnSale,
        p.Brand,
        p.Stock,
        p.CategoryID,
        p.imageURL,
        p.CreatedAt,
        p.RequiresPrescription
      ${havingClause}
    `;

    const result = await request.query(query);

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: "No products found matching the filters" });
    }

    res.json(result.recordset);
  } catch (error) {
    console.error("Error in getFilteredProductsByCategory:", error);
    res.status(500).json({ error: error.message });
  }
};



  
  const getFeaturedProducts = async (req, res) => {
    try {
      const { featuredID } = req.params;
      if (!featuredID) {
        return res.status(400).json({ message: "Missing featuredID" });
      }
  
      const pool = await poolPromise;
  
      const result = await pool
        .request()
        .input("FeaturedID", sql.Int, featuredID)
        .query(`
          SELECT P.ProductID, P.Name, P.Description, P.Price, P.Stock, 
                 P.CategoryID, P.CreatedAt, P.imageURL, P.Brand
          FROM Products P
          JOIN FeaturedProducts FP ON P.ProductID = FP.ProductID
          WHERE FP.[FeaturedID] = @FeaturedID
        `);
  
      if (result.recordset.length === 0) {
        return res.status(404).json({ message: "No featured products found" });
      }
  
      res.json(result.recordset);
    } catch (error) {
      console.error("Error fetching featured products:", error);
      res.status(500).json({ error: error.message });
    }
  };
  
  const getNewProducts = async (req, res) => {
    try {
      const pool = await poolPromise;
      const result = await pool.request().query(`
        SELECT TOP 25 * 
        FROM Products 
        ORDER BY CreatedAt DESC
      `);
      res.json(result.recordset);
    } catch (error) {
      console.error("Error fetching new products:", error);
      res.status(500).json({ error: error.message });
    }
  };
  
  const getSaleProducts = async (req, res) => {
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .query(`
          SELECT ProductID, Name, Price, SalePrice, IsOnSale, CreatedAt, Stock, CategoryID, imageURL, Brand
          FROM Products 
          WHERE IsOnSale = 1
          ORDER BY CreatedAt DESC
        `);
  
      if (result.recordset.length === 0) {
        return res.status(404).json({ message: "No sale products found" });
      }
  
      res.json(result.recordset);
    } catch (error) {
      console.error("Error fetching sale products:", error.message);
      console.error("Stack Trace:", error.stack); 
      res.status(500).json({ error: error.message });
    }
  };

  const getClearanceProducts = async (req, res) => {
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .query(`
          SELECT ProductID, Name, Price, SalePrice, IsOnSale, Stock, CategoryID, imageURL, Brand
          FROM Products 
          WHERE Stock < 10
          ORDER BY CreatedAt DESC
        `);
  
      if (result.recordset.length === 0) {
        return res.status(404).json({ message: "No clearance products found" });
      }
  
      res.json(result.recordset);
    } catch (error) {
      console.error("Error fetching clearance products:", error);
      res.status(500).json({ error: error.message });
    }
  };
  
  const getBestSellers = async (req, res) => {
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .query(`
          SELECT P.ProductID, P.Name, P.Price, P.Stock, P.imageURL, P.Brand, COUNT(R.ReviewID) AS ReviewCount
          FROM Products P
          LEFT JOIN Reviews R ON P.ProductID = R.ProductID
          GROUP BY P.ProductID, P.Name, P.Price, P.Stock, P.imageURL, P.Brand
          ORDER BY ReviewCount DESC
          OFFSET 0 ROWS FETCH NEXT 30 ROWS ONLY;
        `);
  
      if (result.recordset.length === 0) {
        return res.status(404).json({ message: "No best-seller products found" });
      }
  
      res.json(result.recordset);
    } catch (error) {
      console.error("Error fetching best-seller products:", error);
      res.status(500).json({ error: error.message });
    }
  };
  
  
  


  

module.exports = { getProducts, getProductById, searchProducts,getBrands, getProductsByCategory, getFilteredProductsByCategory, getFeaturedProducts, getNewProducts, getSaleProducts, getClearanceProducts, getBestSellers };
