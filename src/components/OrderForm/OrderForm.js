import { useState } from "react";

function OrderForm({updateNewOrder}) {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [submissionError, setSubmissionError] = useState({error: false, message: ''})
  
  const submitOrder = (e) => {
    e.preventDefault();
    if(!ingredients.length) {
      setSubmissionError({error: true, message:'Please select at least one ingredient!'})
    } else {
      setSubmissionError({error: false, message: ''})
      handleSubmit(e)
    }
  }

  function handleSubmit() {
    updateNewOrder({name, ingredients})
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
    <form onSubmit={(e) => submitOrder(e)}>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      {ingredientButtons}

      <p>Order: {ingredients.join(", ") || "Nothing selected"}</p>

      <button>Submit Order</button>
      {submissionError.error && <p className='submission-error'>{submissionError.message}</p>}
    </form>
  );
}

export default OrderForm;
