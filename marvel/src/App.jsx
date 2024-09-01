import { useState, useEffect } from "react";
import "./css/index.css";
import galaxy from "./assets/background/galaxy.jpg";
import Card from "./util/Card.jsx";
import Header from "./util/Header.jsx";
import { marvel } from "./util/data.js";

function App() {
  const [background, setBackground] = useState(galaxy);

  const [cards, setCards] = useState([]);

  function tvButton() {
    const x = marvel
      .filter((element) => element.type === "show")
      .map((element) => element.image);
    setCards(x);
  }

  function movieButton() {
    const x = marvel
      .filter((element) => element.type === "movie")
      .map((element) => element.image);
    setCards(x);
  }

  function allButton() {
    const x = marvel.map((char) => char.image);
    setCards(x);
  }

  useEffect(() => {
    allButton();
  }, []);

  return (
    <>
      <Header buttonShow={tvButton} buttonMovie={movieButton} buttonAll={allButton}/>
      <div id="timeline">
        <Card cards={cards} />
      </div>
      <img src={background} alt="" id="background" />
    </>
  );
}

export default App;
