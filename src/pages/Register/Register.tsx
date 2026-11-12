
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    alert("Demo only: Registration will be connected to the backend.");
    navigate("/login");
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
              placeholder="Enter your full name"
              required
            />
          </label>

          <label>
            Email Address
            <input
              type="email"
              placeholder="Enter your email"
              required
            />
          </label>

          <label>
            Phone Number
            <input
              type="tel"
              placeholder="Enter your phone number"
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              placeholder="Create a password"
              minLength={8}
              required
            />
          </label>

          <label>
            Confirm Password
            <input
              type="password"
              placeholder="Confirm your password"
              minLength={8}
              required
            />
          </label>

          <button type="submit" className="register-button">
            Create Account
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
