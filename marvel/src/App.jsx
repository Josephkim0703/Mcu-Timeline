import { useState, useEffect, useRef } from "react";
import "./css/index.css";
import Card from "./util/Card.jsx";
import Header from "./util/Header.jsx";
import Remote from "./util/Remote.jsx";
import MissMinute from "./util/MissMinute.jsx";
import { marvel_T } from "./util/data.js";

//remote design
//remote movement
//functionality when clicking on the buttons
//add a transition from tv to timeline
//fix background 

function App() {
  const originalMarvelT = useRef([...marvel_T]);

  const tva = `public/assets/background/tva.jpg`;
  const timeline = `public/assets/background/timeline.png`;

  const [background, setBackground] = useState(tva);
  const [cards, setCards] = useState([]);
  const [cards2, setCards2] = useState([]);
  const [type, setType] = useState([]);
  const [status, setStatus] = useState();

  const [AdaptiveNum, setAdaptiveNum] = useState(8);

  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(AdaptiveNum);

  const [hide, setHide] = useState(Array(5).fill(false));

  const [ArrLength, setArrLength] = useState();
  const [minArrLength, setminArrLength] = useState();

  //equation for handling the length of the split array
  function handleLength(x) {
    const length = Math.ceil(x.length / 2);
    setArrLength(length);
    setminArrLength(length - AdaptiveNum);
  }

  //when remote is clicked saves input in session storage for header button access
  function handleSettingType() {
    const typeStorage = sessionStorage.getItem("Set_Type:");

    if (typeStorage === "CR") {
      updateHide(1, false);
      updateHide(2, true);
      setType([...originalMarvelT.current]);
    } else if (typeStorage === "RD") {
      updateHide(1, true);
      updateHide(2, false);
      setType(marvel_T.sort((a, b) => a.releaseDate - b.releaseDate));
    }
  }

  //reset page function
  function refresh() {
    updateHide(0, false);
    ButtonAll();
    set();
    setBackground(tva);
  }

  //clean up function
  function set() {
    setType([]);
    setCards([]);
    setCards2([]);
    setLeft(0);
    setRight(AdaptiveNum);
  }

  //updates hide function on dom elements
  function updateHide(index, value) {
    setHide((prevHide) => {
      const newHide = [...prevHide];
      newHide[index] = value;
      return newHide;
    });
  }

  //sorts the cards into the categories TV, movie, all.
  function ButtonTv() {
    const x = type
      .filter((element) => element.type === "show")
      .map((element) => ({
        image: element.image,
        time: element.time,
        date: element.date,
        name: element.name,
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
        name: element.name,
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
        name: char.name,
      }));

    const bottom = type
      .filter((_, index) => index % 2 === 1)
      .slice(left, right)
      .map((char) => ({
        image: char.image,
        time: char.time,
        date: char.date,
        name: char.name,
      }));

    handleLength(type);
    setCards(top);
    setCards2(bottom);
    setStatus("all");
  }

  //The reset buttons help reset the positions of the cards without being affected by the usestate
  function ButtonTvReset() {
    ButtonTv();
    setLeft(0);
    setRight(AdaptiveNum);

    updateHide(1, false);
    updateHide(2, true);
    updateHide(0, true);

    handleSettingType();
  }

  function ButtonMvReset() {
    ButtonMovie();
    setLeft(0);
    setRight(AdaptiveNum);

    updateHide(1, false);
    updateHide(2, true);
    updateHide(0, true);

    handleSettingType();
  }

  function ButtonAllReset() {
    ButtonAll();
    setLeft(0);
    setRight(AdaptiveNum);

    updateHide(1, false);
    updateHide(2, true);
    updateHide(0, true);

    handleSettingType();
  }

  //sorts cards in chronological order
  function ButtonCR() {
    setTimeout(() => {
      set();
      setTimeout(() => {
        setType([...originalMarvelT.current]);
      }, 0);
    }, 0);

    setBackground(timeline);
    updateHide(1, false);
    updateHide(2, true);
    updateHide(0, true);
    console.log("current setting: CR");

    sessionStorage.removeItem("Set_Type:");
    sessionStorage.setItem("Set_Type:", "CR");
    sessionStorage.setItem("Starter_Page", true);
    updateHide(4, false);
  }

  //sorts cards in release date order
  function ButtonRD() {
    setTimeout(() => {
      set();
      setTimeout(() => {
        setType(marvel_T.sort((a, b) => a.releaseDate - b.releaseDate));
      }, 0);
    }, 0);

    setBackground(timeline);
    updateHide(1, true);
    updateHide(2, false);
    updateHide(0, true);
    console.log("current setting: RD");

    sessionStorage.removeItem("Set_Type:");
    sessionStorage.setItem("Set_Type:", "RD");
    sessionStorage.setItem("Starter_Page", true);
    updateHide(4, false);
  }

  //scroll wheel through timeline
  useEffect(() => {
    function handleWheel(e) {
      if (e.deltaY > 0) {
        setLeft((prevLeft) => Math.min(prevLeft + 1, minArrLength));
        setRight((prevRight) => Math.min(prevRight + 1, ArrLength));
      } else if (e.deltaY < 0) {
        setLeft((prevLeft) => Math.max(prevLeft - 1, 0));
        setRight((prevRight) => Math.max(prevRight - 1, AdaptiveNum));
      }
    }

    window.addEventListener("wheel", handleWheel);

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [minArrLength, ArrLength]);

  // handles arrow keys clicks for keyboard instead of mouse scroll
  useEffect(() => {
    function handleClick(e) {
      if (e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 68) {
        setLeft((prevLeft) => Math.min(prevLeft + 1, minArrLength));
        setRight((prevRight) => Math.min(prevRight + 1, ArrLength));
      } else if (e.keyCode === 40 || e.keyCode === 37 || e.keyCode === 65) {
        setLeft((prevLeft) => Math.max(prevLeft - 1, 0));
        setRight((prevRight) => Math.max(prevRight - 1, AdaptiveNum));
      }
    }

    window.addEventListener("keydown", handleClick);

    return () => {
      window.removeEventListener("keydown", handleClick);
    };
  }, [minArrLength, ArrLength]);

  //updates timeline cards
  useEffect(() => {
    if (status === "show") {
      ButtonTv();
    } else if (status === "movie") {
      ButtonMovie();
    } else {
      ButtonAll();
    }
  }, [type, left, right]);

  //screen width adaptiveness shrink number of cards
  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;

      if (newWidth <= 760) {
        setAdaptiveNum(2);
      } else if (newWidth <= 1000) {
        setAdaptiveNum(3);
      } else if (newWidth <= 1220) {
        setAdaptiveNum(4);
      } else if (newWidth <= 1450) {
        setAdaptiveNum(5);
      } else if (newWidth <= 1650) {
        setAdaptiveNum(6);
      } else if (newWidth <= 1900) {
        setAdaptiveNum(7);
      } else if (newWidth <= 2120) {
        setAdaptiveNum(8);
      } else if (newWidth <= 2350) {
        setAdaptiveNum(9);
      } else if (newWidth <= 2600) {
        setAdaptiveNum(10);
      } else if (newWidth <= 2800) {
        setAdaptiveNum(11);
      } else if (newWidth <= 3000) {
        setAdaptiveNum(12);
      } else if (newWidth <= 3200) {
        setAdaptiveNum(13);
      } else if (newWidth <= 3420) {
        setAdaptiveNum(14);
      } else if (newWidth <= 3650) {
        setAdaptiveNum(15);
      } else if (newWidth <= 3900) {
        setAdaptiveNum(16);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [AdaptiveNum]);

  //For the DOM to update and AdaptiveNum to Change I need to first reset left and right
  useEffect(() => {
    setLeft(0);
    setRight(AdaptiveNum);
  }, [AdaptiveNum]);

  //save on session storage for miss minute
  useEffect(() => {
    updateHide(4, true);

    const complete = sessionStorage.getItem("Starter_Page");

    if (complete === "true") {
      updateHide(4, false);
    }
  }, []);

  return (
    <>
      <Header
        refresh={refresh}
        buttonShow={ButtonTvReset}
        buttonMovie={ButtonMvReset}
        buttonAll={ButtonAllReset}
      />
      <main>
        {hide[4] && <MissMinute />}

        <Remote ButtonC={ButtonCR} ButtonR={ButtonRD} />

        {hide[0] && (
          <div id="timeline">
            <Card
              hide1={hide[1]}
              hide2={hide[2]}
              cards={cards.map((card) => card.image)}
              date={cards.map((card) => card.date)}
              time={cards.map((card) => card.time)}
              name={cards.map((card) => card.name)}
              id="top_list"
            />

            <Card
              hide1={hide[1]}
              hide2={hide[2]}
              cards={cards2.map((card) => card.image)}
              date={cards2.map((card) => card.date)}
              time={cards2.map((card) => card.time)}
              name={cards2.map((card) => card.name)}
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
