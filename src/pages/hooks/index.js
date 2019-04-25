import React, {useRef, forwardRef, useImperativeHandle} from 'react'

function FancyInput(props, ref) {
  const inputRef = useRef()
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus()
    }
  }))
  return <input type="text" ref={inputRef} />
}
// eslint-disable-next-line
FancyInput = forwardRef(FancyInput)

const App = props => {
  const fancyInputRef = useRef()
  return <div>
    <FancyInput ref={fancyInputRef} />
    <hr/>
    <button onClick={() => fancyInputRef.current.focus()}>父组件调用的focus</button>
  </div>
}

export default App