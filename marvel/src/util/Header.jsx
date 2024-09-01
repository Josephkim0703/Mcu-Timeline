import "../css/index.css";
import minute from "../assets/char/miss_minute.png";
import { useState, useEffect, useRef } from "react";
function Header() {
  const [hide, setHide] = useState(false);
  const [complete, setComplete] = useState(false);
  const slide = "slide";
  const slideOut = "slideOut";
  const buttonRef = useRef(null);

  //handle header option open and close
  function handleClick(e) {
    if (complete) {
      setComplete(false);
      buttonRef.current.classList.add(slideOut);

      setTimeout(() => {
        buttonRef.current.classList.remove(slide);

        setTimeout(() => {
          setHide(false);
        }, 250);
      }, 0);
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
        setComplete(false);
        buttonRef.current.classList.add(slideOut);

        setTimeout(() => {
          setTimeout(() => {
            setHide(false);
          }, 250);
          buttonRef.current.classList.remove(slide);
        }, 0);
      }
    }

    document.addEventListener("click", handleClickOut);

    return () => {
      document.removeEventListener("click", handleClickOut);
    };
  }, []);

  return (
    <header>
      <h1>MCU Timeline</h1>
      <div id="slider" ref={buttonRef}>
        <button type="button" id="main_button">
          <img src={minute} alt="" onClick={handleClick} />
        </button>
        {hide && (
          <div id="option">
            <button type="button" className="option">
              Movies
            </button>
            <button type="button" className="option">
              TV-Shows
            </button>
            <button type="button" className="option">
              All
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
