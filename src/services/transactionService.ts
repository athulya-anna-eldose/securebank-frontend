
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

export const getTransactions = async (): Promise<Transaction[]> => {
  const response = await api.get("/api/transactions");
  return response.data;
};
