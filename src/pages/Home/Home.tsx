
import "./Home.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-page" id="home">

      {/* Navigation */}
      <header className="navbar">
        <a href="#home" className="brand">
          <span className="brand-icon">S</span>
          <span>
            Secure<span className="brand-highlight">Bank</span>
          </span>
        </a>

        <nav className="nav-links">
          <a href="#home" className="active">Home</a>
          <a href="#services">Services</a>
          <a href="#security">Security</a>
          <a href="#about">About</a>
        </nav>

        <div className="nav-actions">
          <Link to="/login" className="login-link">
            Login
          </Link>

          <Link to="/register" className="nav-register">
            Open Account
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">

        <div className="hero-content">
          <div className="hero-tag">
            <span className="status-dot" />
            Banking with advanced security
          </div>

          <h1>
            Your Money.
            <br />
            Your Security.
            <br />
            <span>Your Future.</span>
          </h1>

          <p>
            Experience smarter digital banking with advanced security,
            seamless transactions and complete control over your finances.
          </p>

          <div className="hero-buttons">
            <Link to="/register" className="primary-button">
              Get Started <span>→</span>
            </Link>

            <a href="#security" className="secondary-button">
              Explore Security
            </a>
          </div>

          <div className="hero-trust">
            <span>✓</span> Security-focused digital banking experience
          </div>
        </div>

        <div className="hero-bottom">
          <span>SMART BANKING. STRONGER SECURITY.</span>
          <span>01 — 03</span>
        </div>
      </section>

      {/* Services */}
      <section className="services-section" id="services">
        <div className="section-heading">
          <span className="section-label">WHAT WE OFFER</span>
          <h2>Banking made <span>simpler.</span></h2>
          <p>
            Everything you need to manage your money, all in one secure place.
          </p>
        </div>

        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon">↗</div>
            <h3>Easy Transfers</h3>
            <p>
              Transfer money securely with a simple and convenient banking
              experience.
            </p>
          </div>

          <div className="service-card">
            <div className="service-icon">▤</div>
            <h3>Transaction History</h3>
            <p>
              Track your transactions and monitor your account activity
              whenever you need.
            </p>
          </div>

          <div className="service-card">
            <div className="service-icon">◈</div>
            <h3>Account Management</h3>
            <p>
              Manage your account details and access your banking information
              from one dashboard.
            </p>
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="security-section" id="security">
        <div className="security-content">
          <span className="section-label">YOUR SECURITY MATTERS</span>

          <h2>
            Protection built into
            <span> every transaction.</span>
          </h2>

          <p>
            SecureBank combines modern authentication and intelligent
            security monitoring to help protect your digital banking
            experience.
          </p>

          <div className="security-features">
            <div>
              <span>01</span>
              <p>
                <strong>Multi-Factor Authentication</strong>
                <small>Additional verification for account access.</small>
              </p>
            </div>

            <div>
              <span>02</span>
              <p>
                <strong>Encrypted Communication</strong>
                <small>Secure communication between client and server.</small>
              </p>
            </div>

            <div>
              <span>03</span>
              <p>
                <strong>Fraud Detection</strong>
                <small>Monitor suspicious activity and unusual behaviour.</small>
              </p>
            </div>
          </div>
        </div>

        <div className="security-visual">
          <div className="security-circle">
            <div className="shield-symbol">✓</div>
          </div>

          <div className="security-caption">
            <span className="status-dot" />
            Security-focused banking platform
          </div>
        </div>
      </section>

      {/* About / CTA */}
      <section className="cta-section" id="about">
        <span className="section-label">WELCOME TO SECUREBANK</span>

        <h2>Take control of your banking experience.</h2>

        <p>
          Discover a smarter way to manage your finances with security
          at the centre of every interaction.
        </p>

        <Link to="/register" className="primary-button">
          Create Your Account <span>→</span>
        </Link>
      </section>

      {/* Footer */}
      <footer className="footer">
        <a href="#home" className="brand">
          <span className="brand-icon">S</span>
          <span>
            Secure<span className="brand-highlight">Bank</span>
          </span>
        </a>

        <p>© 2026 SecureBank. All rights reserved.</p>

        <a href="#home">Back to top ↑</a>
      </footer>

    </div>
  );
}

export default Home;
