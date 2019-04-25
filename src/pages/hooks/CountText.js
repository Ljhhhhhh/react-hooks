import React, { useContext } from "react";
import { myContext } from "./reducer";

function CounterTest() {
  const { state, dispatch } = useContext(myContext);
  return (
    <div>
      CounterTest Count: {state.count}
      <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
    </div>
  );
}

export default CounterTest;