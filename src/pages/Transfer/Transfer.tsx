
import DashboardLayout from "../../components/layout/DashboardLayout";

function Transfer() {
  function handleTransfer(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    alert("Demo only: Transfer functionality will be connected to the backend.");
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
            Beneficiary Name
            <input
              type="text"
              placeholder="Enter recipient name"
              required
            />
          </label>

          <label>
            Account Number
            <input
              type="text"
              placeholder="Enter account number"
              required
            />
          </label>

          <label>
            Confirm Account Number
            <input
              type="text"
              placeholder="Re-enter account number"
              required
            />
          </label>

          <label>
            IFSC Code
            <input
              type="text"
              placeholder="Enter IFSC code"
              required
            />
          </label>

          <label>
            Transfer Amount (₹)
            <input
              type="number"
              placeholder="Enter amount"
              min="1"
              required
            />
          </label>

          <label>
            Description
            <input
              type="text"
              placeholder="Enter transfer description"
            />
          </label>

          <button type="submit" className="bank-button">
            Continue Transfer
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}

export default Transfer;
