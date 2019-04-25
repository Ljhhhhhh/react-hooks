import React, { useReducer } from "react";


/**
 * useRecucer 的理解
 * 
 * 每个 reducer 都要返回一个有效的状态值。或者抛出错误。
 * 输入旧 state 根据 action 返回新 state。这就是 reducer 的作用。
 * 参考官网：http://react.html.cn/docs/hooks-reference.html#usereducer
 */

const initialState = {count:0};
const myContext = React.createContext();

/**
 * 输入旧state 根据 action 返回新 state。这就是 reducer 的作用。
 * @param {*} state   输入的 state
 * @param {*} action  根据action 返回新的 state
 */
function reducer(state, action) {
  switch (action.type) {
    case "reset":
      return initialState;
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      return state;
  }
}

/**
 * ContextProvider 
 * 1) 对 myContext 进行了封装。实质上还是提供 context 的功能。
 * 2) 把 state 和 dispatch 提供给所有的 props.children
 * 理解为：给 children 注入了 类似redux reducer 的机制。其实就是
 * 通过 dispatch 一个 action 返回一个新的 state
 * 
 * useReducer
 */
const ContextProvider = props => {
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  return (
    <myContext.Provider value={{ state, dispatch }}>
      {props.children}
    </myContext.Provider>
  );
};

export { reducer, myContext, ContextProvider };