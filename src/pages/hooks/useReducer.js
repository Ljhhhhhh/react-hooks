import React, {useReducer, Fragment} from 'react'

const initialCountState = {count: 0}

function reducer(state, action) {
  switch (action.type) {
    case 'reset':
      return {count: action.payload};
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      return state;
  }
}

function init(initialCountState) {
  return {count: initialCountState + 1}
}

function Counter({initialCount}) {
  const [state, dispatch] = useReducer(
    reducer,
    initialCount,
    init
  )

  return (
    <Fragment>
      count: {state.count}
      <button onClick={() => dispatch({type: 'reset', payload: initialCount})}>reset</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
    </Fragment>
  )
}

export default props => <div>
  <Counter initialCount={initialCountState.count} />
</div>