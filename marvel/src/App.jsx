import { useState, useEffect, useRef } from "react";
import "./css/index.css";
import tva from "./assets/background/tva.jpg";
import Card from "./util/Card.jsx";
import Header from "./util/Header.jsx";
import Remote from "./util/Remote.jsx";
import { marvel_T } from "./util/data.js";

//fix scroll where it doesnt scroll back if theres nothing to scroll and doesnt scroll to far forward
//scrolling for movie and show category

function App() {
  const [background, setBackground] = useState(tva);

  const [cards, setCards] = useState([]);
  const [cards2, setCards2] = useState([]);
  const [type, setType] = useState([]);

  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(8);

  const [hide, setHide] = useState(Array(5).fill(false));

  function refresh() {
    updateHide(0, false);
    set();
  }

  function set() {
    setType([]);
    setCards([]);
    setCards2([]);
    setLeft(0);
    setRight(8);
  }

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
    setTimeout(() => {
      set();
      setTimeout(() => {
        setType(marvel_T.sort((a, b) => a.timeline - b.timeline));
      }, 0);
    }, 0);
   
    updateHide(1, false);
    updateHide(2, true);
    updateHide(0, true);
    console.log("current setting: CR");
  }

  function ButtonRD() {
    setTimeout(() => {
      set();
      setTimeout(() => {
        setType(marvel_T.sort((a, b) => a.releaseDate - b.releaseDate));
      }, 0);
    }, 0);

   
    updateHide(1, true);
    updateHide(2, false);
    updateHide(0, true);
    console.log("current setting: RD");
  }

  //scroll wheel through timeline
  useEffect(() => {
    function handleWheel(e) {
      if (e.deltaY > 0) {
        setLeft((prevLeft) => prevLeft + 1);
        setRight((prevRight) => prevRight + 1);
      } else if (e.deltaY < 0) {
        setLeft((prevLeft) => Math.max(prevLeft - 1, 0));
        setRight((prevRight) => Math.max(prevRight - 1, 8));
      }
    }

    window.addEventListener("wheel", handleWheel);

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  //updates timeline cards
  useEffect(() => {
    ButtonAll();
  }, [type, left, right]);

  return (
    <>
      <Header
        refresh={refresh}
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
