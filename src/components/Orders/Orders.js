import React from "react";
import "./Orders.css";

const Orders = ({orders}) => {
  const orderEls = orders.map((order, i) => {
    return (
      <div key={`${order.name}${i}`} className="order">
        <h3>{order.name}</h3>
        <ul className="ingredient-list">
          {order.ingredients.map((ingredient) => {
            return <li key={`${ingredient}${i}`}>{ingredient}</li>;
          })}
        </ul>
      </div>
    );
  });

  return (
    <section>{orderEls.length ? orderEls : <p>No orders yet!</p>}</section>
  );
};

export default Orders;
