
import { Link } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";

function Dashboard() {
  return (
    <DashboardLayout>
      <h1 className="page-title">Welcome back!</h1>
      <p className="page-description">
        Here's an overview of your banking activity.
      </p>

      <div className="content-card">
        <p>Available Balance</p>
        <h1 style={{ fontSize: "32px", marginTop: "12px" }}>
          ₹75,000.00
        </h1>
        <p style={{ marginTop: "10px", color: "#7b8493" }}>
          Savings Account •••• 3456
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
    </DashboardLayout>
  );
}

export default Dashboard;
