import api from "../../../services/api";

export async function setBudgetApi(monthlyBudget) {
    const response = await api.put('/budget', { monthlyBudget })
    return response.data
}

export async function getBudgetApi() {
    const response = await api.get('/budget')
    return response.data
}
