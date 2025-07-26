import { useState } from "react";

const App = () => {
  const [count, setCount] = useState(1);
  const increment = () => setCount((count) => count + 1);

  return (
    <div>
      <p>This is React. {count}</p>
      <button>Increment</button>
    </div>
  );
};
export default App;
