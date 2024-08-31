import { useState } from "react";
import "./css/index.css";
import galaxy from "./assets/background/galaxy.jpg";

import Timeline from "./util/Timeline.jsx"
import Header from "./util/Header.jsx"

function App() {
  const [background, setBackground] = useState(galaxy);

  return (
    <>
      <Header/>
      <Timeline/>
      <img src={background} alt="" id="background"/>
    </>
  );
}

export default App;
