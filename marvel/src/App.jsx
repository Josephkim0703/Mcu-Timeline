import { useState, useEffect, useRef } from "react";
import "./css/index.css";
import tva from "./assets/background/tva.jpg";
import Card from "./util/Card.jsx";
import Header from "./util/Header.jsx";
import Remote from "./util/Remote.jsx";
import { marvel_T} from "./util/data.js";

function App() {
  const [background, setBackground] = useState(tva);

  const [cards, setCards] = useState([]);
  const [cards2, setCards2] = useState([]);
  const [type, setType] = useState([]);
  const [time, setTime] = useState("date");
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
      .map((element) => ({
        image: element.image,
        time: element.time,
        date: element.date,
      }));
    setCards(x);

    const top = x.filter((_, index) => index % 2 === 0);
    const bottom = x.filter((_, index) => index % 2 === 1);

    setCards(top);
    setCards2(bottom);
  }

  function ButtonMovie() {
    const x = type
      .filter((element) => element.type === "movie")
      .map((element) => ({
        image: element.image,
        time: element.time,
        date: element.date,
      }));

    const top = x.filter((_, index) => index % 2 === 0);
    const bottom = x.filter((_, index) => index % 2 === 1);
    setCards(top);
    setCards2(bottom);
  }

  function ButtonAll() {
    const x = type
      .filter((_, index) => index % 2 === 0)
      .slice(left, right)
      .map((char) => ({
        image: char.image,
        time: char.time,
        date: char.date,
      }));

    const y = type
      .filter((_, index) => index % 2 === 1)
      .slice(left, right)
      .map((char) => ({
        image: char.image,
        time: char.time,
        date: char.date,
      }));

    setCards(x);
    setCards2(y);
  }

  function ButtonCR() {
    setType(marvel_T);
    updateHide(1, false);
    updateHide(2, true);
    updateHide(0, true);
    console.log("current setting: CR");
  }

  function ButtonRD() {
    setType(marvel_T.sort((a, b) => a.releaseDate - b.releaseDate));
    updateHide(1, true);
    updateHide(2, false);
    updateHide(0, true);
    console.log("current setting: RD");
  }

  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(8);

  useEffect(() => {
    function handleWheel(e) {
      if (e.deltaY > 0) {
        setLeft((prevLeft) => prevLeft + 1);
        setRight((prevRight) => prevRight + 1);
      } else if (e.deltaY < 0) {
        setLeft((prevLeft) => prevLeft - 1);
        setRight((prevRight) => prevRight - 1);
      }
    }

    window.addEventListener("wheel", handleWheel);

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  useEffect(() => {
    ButtonAll();
  }, [type, left, right]);

  return (
    <>
      <Header
        buttonShow={ButtonTv}
        buttonMovie={ButtonMovie}
        buttonAll={ButtonAll}
      />
      <main>
        <Remote ButtonC={ButtonCR} ButtonR={ButtonRD} />

        {hide[0] && (
          <div id="timeline">
            <Card
              hide1={hide[1]}
              hide2={hide[2]}
              cards={cards.map((card) => card.image)}
              date={cards.map((card) => card.date)}
              time={cards.map((card) => card.time)}
              id="top_list"
            />
            <Card
               hide1={hide[1]}
               hide2={hide[2]}
              cards={cards2.map((card) => card.image)}
              date={cards2.map((card) => card.date)}
              time={cards2.map((card) => card.time)}
              id="bottom_list"
            />
          </div>
        )}

        <img src={background} alt="" id="background" />
      </main>
    </>
  );
}

export default App;
