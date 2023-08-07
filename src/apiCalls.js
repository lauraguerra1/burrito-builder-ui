const parseError = (response) => {
  if(!response.ok) {
    throw new Error(`Error: ${response.status} - Please try again!`)
  }
  return response.json()
}

const getOrders = async () => {
  const response = await fetch("http://localhost:3001/api/v1/orders")
  const data = parseError(response)
  return data
}

const placeOrder = async(order) => {
  const response = await fetch("http://localhost:3001/api/v1/orders", {
    method: 'POST', 
    body: JSON.stringify(order),
    headers: {
      'Content-type': 'application/json'
    }
  })
  const data = parseError(response)
  return data
}

export {getOrders, placeOrder}