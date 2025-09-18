const API_BASE_URL = 'http://localhost:5000/api/expenses'

export const getExpenses = async () => {
  const response = await fetch(API_BASE_URL)
  return response.json()
}

export const addExpense = async (expense) => {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(expense),
  })
  return response.json()
}

export const updateExpense = async (id, expense) => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(expense),
  })
  return response.json()
}

export const deleteExpense = async (id) => {
  await fetch(`${API_BASE_URL}/${id}`, { method: 'DELETE' })
}
