
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Demo navigation (authentication will be added later)
    navigate("/dashboard");
  }

  return (
    <div className="login-page">

      {/* Left Section */}
      <div className="login-left">
        <Link to="/" className="login-brand">
          <span className="brand-icon">S</span>
          <span>
            Secure<span className="brand-highlight">Bank</span>
          </span>
        </Link>

        <div className="login-welcome">
          <p className="welcome-label">WELCOME BACK</p>

          <h1>
            Banking made
            <br />
            simple and secure.
          </h1>

          <p className="welcome-description">
            Manage your money, track transactions, and
            enjoy secure banking — all in one place.
          </p>
        </div>

        <p className="login-left-footer">
          © 2026 SecureBank. All rights reserved.
        </p>
      </div>

      {/* Right Section */}
      <div className="login-right">
        <div className="login-form-container">

          <div className="login-heading">
            <h2>Sign in to your account</h2>
            <p>Enter your details to access your account.</p>
          </div>

          <form className="login-form" onSubmit={handleLogin}>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="login-options">
              <label className="remember-me">
                <input type="checkbox" />
                Remember me
              </label>

              <Link to="/forgot-password">
                Forgot password?
              </Link>
            </div>

            <button type="submit" className="login-button">
              Sign In
            </button>

          </form>

          <p className="signup-text">
            Don't have an account?
            <Link to="/register"> Create an account</Link>
          </p>

          <Link to="/" className="back-home">
            ← Back to Home
          </Link>

        </div>
      </div>

    </div>
  );
}

export default Login;
