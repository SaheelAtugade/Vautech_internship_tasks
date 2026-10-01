import api from '../../../services/api'

export async function createExpenseApi(expenseData) {
    const response = await api.post('/expense', expenseData)
    return response.data
}

export async function getExpenseApi() {
    const response = await api.get('/expense')
    return response.data
}

export async function deleteExpenseApi(id) {
    const response = await api.delete(`/expense/${id}`)
    return response.data
}

export async function updateExpenseApi(id, expenseData) {
    const response = await api.patch(`/expense/${id}`, expenseData)
    return response.data
}