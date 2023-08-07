const parseError = (response) => {
  if(!response.ok) {
    throw new Error(`Error: ${response.status} - Please try again!`)
  }
  return response.json()
}
export const getOrders = async () => {
  const response = await fetch("http://localhost:3001/api/v1/orders")
  const data = parseError(response)
  return data
}