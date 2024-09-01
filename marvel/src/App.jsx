import { useState, useEffect } from "react";
import "./css/index.css";
import tva from "./assets/background/tva.jpg";
import Card from "./util/Card.jsx";
import Header from "./util/Header.jsx";
import { marvel } from "./util/data.js";

function App() {
  const [background, setBackground] = useState(tva);

  const [cards, setCards] = useState([]);
  const [cards2, setCards2] = useState([]);

  function tvButton() {
    const x = marvel
      .filter((element) => element.type === "show")
      .map((element) => element.image);
    setCards(x);

    const top = x.filter((_, index) => index % 2 === 0);
    const bottom = x.filter((_, index) => index % 2 === 1);
    setCards(top);
    setCards2(bottom);
  }

  function movieButton() {
    const x = marvel
      .filter((element) => element.type === "movie")
      .map((element) => element.image);

    const top = x.filter((_, index) => index % 2 === 0);
    const bottom = x.filter((_, index) => index % 2 === 1);
    setCards(top);
    setCards2(bottom);
  }

  function allButton() {
    const x = marvel
      .filter((_, index) => index % 2 === 0)
      .map((char) => char.image);

    const y = marvel
      .filter((_, index) => index % 2 === 1)
      .map((char) => char.image);

    setCards(x);
    setCards2(y);
  }

  useEffect(() => {
    allButton();
  }, []);

  return (
    <>
      <Header
        buttonShow={tvButton}
        buttonMovie={movieButton}
        buttonAll={allButton}
      />
      <div id="timeline">
        <Card cards={cards} id="top_list"/>
        <Card cards={cards2} id="bottom_list"/>
      </div>
      <img src={background} alt="" id="background" />
    </>
  );
}

export default App;
