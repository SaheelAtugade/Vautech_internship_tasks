import api from "../../../services/api";

export async function registerApi(userData) {
  const response = await api.post("/auth/register", userData);
  return response.data;
}

export async function loginApi(userData) {
  const response = await api.post("/auth/login", userData);
  return response.data;
}

export async function getMeApi() {
  const response = await api.get("/auth/get-me");
  return response.data;
}

export async function logoutApi() {
  const response = await api.post("/auth/logout");
  return response.data;
}
