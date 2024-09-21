import { useState, useEffect, useRef } from "react";
import "./css/index.css";
import tva from "./assets/background/tva.jpg";
import Card from "./util/Card.jsx";
import Header from "./util/Header.jsx";
import Remote from "./util/Remote.jsx";
import MissMinute from "./util/MissMinute.jsx";
import { marvel_T } from "./util/data.js";

//shows cards when clicking on the top buttons make remote come up to choose option
//mis miunte in the beginning explaining the website local storage to show once

function App() {

  const [cards, setCards] = useState([]);
  const [cards2, setCards2] = useState([]);
  const [type, setType] = useState([]);
  const [status, setStatus] = useState();

  const [AdaptiveNum, setAdaptiveNum] = useState(8);
  const [width, setWidth] = useState();

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

  //reset page function
  function refresh() {
    updateHide(0, false);
    ButtonAll();
    set();
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

  function handleSettingType() {
    const typeStorage = sessionStorage.getItem('Set_Type:'); 

    if(typeStorage === "CR") {
      updateHide(1, false);
      updateHide(2, true);
      setType(marvel_T.sort((a, b) => a.timeline - b.timeline));
    } else if(typeStorage === "RD") {
      updateHide(1, true);
      updateHide(2, false);
      setType(marvel_T.sort((a, b) => a.releaseDate - b.releaseDate));
      }
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
        setType(marvel_T.sort((a, b) => a.timeline - b.timeline));
      }, 0);
    }, 0);

    updateHide(1, false);
    updateHide(2, true);
    updateHide(0, true);
    console.log("current setting: CR");

    sessionStorage.removeItem("Set_Type:");
    sessionStorage.setItem("Set_Type:", "CR");
    sessionStorage.setItem("Starter_Page", true)
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

    updateHide(1, true);
    updateHide(2, false);
    updateHide(0, true);
    console.log("current setting: RD");

    sessionStorage.removeItem("Set_Type:");
    sessionStorage.setItem("Set_Type:", "RD");
    sessionStorage.setItem("Starter_Page", true)
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
      if (e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 65) {
        setLeft((prevLeft) => Math.min(prevLeft + 1, minArrLength));
        setRight((prevRight) => Math.min(prevRight + 1, ArrLength));
      } else if (e.keyCode === 40 || e.keyCode === 37 || e.keyCode === 68) {
        setLeft((prevLeft) => Math.max(prevLeft - 1, 0));
        setRight((prevRight) => Math.max(prevRight - 1, AdaptiveNum));
      }
    }

    window.addEventListener("keydown", handleClick);

    return () => {
      window.removeEventListener("keydown", handleClick);
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

  //screen width adaptiveness shrink number of cards
    useEffect(() => {
      setWidth(window.innerWidth) 
     if(width > 900) {
      setAdaptiveNum(6);
     } else {
      setAdaptiveNum(8);
     }

     console.log(width);
    },[window.innerWidth]);

  //save on session storage for miss minute
  useEffect(() => {
    updateHide(4, true);

    const complete = sessionStorage.getItem("Starter_Page");

    if(complete === "true") {
      updateHide(4, false);
    }
  
  },[])

  return (
    <>
      <Header
        refresh={refresh}
        buttonShow={ButtonTvReset}
        buttonMovie={ButtonMvReset}
        buttonAll={ButtonAllReset}
      />
      <main>
        {hide[4] && (<MissMinute/>)} 
      
        <Remote  ButtonC={ButtonCR} ButtonR={ButtonRD} />

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

        <img src={tva} alt="" id="background" />
      </main>
    </>
  );
}

export default App;
