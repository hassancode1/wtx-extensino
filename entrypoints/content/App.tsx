import { useState } from "react";
import PersistentRecordingUI from "./PersistantRecordingUi";

const App = () => {
  const [count, setCount] = useState(1);
  const increment = () => setCount((count) => count + 1);

  return (
    <>
      <PersistentRecordingUI />
    </>
  );
};
export default App;
