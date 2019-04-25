import React, {useMemo, useState, Fragment} from 'react'

let ch;


// 比如是一个复杂的组件。
const Child1 = ({ a }) => {
  console.log("Child1 重新渲染！！！");
  return <h2>{a}</h2>
};


function Parent({ a, b }) {


  // Only re-rendered if `a` changes:
  const child1 = useMemo(() => <div>
    {console.log("这是一个复杂计算！！！")}
    <Child1 a={b} />
  </div>, [a]);
  
  console.log("是否相等：", child1 === ch)
  ch = child1;

  // 没有用 useMemo 因此每次都重新计算
  const child2 = <div>
    {console.log("child2重新计算！")}
    <Child1 a={b} />
  </div>
  // Only re-rendered if `b` changes:

  return (
    <Fragment>
      {child1}
      {child2}
    </Fragment>
  )
}



const App = props => {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  return (
    <div>
      <Parent a={a} b={b} />
      <button onClick={() => setA(a + 1)}>改变a</button>
      <button onClick={() => setB(b + 1)}>改变b</button>
    </div>
  )
}

export default App