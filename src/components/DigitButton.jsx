import React from "react";
import { ACTION } from "../App";

function DigitButton(props) {
  const digit = props.digit;
  return (
    <button
      className="digit-btn"
      onClick={() => props.dispatch({ type: ACTION.ADD_ITEM, payload: { digit } })}
    >
      {digit}
    </button>
  );
}

export default DigitButton;
