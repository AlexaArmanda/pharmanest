const { sql, poolPromise } = require("../config/db");

class ProductModel {
  static async getAllProducts() {
    try {
      const pool = await poolPromise;
      const result = await pool.request().query("SELECT * FROM Products");
      return result.recordset;
    } catch (error) {
      throw error;
    }
  }

  static async getProductById(id) {
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input("id", sql.Int, id)
        .query("SELECT * FROM Products WHERE id = @id");
      return result.recordset[0];
    } catch (error) {
      throw error;
    }
  }

  static async addProduct(name, description, price, stock) {
    try {
      const pool = await poolPromise;
      await pool
        .request()
        .input("name", sql.VarChar, name)
        .input("description", sql.Text, description)
        .input("price", sql.Decimal(10, 2), price)
        .input("stock", sql.Int, stock)
        .query(
          "INSERT INTO Products (name, description, price, stock) VALUES (@name, @description, @price, @stock)"
        );
      return { message: "Product added successfully" };
    } catch (error) {
      throw error;
    }
  }

  static async updateProduct(id, name, description, price, stock) {
    try {
      const pool = await poolPromise;
      await pool
        .request()
        .input("id", sql.Int, id)
        .input("name", sql.VarChar, name)
        .input("description", sql.Text, description)
        .input("price", sql.Decimal(10, 2), price)
        .input("stock", sql.Int, stock)
        .query(
          "UPDATE Products SET name = @name, description = @description, price = @price, stock = @stock WHERE id = @id"
        );
      return { message: "Product updated successfully" };
    } catch (error) {
      throw error;
    }
  }

  static async deleteProduct(id) {
    try {
      const pool = await poolPromise;
      await pool.request().input("id", sql.Int, id).query("DELETE FROM Products WHERE id = @id");
      return { message: "Product deleted successfully" };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ProductModel;
