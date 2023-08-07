import { useState } from "react";

function OrderForm({updateNewOrder}) {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [submissionError, setSubmissionError] = useState('')
  
  const submitOrder = (e) => {
    if(!name || !ingredients.length) {
      setSubmissionError('Please select at least one ingredient and add an order name!')
    } else {
      setSubmissionError('')
      handleSubmit(e)
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    clearInputs();
  }

  function clearInputs() {
    setName("");
    setIngredients([]);
  };

  const possibleIngredients = [
    "beans",
    "steak",
    "carnitas",
    "sofritas",
    "lettuce",
    "queso fresco",
    "pico de gallo",
    "hot sauce",
    "guacamole",
    "jalapenos",
    "cilantro",
    "sour cream",
  ];
  const ingredientButtons = possibleIngredients.map((ingredient) => {
    return (
      <button
        type='button'
        key={ingredient}
        name={ingredient}
        onClick={() => setIngredients(prevIngredients => [...prevIngredients, ingredient])}
      >
        {ingredient}
      </button>
    );
  });

  return (
    <form>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {ingredientButtons}

      <p>Order: {ingredients.join(", ") || "Nothing selected"}</p>

      <button onClick={(e) => handleSubmit(e)}>Submit Order</button>
    </form>
  );
}

export default OrderForm;
