import { api } from "./api";

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
};

type CreateUserPayload = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: string;
};

export async function getAdminUsers(): Promise<User[]> {
  const { data } = await api.get("/users");
  return data;
}

export async function createUser(payload: CreateUserPayload): Promise<User> {
  const { data } = await api.post("/auth/register", payload);
  return data;
}
