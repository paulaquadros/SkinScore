import React, { useState } from "react";
import { TiDelete } from "react-icons/ti";
import '../css/ChipInput.css';

function ChipInput({onDataFromChips}) {
  const [text, setText] = useState("");
  const [chips, setChips] = useState([]);
  const [validationError, setValidationError] = useState("");

  function removeChip(chipToRemove) {
    // filtering out the chip that the user wants to remove
    const updatedChips = chips.filter((chip) => chip !== chipToRemove);
    setChips(updatedChips);
  }

  function handlePressEnter(e) {
    // don't submit the form if the user presses 'Enter'
    if (e.key === "Enter") e.preventDefault();
    // return if the user pressed a key that is not 'Enter', or the user hasn't typed anything
    if (e.key !== "Enter" || !text) return;
    // need to show error if the user tries to add the same input more than once
    if (chips.includes(text)) {
      return setValidationError("Cannot add the same input more than once");
    }
    // adding the input value to chips array
    setChips((prevState) => [...prevState, e.target.value]);
    // clearing the input box
    setText("");
    // clearing error message
    setValidationError("");
    // sending data to parent
  }



  return (
    <div>
      <label htmlFor="IngredientesProduto">Ingredientes</label>
        <input
          type="text"
          name="Ingredientes"
          className="form-control rounded-pill" 
          id="IngredientesProduto"
          placeholder="Adicione os ingredientes do produto, para cada ingrediente pressione Enter"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handlePressEnter}
        />
        <div className="input-container">
        <div className="chips">
          {chips.map((chip) => (
            <div key={chip} className="chip badge rounded-pill bg-primary">
              <span className="chip">{chip}{onDataFromChips(chips)}</span>
              <TiDelete onClick={() => removeChip(chip)} tabIndex="0" />
              
            </div>
          ))}
        </div>
      </div>
      {validationError && <p className="error-message">{validationError}</p>}
    </div>
  );
}

export default ChipInput;
