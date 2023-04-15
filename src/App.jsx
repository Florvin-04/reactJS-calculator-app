import { useState, useReducer } from "react";

import "./App.scss";
import DigitButton from "./components/DigitButton";
import OperationButton from "./components/OperationButton";

export const ACTION = {
  CHOOSE_OPERATION: "choose-operation",
  CALCULATE: "calculate",
  ADD_ITEM: "add-item",
  REMOVE_ITEM: "remove-item",
  CLEAR_ITEM: "clear-item",
};

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTION.ADD_ITEM:
      if (state.overwrite) {
        return {
          currentValue: payload.digit,
          overwrite: false,
        };
      }

      if (payload.digit === "0" && state.currentValue === "0") return state;
      if (payload.digit === "." && state.currentValue.includes(".") && state) return state;

      return {
        ...state,
        currentValue: `${state.currentValue || ""}${payload.digit}`,
      };

    case ACTION.CHOOSE_OPERATION:
      if (state.currentValue == "" && state.previousValue == null) return state;

      if (state.currentValue == "" && state.previousValue !== null) {
        return {
          ...state,
          operationValue: payload.operation,
        };
      }

      if (state.previousValue == null) {
        return {
          ...state,
          currentValue: "",
          previousValue: state.currentValue,
          operationValue: payload.operation,
        };
      }

      return {
        ...state,
        currentValue: "",
        previousValue: calculate(state),
        operationValue: payload.operation,
      };

    case ACTION.REMOVE_ITEM:
      if (state.overwrite) {
        return {
          currentValue: "",
        };
      }
      return {
        ...state,
        currentValue: state.currentValue.slice(0, -1),
      };

    case ACTION.CALCULATE:
      // if ((state.currentValue !== "" || state.currentValue === "") && state.previousValue == null)
      //   return state;

      // if (state.currentValue === "" && state.previousValue != null) return state;

      if (state.currentValue === "" || state.previousValue == null || state.operationValue == null)
        return state;

      return {
        overwrite: true,
        currentValue: calculate(state),
      };

    case ACTION.CLEAR_ITEM:
      return { currentValue: "" };
  }
}

function calculate({ currentValue, previousValue, operationValue }) {
  const prev = parseFloat(previousValue);
  const current = parseFloat(currentValue);

  if (isNaN(prev) || isNaN(current)) return;

  let result = "";

  switch (operationValue) {
    case "+":
      result = prev + current;
      break;
    case "-":
      result = prev - current;
      break;
    case "x":
      result = prev * current;
      break;
    case "/":
      result = prev / current;
      break;
  }

  return result.toString();
}

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
});

function displayFormatter(currentValue) {
  if (currentValue == null) return;
  const [integer, decimal] = currentValue.split(".");
  if (decimal == null) return INTEGER_FORMATTER.format(integer);
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`;
}

function App() {
  const [{ currentValue, previousValue, operationValue }, dispatch] = useReducer(reducer, {
    currentValue: "",
  });

  const [theme, setTheme] = useState("");
  console.log(theme);
  return (
    <div
      className="App"
      theme={theme}
    >
      <main>
        <header className="header">
          <h1>calc</h1>
          <div className="switch__theme-conatiner">
            <p className="theme-title">theme</p>
            <div className="switch__theme--buttons">
              <label htmlFor="dark">1</label>
              <input
                type="radio"
                name="theme"
                id="dark"
                value="dark"
                checked={theme == "dark"}
                onChange={(e) => setTheme(e.target.value)}
              />
              <label htmlFor="light">2</label>
              <input
                type="radio"
                name="theme"
                id="light"
                value="light"
                checked={theme == "light"}
                onChange={(e) => setTheme(e.target.value)}
              />
              <label htmlFor="dark-violet">3</label>
              <input
                type="radio"
                name="theme"
                id="dark-violet"
                value="dark-violet"
                checked={theme == "dark-violet"}
                onChange={(e) => setTheme(e.target.value)}
              />
              <span className="circle"></span>
            </div>
          </div>
        </header>

        <div className="calc__display">
          <p className="previous__value">
            {displayFormatter(previousValue)} {operationValue}
          </p>
          <p className="current__value">{displayFormatter(currentValue)}</p>
        </div>

        <div className="calc__buttons">
          <DigitButton
            digit="7"
            dispatch={dispatch}
          />
          <DigitButton
            digit="8"
            dispatch={dispatch}
          />
          <DigitButton
            digit="9"
            dispatch={dispatch}
          />

          <button
            className="delete-btn"
            onClick={() => dispatch({ type: ACTION.REMOVE_ITEM })}
          >
            DEL
          </button>

          <DigitButton
            digit="4"
            dispatch={dispatch}
          />
          <DigitButton
            digit="5"
            dispatch={dispatch}
          />
          <DigitButton
            digit="6"
            dispatch={dispatch}
          />
          <OperationButton
            operation="+"
            dispatch={dispatch}
          />
          <DigitButton
            digit="1"
            dispatch={dispatch}
          />
          <DigitButton
            digit="2"
            dispatch={dispatch}
          />
          <DigitButton
            digit="3"
            dispatch={dispatch}
          />
          <OperationButton
            operation="-"
            dispatch={dispatch}
          />
          <DigitButton
            digit="."
            dispatch={dispatch}
          />
          <DigitButton
            digit="0"
            dispatch={dispatch}
          />
          <OperationButton
            operation="/"
            dispatch={dispatch}
          />
          <OperationButton
            operation="x"
            dispatch={dispatch}
          />
          <button
            className="reset-btn"
            onClick={() => dispatch({ type: ACTION.CLEAR_ITEM })}
          >
            RESET
          </button>

          <button
            className="calculate-btn"
            onClick={() => dispatch({ type: ACTION.CALCULATE })}
          >
            =
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;
