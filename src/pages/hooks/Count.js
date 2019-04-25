    
import React, { useContext } from "react";
import { myContext } from "./reducer";

function Counter() {
  const { state, dispatch } = useContext(myContext);
  return (
    <div>
      Counter Count: {state.count}
      <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
    </div>
  );
}

export default Counter;


/**
 * Counter 函数组件。
 * 利用 useContext 获得了 state 和 dispatch函数
 * 然后三个按钮执行三个 dipatch 因此 state.count 的三种变化。
 * 
 * 这里可以明显看到 “状态相关” 逻辑的复用和本组件无关。本组件只是引入 hooks
 * 然后渲染即可。
 * 
 * 
 * useContext() 参数是一个通过 const myContext = React.createContext(); 创建的。
 * 理解：useContext 则必须 myContext 已经建立，且Provider 已经赋值。见reducer.js
 */