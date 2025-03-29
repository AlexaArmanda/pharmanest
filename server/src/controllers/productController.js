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
      console.log('Category ID:', id);
      console.log('Filters:', filters); 
  
      const filterArray = filters.split(',');
      console.log('Filter Array:', filterArray); 
  
      const pool = await poolPromise;
      let query = "SELECT * FROM Products WHERE CategoryID = @id";
      let filterParams = [{ name: "id", type: sql.Int, value: id }];
  
      filterArray.forEach((filter) => {
        const [filterType, filterValue] = filter.split(':');
        console.log(`filterType: ${filterType}, filterValue: ${filterValue}`);
  
        if (filterType === 'brand') {
          const brands = filterValue.split('|');
          const brandParams = brands.map((brand, index) => `@Brand${index}`).join(', ');
          query += ` AND Brand IN (${brandParams})`;
          brands.forEach((brand, index) => {
              filterParams.push({ name: `Brand${index}`, type: sql.VarChar, value: brand });
          });
      }
  
        if (filterType === 'price') {
          const [minPrice, maxPrice] = filterValue.split('-');
          query += " AND Price BETWEEN @MinPrice AND @MaxPrice";
          filterParams.push({ name: "MinPrice", type: sql.Decimal, value: minPrice || 0 });
          filterParams.push({ name: "MaxPrice", type: sql.Decimal, value: maxPrice || 9999999 });
        }
  
        if (filterType === 'stock') {
          const stockFilters = filterValue.split('|'); 
          let stockConditions = [];
        
          if (stockFilters.includes('lowStock')) {
            stockConditions.push("Stock < 10");
          }
          if (stockFilters.includes('inStock')) {
            stockConditions.push("Stock >= 10");
          }
          
          if (stockConditions.length > 0) {
            query += ` AND (${stockConditions.join(" OR ")})`; 
          }
        }
      });
  
      console.log('Constructed SQL Query:', query);
  
      const request = pool.request();
      filterParams.forEach(param => {
        request.input(param.name, param.type, param.value);
      });
  
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
  
  

module.exports = { getProducts, getProductById, searchProducts,getBrands, getProductsByCategory, getFilteredProductsByCategory };
