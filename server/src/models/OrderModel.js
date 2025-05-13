const { sql, poolPromise } = require("../config/db");




const createOrder = async (userId, cartItems, shippingAddress, paymentMethod, totalAmount) => {
  let transaction;

  try {
      console.log("Connecting to database...");
      const pool = await poolPromise;
      console.log("Database connected:", pool.connected);

      transaction = pool.transaction();
      await transaction.begin();
      console.log("Transaction started...");

      for (const item of cartItems) {
        const actualPrice = item.IsOnSale && item.SalePrice != null ? item.SalePrice : item.Price;
        const itemTotal = item.quantity * actualPrice;
      
        console.log(`Item - productId: ${item.ProductID}, quantity: ${item.quantity}, final price: ${actualPrice}, subtotal: ${itemTotal}`);
      }
      
      console.log(`Total amount received from frontend: ${totalAmount}`);
      

      const orderResult = await transaction
          .request()
          .input("UserID", sql.Int, userId)
          .input("OrderDate", sql.DateTime, new Date())
          .input("TotalAmount", sql.Decimal(10, 2), totalAmount)
          .input("Status", sql.VarChar, "Pending")
          .input("ShippingAddress", sql.VarChar, shippingAddress)
          .input("PaymentMethod", sql.VarChar, paymentMethod)
          .input("PaymentStatus", sql.VarChar, "Pending")
          .input("ShippingStatus", sql.VarChar, "Pending")
          .query(`
              INSERT INTO Orders (UserID, OrderDate, TotalAmount, Status, ShippingAddress, PaymentMethod, PaymentStatus, ShippingStatus)
              OUTPUT INSERTED.OrderID
              VALUES (@UserID, @OrderDate, @TotalAmount, @Status, @ShippingAddress, @PaymentMethod, @PaymentStatus, @ShippingStatus)
          `);

      const orderId = orderResult.recordset[0].OrderID;
      console.log("Order created with ID:", orderId);

      for (const item of cartItems) {
          const actualPrice = item.IsOnSale && item.SalePrice != null ? item.SalePrice : item.Price;
          const itemTotal = item.quantity * actualPrice;

          await transaction
              .request()
              .input("OrderID", sql.Int, orderId)
              .input("ProductID", sql.Int, item.ProductID)
              .input("Quantity", sql.Int, item.quantity)
              .input("PriceAtOrder", sql.Decimal(10, 2), actualPrice)
              .input("TotalPrice", sql.Decimal(10, 2), itemTotal)
              .query(`
                  INSERT INTO OrderDetails (OrderID, ProductID, Quantity, PriceAtOrder, TotalPrice)
                  VALUES (@OrderID, @ProductID, @Quantity, @PriceAtOrder, @TotalPrice)
              `);
      }

      await transaction.commit();
      console.log("Transaction committed successfully.");
      return { orderId, message: "Order placed successfully!" };

  } catch (error) {
      console.error("Error placing order:", error);

      if (transaction) {
          console.log("Rolling back transaction...");
          await transaction.rollback();
      }

      throw new Error("Failed to place order.");
  }
};

const getUserOrdersFromDB = async (userId) => {
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input("UserID", sql.Int, userId)
        .query(`
          SELECT OrderID, OrderDate, TotalAmount, Status
          FROM Orders
          WHERE UserID = @UserID
          ORDER BY OrderDate DESC
        `);
  
      return result.recordset;
    } catch (error) {
      console.error("Error fetching user orders:", error);
      throw new Error("Failed to retrieve orders.");
    }
  };

module.exports = { createOrder, getUserOrdersFromDB };
