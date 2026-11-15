
import api from "./api";

export interface DepositRequest {
  amount: number;
  description: string;
}

export interface DepositResponse {
  referenceNumber: string;
  message: string;
  depositedAmount: number;
  updatedBalance: number;
}

const depositService = {
  deposit: async (data: DepositRequest): Promise<DepositResponse> => {
    const response = await api.post<DepositResponse>(
      "/api/deposits",
      data
    );

    return response.data;
  },
};

export default depositService;
