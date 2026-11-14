
import { useState, type FormEvent } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import {
  transferMoney,
  type TransferResponse,
} from "../../services/transferService";

function Transfer() {
  const [accountNumber, setAccountNumber] = useState("");
  const [confirmAccountNumber, setConfirmAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<TransferResponse | null>(null);

  async function handleTransfer(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setResult(null);

    // Check whether both account numbers match
    if (accountNumber.trim() !== confirmAccountNumber.trim()) {
      setError("Account numbers do not match.");
      return;
    }

    const transferAmount = Number(amount);

    if (!Number.isFinite(transferAmount) || transferAmount <= 0) {
      setError("Please enter a valid transfer amount.");
      return;
    }

    try {
      setLoading(true);

      const response = await transferMoney({
        toAccountNumber: accountNumber.trim(),
        amount: transferAmount,
        description: description.trim(),
      });

      setResult(response);

      // Clear the form after a successful transfer
      setAccountNumber("");
      setConfirmAccountNumber("");
      setAmount("");
      setDescription("");
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          (typeof err.response?.data === "string"
            ? err.response.data
            : "Transfer failed. Please try again.")
      );
    } finally {
      setLoading(false);
    }
  }

  function formatCurrency(value: number) {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(value);
  }

  return (
    <DashboardLayout>
      <h1 className="page-title">Transfer Money</h1>

      <p className="page-description">
        Transfer money securely to another bank account.
      </p>

      <div className="content-card">
        <h3>Transfer Details</h3>

        <form className="bank-form" onSubmit={handleTransfer}>
          <label>
            Account Number
            <input
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              placeholder="Enter recipient account number"
              required
            />
          </label>

          <label>
            Confirm Account Number
            <input
              type="text"
              value={confirmAccountNumber}
              onChange={(e) => setConfirmAccountNumber(e.target.value)}
              placeholder="Re-enter account number"
              required
            />
          </label>

          <label>
            Transfer Amount (₹)
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              min="0.01"
              step="0.01"
              required
            />
          </label>

          <label>
            Description
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter transfer description"
            />
          </label>

          {error && (
            <p className="transfer-error" role="alert">
              {error}
            </p>
          )}

          {result && (
            <div className="transfer-success" role="status">
              <h4>Transfer Successful!</h4>

              <p>{result.message}</p>

              <p>
                Reference Number: <strong>{result.referenceNumber}</strong>
              </p>

              <p>
                Amount Transferred:{" "}
                <strong>{formatCurrency(result.transferredAmount)}</strong>
              </p>

              <p>
                Remaining Balance:{" "}
                <strong>{formatCurrency(result.remainingBalance)}</strong>
              </p>
            </div>
          )}

          <button
            type="submit"
            className="bank-button"
            disabled={loading}
          >
            {loading ? "Processing Transfer..." : "Continue Transfer"}
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}

export default Transfer;
