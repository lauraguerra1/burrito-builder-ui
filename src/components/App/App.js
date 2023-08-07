import { useEffect, useState } from "react";
import "./App.css";
import { getOrders } from "../../apiCalls";
import Orders from "../../components/Orders/Orders";
import OrderForm from "../../components/OrderForm/OrderForm";

function App() {
  const [orders, setOrders] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const apiCall = async() => {
      try {
        const ordersData = await getOrders()
        setOrders(ordersData.orders)
      } catch (error) {
        setError(error)
      }
    }
    apiCall()
  }, []);

  return (
    <main className="App">
      <header>
        <h1>Burrito Builder</h1>
        <OrderForm />
      </header>

      <Orders orders={orders} />
    </main>
  );
}

export default App;
