import React, { useState } from 'react';

// class Hooks extends Component {
//   render() {
//     return (
//       <div>
//         hooks
//       </div>
//     );
//   }
// }

function Hooks() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>you click {count} time</p>
      <button onClick={() => setCount(count + 1)}>
        click me
      </button>
    </div>
  )
}

export default Hooks;
