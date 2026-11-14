
import api from "./api";

export interface TransferData {
  toAccountNumber: string;
  amount: number;
  description: string;
}

export interface TransferResponse {
  referenceNumber: string;
  message: string;
  transferredAmount: number;
  remainingBalance: number;
}

export const transferMoney = async (
  data: TransferData
): Promise<TransferResponse> => {
  const response = await api.post("/api/transfers", data);
  return response.data;
};
