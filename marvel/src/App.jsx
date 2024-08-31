import { useState } from "react";
import "./css/index.css";
import galaxy from "./assets/background/galaxy.jpg";

function App() {
  const [background, setBackground] = useState(galaxy);

  return (
    <>
      <img src={background} alt="" id="background"/>
    </>
  );
}

export default App;
