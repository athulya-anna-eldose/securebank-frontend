import api from "./api";

export interface ProfileData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
}

export interface ProfileUpdateData {
  fullName: string;
  phone: string;
  address: string;
}

export const getProfile = async (): Promise<ProfileData> => {
  const response = await api.get("/api/profile");
  return response.data;
};

export const updateProfile = async (
  data: ProfileUpdateData
): Promise<ProfileData> => {
  const response = await api.put("/api/profile", data);
  return response.data;
};