import { api } from "./api";

type LoginResponse = {
  accessToken: string;
  user: {
    id: string;
    email: string;
    role: string;
    firstName: string;
    lastName: string;
  };
};

export async function loginRequest(
  email: string,
  password: string
): Promise<LoginResponse> {
  const response = await api.post("/auth/login", { email, password });
  return response.data;
}
