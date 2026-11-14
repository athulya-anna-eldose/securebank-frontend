
import api from "./api";

export interface Transaction {
  id: number;
  referenceNumber: string;
  type: string;
  amount: number;
  description: string;
  status: string;
  transactionDate: string;
}

export interface DashboardData {
  fullName: string;
  accountNumber: string;
  balance: number;
  totalTransactions: number;
  recentTransactions: Transaction[];
}

export const getDashboard = async (): Promise<DashboardData> => {
  const response = await api.get("/api/dashboard");
  return response.data;
};
