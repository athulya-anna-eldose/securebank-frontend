
import DashboardLayout from "../../components/layout/DashboardLayout";

function Transactions() {
  const transactions = [
    {
      id: "TXN001",
      name: "Salary Credit",
      date: "10 Nov 2026",
      type: "Credit",
      amount: "+₹45,000",
      status: "Success",
    },
    {
      id: "TXN002",
      name: "Online Shopping",
      date: "09 Nov 2026",
      type: "Debit",
      amount: "-₹2,500",
      status: "Success",
    },
    {
      id: "TXN003",
      name: "Electricity Bill",
      date: "08 Nov 2026",
      type: "Debit",
      amount: "-₹1,200",
      status: "Success",
    },
    {
      id: "TXN004",
      name: "Money Received",
      date: "07 Nov 2026",
      type: "Credit",
      amount: "+₹5,000",
      status: "Pending",
    },
  ];

  return (
    <DashboardLayout>
      <h1 className="page-title">Transactions</h1>
      <p className="page-description">
        View your recent account activities.
      </p>

      <div className="content-card">
        <h3>Recent Transactions</h3>

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
                <td>{transaction.id}</td>
                <td>{transaction.name}</td>
                <td>{transaction.date}</td>
                <td>{transaction.type}</td>
                <td>{transaction.amount}</td>
                <td
                  className={
                    transaction.status === "Success"
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
      </div>
    </DashboardLayout>
  );
}

export default Transactions;
