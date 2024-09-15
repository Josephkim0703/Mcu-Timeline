import { useState, useEffect, useRef } from "react";
import "../css/index.css";
import "../css/card.css";
import minute from "../assets/char/miss_minute_full.png";
import textbox from "../assets/char/textbox.png";

function MissMinute() {
  return (
    <div id="startPage">
      <div id="missMinute">
        <h1>
          Hey, y'all! I'm Miss Minutes, and this here’s the Marvel Cinematic
          Timeline! Now, go ahead and choose an option on the remote, and let’s
          dive into Earth-616… or is it 199999?
        </h1>
        <img src={textbox} alt="" />
        <img src={minute} alt="" />
      </div>
    </div>
  );
}

export default MissMinute;
