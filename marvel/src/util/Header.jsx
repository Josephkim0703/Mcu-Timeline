import "../css/index.css";
import minute from "../assets/char/miss_minute.png";
import { useState, useEffect, useRef } from "react";


function Header(props) {
  const [hide, setHide] = useState(false);
  const [complete, setComplete] = useState(false);
  const slide = "slide";
  const slideOut = "slideOut";
  const buttonRef = useRef(null);

  function handleClose() {
    setComplete(false);
    buttonRef.current.classList.add(slideOut);

    setTimeout(() => {
      buttonRef.current.classList.remove(slide);

      setTimeout(() => {
        setHide(false);
      }, 250);
    }, 0);
  }

  //handle header option open and close
  function handleClick(e) {
    if (complete) {
      handleClose();
    } else {
      setHide(true);
      setComplete(true);
      buttonRef.current.classList.add(slide);

      setTimeout(() => {
        buttonRef.current.classList.remove(slideOut);
      }, 0);
    }
  }

  //handle header close on outside click
  useEffect(() => {
    function handleClickOut(e) {
      if (!e.target.closest("#main_button") && !e.target.closest(".option")) {
        handleClose();
      }
    }

    document.addEventListener("click", handleClickOut);

    return () => {
      document.removeEventListener("click", handleClickOut);
    };
  }, []);


  return (
    <header>
      <button type="button" id="refresh" onClick={props.refresh}><h1>MCU Timeline</h1></button>
      <div id="slider" ref={buttonRef}>
        <button type="button" id="main_button">
          <img src={minute} alt="" onClick={handleClick} />
        </button>
        {hide && (
          <div id="option">
            <button type="button" className="option" onClick={props.buttonMovie}>
              Movies
            </button>
            <button type="button" className="option" onClick={props.buttonShow}>
              TV-Shows
            </button>
            <button type="button" className="option" onClick={props.buttonAll}>
              All
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
