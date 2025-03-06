import React, { useState } from "react";

const CityForm = ({ city, setCity }) => {
  const [cityInput, setCityInput] = useState(city); //the value of the input field. NOT the current city

  const handleSubmit = (event) => {
    event.preventDefault();
    setCity(cityInput); //Only set city on submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={cityInput}
        onChange={(event) => setCityInput(event.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default CityForm;
