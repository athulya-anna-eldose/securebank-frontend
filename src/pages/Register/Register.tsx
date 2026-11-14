
import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authService";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleRegister(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    // Check whether passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setSuccess("");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      // Call registration service
      await registerUser({
        fullName,
        email,
        phone,
        password,
        address: "",
      });

      setSuccess("Account created successfully!");

      form.reset();

      setTimeout(() => {
        navigate("/login");
      }, 1200);

    } catch (err: any) {
      const message =
        err.response?.data?.message ||
        (typeof err.response?.data === "string"
          ? err.response.data
          : "Registration failed. Please try again.");

      setError(message);

    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="register-page">
      <div className="register-container">

        <Link to="/" className="register-brand">
          <span className="brand-icon">S</span>
          Secure<span className="brand-highlight">Bank</span>
        </Link>

        <h1>Create your account</h1>

        <p className="register-description">
          Join SecureBank for simple and secure banking.
        </p>

        <form className="register-form" onSubmit={handleRegister}>

          <label>
            Full Name
            <input
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              required
            />
          </label>

          <label>
            Email Address
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
            />
          </label>

          <label>
            Phone Number
            <input
              type="tel"
              name="phone"
              placeholder="Enter your phone number"
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              minLength={8}
              required
            />
          </label>

          <label>
            Confirm Password
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              minLength={8}
              required
            />
          </label>

          {error && (
            <p className="register-error">{error}</p>
          )}

          {success && (
            <p className="register-success">{success}</p>
          )}

          <button
            type="submit"
            className="register-button"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

        </form>

        <p className="register-login">
          Already have an account?
          <Link to="/login"> Sign in</Link>
        </p>

        <Link to="/" className="register-home">
          ← Back to Home
        </Link>

      </div>
    </div>
  );
}

export default Register;
