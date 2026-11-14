
import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authService";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const email = (formData.get("email") as string).trim();
    const password = formData.get("password") as string;

    try {
      setLoading(true);
      setError("");

      // Call Login API
      await loginUser({ email, password });

      // Navigate only after successful login
      navigate("/dashboard");

    } catch (err: any) {
      const message =
        err.response?.data?.message ||
        (typeof err.response?.data === "string"
          ? err.response.data
          : "Invalid email or password. Please try again.");

      setError(message);

    } finally {
      setLoading(false);
    }
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
                name="email"
                placeholder="Enter your email"
                autoComplete="email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                autoComplete="current-password"
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

            {error && (
              <p className="login-error">{error}</p>
            )}

            <button
              type="submit"
              className="login-button"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
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
