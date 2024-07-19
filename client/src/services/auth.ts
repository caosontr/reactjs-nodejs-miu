import axiosInstance from "../config/axiosInstance";
import { AuthResponse, LoginForm, RegisterForm } from "../types/User";
import sleep from "../ultis/sleep";

const registerUser = async (formValue: RegisterForm): Promise<AuthResponse> => {
  await sleep();
  const res = await axiosInstance.post<AuthResponse>(
    "/auth/register",
    formValue
  );
  return res.data;
};

const login = async (formValue: LoginForm): Promise<AuthResponse> => {
  await sleep();
  try {
    const res = await axiosInstance.post<AuthResponse>(
      "/auth/login",
      formValue
    );
    console.log("Login response:", res.data);
    return res.data;
  } catch (error) {
    console.error("Login error:", error);
    throw new Error("Login failed");
  }
};

export { registerUser as register, login };
