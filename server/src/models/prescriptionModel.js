const { sql, poolPromise } = require("../config/db");
const insertPrescription = async (userId, filePath) => {
    let transaction;
    try {
        const pool = await poolPromise;
        transaction = pool.transaction();
        await transaction.begin();

        const prescriptionResult = await transaction
            .request()
            .input("UserID", sql.Int, userId)
            .input("FilePath", sql.NVarChar, filePath)
            .input("UploadedAt", sql.DateTime, new Date())
            .input("Status", sql.VarChar, "Pending")
            .query(`
                INSERT INTO Prescriptions (UserID, FilePath, UploadedAt, Status)
                OUTPUT INSERTED.PrescriptionID
                VALUES (@UserID, @FilePath, @UploadedAt, @Status)
            `);

        await transaction.commit();
        return { 
            prescriptionId: prescriptionResult.recordset[0].PrescriptionID, 
            message: "Prescription uploaded successfully!" 
        };

    } catch (error) {
        if (transaction) await transaction.rollback();
        throw new Error(`Database error: ${error.message}`);
    }
};

const getUserPrescriptionsFromDB = async (userId) => {
    try {
        console.log("Fetching prescriptions for user:", userId);
        const pool = await poolPromise;

        const result = await pool
            .request()
            .input("UserID", sql.Int, userId)
            .query(`
                SELECT PrescriptionID, FilePath, UploadedAt, Status
                FROM Prescriptions
                WHERE UserID = @UserID
                ORDER BY UploadedAt DESC
            `);

        return result.recordset;
    } catch (error) {
        console.error("Error fetching user prescriptions:", error);
        throw new Error("Failed to retrieve prescriptions.");
    }
};

module.exports = { insertPrescription, getUserPrescriptionsFromDB };
