import { useState, useEffect, useRef } from "react";
import "./css/index.css";
import tva from "./assets/background/tva.jpg";
import Card from "./util/Card.jsx";
import Header from "./util/Header.jsx";
import Remote from "./util/Remote.jsx";
import { marvel_T } from "./util/data.js";

//shows cards when clicking on the top buttons

function App() {
  const [background, setBackground] = useState(tva);

  const [cards, setCards] = useState([]);
  const [cards2, setCards2] = useState([]);
  const [type, setType] = useState([]);
  const [status, setStatus] = useState();

  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(8);

  const [hide, setHide] = useState(Array(5).fill(false));

  const [ArrLength, setArrLength] = useState();
  const [minArrLength, setminArrLength] = useState();

  function handleLength(x) {
    const length = Math.ceil(x.length / 2);
    setArrLength(length);
    setminArrLength(length - 8);
  }

  function refresh() {
    updateHide(0, false);
    ButtonAll();
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

    const top = x.filter((_, index) => index % 2 === 0).slice(left, right);
    const bottom = x.filter((_, index) => index % 2 === 1).slice(left, right);

    handleLength(x);
    updateHide(0, true);
    setCards(top);
    setCards2(bottom);
    setStatus("show");
  }

  function ButtonMovie() {
    const x = type
      .filter((element) => element.type === "movie")
      .map((element) => ({
        image: element.image,
        time: element.time,
        date: element.date,
      }));

    const top = x.filter((_, index) => index % 2 === 0).slice(left, right);
    const bottom = x.filter((_, index) => index % 2 === 1).slice(left, right);

    handleLength(x);
    setCards(top);
    setCards2(bottom);
    setStatus("movie");
  }

  function ButtonAll() {
    const top = type
      .filter((_, index) => index % 2 === 0)
      .slice(left, right)
      .map((char) => ({
        image: char.image,
        time: char.time,
        date: char.date,
      }));

    const bottom = type
      .filter((_, index) => index % 2 === 1)
      .slice(left, right)
      .map((char) => ({
        image: char.image,
        time: char.time,
        date: char.date,
      }));

    handleLength(type);
    setCards(top);
    setCards2(bottom);
    setStatus("all");
  }

  function ButtonTvReset() {
    ButtonTv();
    setLeft(0);
    setRight(8);
  }

  function ButtonMvReset() {
    ButtonMovie();
    setLeft(0);
    setRight(8);
  }

  function ButtonAllReset() {
    ButtonAll();
    setLeft(0);
    setRight(8);
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
        setLeft((prevLeft) => Math.min(prevLeft + 1, minArrLength));
        setRight((prevRight) => Math.min(prevRight + 1, ArrLength));
      } else if (e.deltaY < 0) {
        setLeft((prevLeft) => Math.max(prevLeft - 1, 0));
        setRight((prevRight) => Math.max(prevRight - 1, 8));
      }
    }

    window.addEventListener("wheel", handleWheel);

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [minArrLength, ArrLength]);

  //updates timeline for scrolling
  useEffect(() => {
    if (status === "show") {
      ButtonTv();
    } else if (status === "movie") {
      ButtonMovie();
    } else {
      ButtonAll();
    }
  }, [type, left, right]);

  return (
    <>
      <Header
        refresh={refresh}
        buttonShow={ButtonTvReset}
        buttonMovie={ButtonMvReset}
        buttonAll={ButtonAllReset}
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
