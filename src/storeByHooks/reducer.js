import React, { useReducer, createContext } from "react";
import * as actionTypes from './actionTypes'

const initialState = {
  page_title: '',
  userinfo: {}
}

const myContext = createContext();

/**
 * 输入旧state 根据 action 返回新 state。这就是 reducer 的作用。
 * @param {*} state   输入的 state
 * @param {*} action  根据action 返回新的 state
 */
function reducer (state = initialState, action) {
  switch (action.type) {
    case actionTypes.PAGETITLE:
      return {
        ...state,
        page_title: action.title
      }
    case actionTypes.USERINFO:
      return {
        ...state,
        userinfo: action.userinfo
      }
    default:
      return state;
  }
}

function getReducer() {
  const [state, dispatch] = useReducer(
    reducer,
    initialState
  );
  return {
    state,
    dispatch
  }
}

const ContextProvider = props => {
  const [state, dispatch] = useReducer(
    reducer,
    initialState
  );
  return (
    <myContext.Provider value={{ state, dispatch }}>
      {props.children}
    </myContext.Provider>
  );
};



export {getReducer, myContext, ContextProvider}