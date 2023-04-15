import React from "react";
import { ACTION } from "../App";

function OperationButton(props) {
  const operation = props.operation;
  return (
    <button
      className="operation-btn"
      onClick={() => props.dispatch({ type: ACTION.CHOOSE_OPERATION, payload: { operation } })}
    >
      {operation}
    </button>
  );
}

export default OperationButton;
