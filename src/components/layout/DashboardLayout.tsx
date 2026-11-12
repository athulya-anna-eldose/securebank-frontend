
import { Link, useLocation } from "react-router-dom";
import "./DashboardLayout.css";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: "⌂" },
    { name: "Transactions", path: "/transactions", icon: "↔" },
    { name: "Transfer", path: "/transfer", icon: "⇄" },
    { name: "Profile", path: "/profile", icon: "♙" },
  ];

  return (
    <div className="dashboard-layout">

      <aside className="sidebar">
        <Link to="/dashboard" className="sidebar-brand">
          <span className="brand-icon">S</span>
          Secure<span className="brand-highlight">Bank</span>
        </Link>

        <p className="sidebar-label">MAIN MENU</p>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={
                location.pathname === item.path
                  ? "sidebar-link active"
                  : "sidebar-link"
              }
            >
              <span>{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>

        <Link to="/" className="logout-link">
          ↪ Logout
        </Link>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <h2>SecureBank</h2>
            <p>Your personal banking space</p>
          </div>

          <div className="header-user">
            <span className="user-avatar">A</span>
            <span>Account Holder</span>
          </div>
        </header>

        <section className="dashboard-content">
          {children}
        </section>
      </main>

    </div>
  );
}

export default DashboardLayout;
