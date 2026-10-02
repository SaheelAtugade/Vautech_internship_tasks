import api from "../../../services/api";

export async function setBudgetApi(budgetData) {
  const response = await api.put("/budget", budgetData);
  return response.data;
}

export async function getBudgetApi() {
  const response = await api.get("/budget");
  return response.data;
}

export async function getBudgetHistoryApi() {
  const response = await api.get("/budget/history");
  return response.data;
}