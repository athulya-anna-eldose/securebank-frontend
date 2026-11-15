
import { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import depositService from "../../services/depositService";
import "./Deposit.css";

function Deposit() {

  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("Demo account deposit");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const quickAmounts = [1000, 5000, 10000, 25000];

  async function handleDeposit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSuccess("");

    const depositAmount = Number(amount);

    if (!amount || !Number.isFinite(depositAmount) || depositAmount <= 0) {
      setError("Please enter a valid deposit amount.");
      return;
    }

    if (Math.round(depositAmount * 100) !== depositAmount * 100) {
      setError("Amount cannot have more than 2 decimal places.");
      return;
    }

    if (depositAmount > 9999999999999.99) {
      setError("Deposit amount exceeds the allowed limit.");
      return;
    }

    setLoading(true);

    try {
      const response = await depositService.deposit({
        amount: depositAmount,
        description: description.trim() || "Demo account deposit",
      });

      setSuccess(
        `${response.message}. New balance: ₹${Number(
          response.updatedBalance
        ).toLocaleString("en-IN", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`
      );

      setAmount("");

    } catch (err: any) {
      setError(
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Unable to add money. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <DashboardLayout>
      <div className="deposit-page">

        <div className="deposit-heading">
          <div>
            <h1>Add Money</h1>
            <p>Add funds to your SecureBank demo account.</p>
          </div>
        </div>

        <div className="deposit-container">

          <div className="deposit-info">
            <div className="deposit-icon">＋</div>
            <h2>Fund Your Account</h2>
            <p>
              Add simulated funds to your account and use them
              to test transfers and other banking features.
            </p>

            <div className="deposit-note">
              <span>✓</span>
              Instant balance update
            </div>

            <div className="deposit-note">
              <span>✓</span>
              Automatically recorded in transactions
            </div>

            <div className="deposit-note">
              <span>✓</span>
              Secure authenticated request
            </div>
          </div>

          <div className="deposit-form-section">
            <h2>Deposit Details</h2>
            <p>Enter the amount you want to add.</p>

            <form onSubmit={handleDeposit}>

              <label>Deposit Amount</label>

              <div className="deposit-amount-input">
                <span>₹</span>
                <input
                  type="number"
                  min="0.01"
                  step="0.01"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>

              <label>Quick Select</label>

              <div className="quick-amounts">
                {quickAmounts.map((value) => (
                  <button
                    key={value}
                    type="button"
                    className={
                      amount === String(value)
                        ? "quick-amount active"
                        : "quick-amount"
                    }
                    onClick={() => setAmount(String(value))}
                  >
                    ₹{value.toLocaleString("en-IN")}
                  </button>
                ))}
              </div>

              <label>Description</label>

              <input
                className="deposit-description"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength={100}
                placeholder="Enter deposit description"
              />

              {error && (
                <div className="deposit-error">{error}</div>
              )}

              {success && (
                <div className="deposit-success">
                  {success}
                </div>
              )}

              <button
                type="submit"
                className="deposit-submit"
                disabled={loading}
              >
                {loading ? "Processing..." : "Add Money"}
              </button>

            </form>

            <div className="deposit-disclaimer">
              This feature uses simulated funds for project testing.
              It does not process real bank deposits.
            </div>

          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}

export default Deposit;
