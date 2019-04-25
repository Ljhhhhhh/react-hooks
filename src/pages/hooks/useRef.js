import React, {useState, useRef, useEffect, Fragment} from 'react'

function Counter() {
  const [count, setCount] = useState(0)
  const prevCountRef = useRef(0)
  useEffect(() => {
    prevCountRef.current = count
  })

  const prevCount = prevCountRef.current;
  
  return <div>
    <h1>now: {count}, befor: {prevCount}</h1>
    <button onClick={() => setCount(count + 1)} >+1</button>
  </div>
}

function InputFocus() {
  const inputEl = useRef();
  const onButtonClick = () => {
    inputEl.current.focus()
  }
  return <Fragment>
    <input type="text" ref={inputEl} />
    <button onClick={onButtonClick}>focus</button>
  </Fragment>
}

export default InputFocus;