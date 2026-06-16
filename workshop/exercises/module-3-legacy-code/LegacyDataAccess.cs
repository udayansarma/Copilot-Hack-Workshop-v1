using System;
using System.Data;
using System.Data.SqlClient;

namespace LegacyApp.DataAccess
{
    /// <summary>
    /// Legacy data access layer — full of anti-patterns!
    /// Your mission: Use GitHub Copilot to modernize this code.
    /// </summary>
    public class CustomerDataAccess
    {
        // Anti-pattern: Hardcoded connection string
        private string connectionString = "Server=.;Database=CRM;Trusted_Connection=True;";

        // Anti-pattern: Synchronous, no using statements, returns DataTable
        public DataTable GetCustomers()
        {
            SqlConnection conn = new SqlConnection(connectionString);
            conn.Open();
            SqlCommand cmd = new SqlCommand("SELECT * FROM Customers", conn);
            SqlDataAdapter adapter = new SqlDataAdapter(cmd);
            DataTable dt = new DataTable();
            adapter.Fill(dt);
            conn.Close();
            return dt;
        }

        // Anti-pattern: SQL injection via string concatenation!
        public void AddCustomer(string name, string email)
        {
            SqlConnection conn = new SqlConnection(connectionString);
            conn.Open();
            SqlCommand cmd = new SqlCommand(
                "INSERT INTO Customers (Name, Email) VALUES ('" + name + "', '" + email + "')", conn);
            cmd.ExecuteNonQuery();
            conn.Close();
        }

        // Anti-pattern: No error handling, leaks connections on exception
        public DataRow GetCustomerById(int id)
        {
            SqlConnection conn = new SqlConnection(connectionString);
            conn.Open();
            SqlCommand cmd = new SqlCommand("SELECT * FROM Customers WHERE Id = " + id, conn);
            SqlDataAdapter adapter = new SqlDataAdapter(cmd);
            DataTable dt = new DataTable();
            adapter.Fill(dt);
            conn.Close();
            if (dt.Rows.Count > 0)
                return dt.Rows[0];
            return null;
        }

        // Anti-pattern: Business logic mixed with data access
        public bool UpdateCustomerEmail(int id, string newEmail)
        {
            if (newEmail.Contains("@") == false)
                return false;

            SqlConnection conn = new SqlConnection(connectionString);
            conn.Open();
            SqlCommand cmd = new SqlCommand(
                "UPDATE Customers SET Email = '" + newEmail + "' WHERE Id = " + id, conn);
            int rows = cmd.ExecuteNonQuery();
            conn.Close();
            return rows > 0;
        }

        // Anti-pattern: No cancellation support, blocks thread
        public DataTable SearchCustomers(string searchTerm)
        {
            SqlConnection conn = new SqlConnection(connectionString);
            conn.Open();
            SqlCommand cmd = new SqlCommand(
                "SELECT * FROM Customers WHERE Name LIKE '%" + searchTerm + "%'", conn);
            SqlDataAdapter adapter = new SqlDataAdapter(cmd);
            DataTable dt = new DataTable();
            adapter.Fill(dt);
            conn.Close();
            return dt;
        }

        // Anti-pattern: Delete without confirmation, no soft-delete
        public void DeleteCustomer(int id)
        {
            SqlConnection conn = new SqlConnection(connectionString);
            conn.Open();
            SqlCommand cmd = new SqlCommand("DELETE FROM Customers WHERE Id = " + id, conn);
            cmd.ExecuteNonQuery();
            conn.Close();
        }
    }
}
