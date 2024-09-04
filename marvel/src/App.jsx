import { useState, useEffect, useRef } from "react";
import "./css/index.css";
import tva from "./assets/background/tva.jpg";
import Card from "./util/Card.jsx";
import Header from "./util/Header.jsx";
import Remote from "./util/Remote.jsx";
import { marvel_CR, marvel_RD } from "./util/data.js";

function App() {
  const [background, setBackground] = useState(tva);

  const [cards, setCards] = useState([]);
  const [cards2, setCards2] = useState([]);
  const [type, setType] = useState([]);

  const [hide, setHide] = useState(Array(5).fill(false));




  function updateHide(index, value) {
    setHide((prevHide) => {
      const newHide = [...prevHide];
      newHide[index] = value;
      return newHide;
    });
  }

  function ButtonTv() {
    const x = type
      .filter((element) => element.type === "show")
      .map((element) => element.image);
    setCards(x);

    const top = x.filter((_, index) => index % 2 === 0);
    const bottom = x.filter((_, index) => index % 2 === 1);
    setCards(top);
    setCards2(bottom);
  }

  function ButtonMovie() {
    const x = type
      .filter((element) => element.type === "movie")
      .map((element) => element.image);

    const top = x.filter((_, index) => index % 2 === 0);
    const bottom = x.filter((_, index) => index % 2 === 1);
    setCards(top);
    setCards2(bottom);
  }

  function ButtonAll() {
    const x = type
      .filter((_, index) => index % 2 === 0)
      .map((char) => char.image);

    const y = type
      .filter((_, index) => index % 2 === 1)
      .map((char) => char.image);

    setCards(x);
    setCards2(y);
  }

  function ButtonCR() {
    setType(marvel_CR);
    updateHide(0, true);
    console.log("CR");   
  }
 
  function ButtonRD() {
    setType(marvel_RD);
    updateHide(0, true);
    console.log("RD");
  }

  useEffect(() => {
    ButtonAll();
  }, [type]);

  return (
    <>
      <Header
        buttonShow={ButtonTv}
        buttonMovie={ButtonMovie}
        buttonAll={ButtonAll}
      />
      <main>

        <Remote ButtonC={ButtonCR} ButtonR={ButtonRD}/>

        {hide[0] && (
          <div id="timeline">
            <Card cards={cards} id="top_list" />
            <Card cards={cards2} id="bottom_list" />
          </div>
        )}

        <img src={background} alt="" id="background" />
      </main>
    </>
  );
}

export default App;
