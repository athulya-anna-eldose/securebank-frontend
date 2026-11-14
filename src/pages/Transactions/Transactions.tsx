
import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import {
  getTransactions,
  type Transaction,
} from "../../services/transactionService";

function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const data = await getTransactions();
        setTransactions(data);
      } catch (err: any) {
        setError(
          err.response?.data?.message ||
            "Unable to load transactions. Please try again."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchTransactions();
  }, []);

  // Format amount as Indian currency
  function formatAmount(amount: number, type: string) {
    const formattedAmount = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(Math.abs(amount));

    return type.toUpperCase() === "DEBIT"
      ? `-${formattedAmount}`
      : `+${formattedAmount}`;
  }

  // Format transaction date
  function formatDate(date: string) {
    if (!date) return "-";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) return date;

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  return (
    <DashboardLayout>
      <h1 className="page-title">Transactions</h1>

      <p className="page-description">
        View your recent account activities.
      </p>

      <div className="content-card">
        <h3>Recent Transactions</h3>

        {loading ? (
          <p>Loading transactions...</p>
        ) : error ? (
          <p className="transaction-error">{error}</p>
        ) : transactions.length === 0 ? (
          <p className="transaction-empty">
            No transactions found.
          </p>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Description</th>
                <th>Date</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.referenceNumber}</td>

                  <td>{transaction.description}</td>

                  <td>{formatDate(transaction.transactionDate)}</td>

                  <td>
                    {transaction.type.toUpperCase() === "CREDIT"
                      ? "Credit"
                      : "Debit"}
                  </td>

                  <td>{formatAmount(transaction.amount, transaction.type)}</td>

                  <td
                    className={
                      transaction.status.toUpperCase() === "SUCCESS"
                        ? "status-success"
                        : "status-pending"
                    }
                  >
                    {transaction.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </DashboardLayout>
  );
}

export default Transactions;
