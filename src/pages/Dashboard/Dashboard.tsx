
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { getDashboard, type DashboardData } from "../../services/dashboardService";
import "./Dashboard.css";

function Dashboard() {
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchDashboard() {
      try {
        setLoading(true);
        setError("");

        const data = await getDashboard();
        setDashboard(data);

      } catch (err: any) {
        setError(
          err.response?.data?.message ||
          "Unable to load dashboard. Please try again."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchDashboard();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <DashboardLayout>
      <h1 className="page-title">
        Welcome back{dashboard?.fullName ? `, ${dashboard.fullName}` : "!"}
      </h1>

      <p className="page-description">
        Here's an overview of your banking activity.
      </p>

      {loading ? (
        <div className="content-card">
          <p>Loading your dashboard...</p>
        </div>
      ) : error ? (
        <div className="dashboard-error">
          {error}
        </div>
      ) : dashboard ? (
        <>
          <div className="content-card">
            <p>Available Balance</p>

            <h1 style={{ fontSize: "32px", marginTop: "12px" }}>
              {formatCurrency(dashboard.balance)}
            </h1>

            <p style={{ marginTop: "10px", color: "#7b8493" }}>
              Savings Account ••••{" "}
              {dashboard.accountNumber.slice(-4)}
            </p>
          </div>

          <div className="content-card">
            <h3>Account Overview</h3>

            <p className="dashboard-total">
              Total Transactions: {dashboard.totalTransactions}
            </p>
          </div>

          <div className="content-card">
            <h3>Quick Actions</h3>

            <div className="dashboard-actions">
              <Link to="/transfer">Transfer Money</Link>
              <Link to="/transactions">View Transactions</Link>
              <Link to="/profile">My Profile</Link>
            </div>
          </div>

          <div className="content-card">
            <h3>Recent Transactions</h3>

            {dashboard.recentTransactions.length === 0 ? (
              <p className="dashboard-empty">
                No transactions available yet.
              </p>
            ) : (
              <div className="dashboard-transactions">
                {dashboard.recentTransactions.map((transaction) => (
                  <div
                    className="dashboard-transaction"
                    key={transaction.id}
                  >
                    <div>
                      <p className="transaction-description">
                        {transaction.description}
                      </p>

                      <p className="transaction-date">
                        {formatDate(transaction.transactionDate)}
                      </p>
                    </div>

                    <div className="transaction-amount">
                      <p>
                        {transaction.type === "DEBIT" ? "-" : "+"}
                        {formatCurrency(transaction.amount)}
                      </p>

                      <span>{transaction.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      ) : null}
    </DashboardLayout>
  );
}

export default Dashboard;
