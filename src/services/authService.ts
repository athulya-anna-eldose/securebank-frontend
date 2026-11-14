
import api from "./api";

export interface RegisterData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  address: string;
}

export interface LoginData {
  email: string;
  password: string;
}

// Register API
export const registerUser = async (data: RegisterData) => {
  const response = await api.post("/api/auth/register", data);
  return response.data;
};

// Login API
export const loginUser = async (data: LoginData) => {
  const response = await api.post("/api/auth/login", data);

  // Store JWT token after successful login
  localStorage.setItem("token", response.data.token);

  return response.data;
};
