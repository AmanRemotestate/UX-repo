import "./App.css";
import { useState } from "react";
function CalcButtons({ value, style, handleClick }) {
  return (
    <button className="square" onClick={handleClick} style={style}>
      {value}
    </button>
  );
}
export default function App() {
  const customStyle1 = {
    background: "rgb(110, 102, 150)",
    boxShadow: "0px 5px 0px 0px rgb(110, 102, 150)",
    color: "white",
    borderColor: "rgb(112, 113, 150)"
  };
  const customStyle2 = {
    background: "rgb(193, 74, 57)",
    boxShadow: "0px 5px 0px 0px rgb(193, 74, 57)",
    color: "white",
    borderColor: "rgb(193, 74, 57)",
    width: "186px"
  };
  const customStyle3 = {
    background: "rgb(110, 102, 150)",
    boxShadow: "0px 5px 0px 0px rgb(110, 102, 150)",
    color: "white",
    borderColor: "rgb(112, 113, 150)",
    width: "186px"
  };
  const [resultdisplay, setresultdisplay] = useState("");
  const [x, setx] = useState(0);
  const [y, sety] = useState(0);
  const [isplus, setisplus] = useState(false);
  const [isminus, setisminus] = useState(false);
  const [ismultiply, setismultiply] = useState(false);
  const [isdivide, setisdivide] = useState(false);
  const [isdecimal, setdecimal] = useState(false);
  const [noafterdec, setnoafterdec] = useState(0);
  function onClickHandle(val) {
    if (val !== "DEL") 
      setresultdisplay(resultdisplay + val);
    if (isdecimal === false && typeof val === "number") 
      setx(x * 10 + val);
    else if (isdecimal === true && typeof val === "number") {
      setnoafterdec(noafterdec + 1);
      setx(x + val / Math.pow(10, noafterdec + 1));
    } 
    else if (val === "+") {
      setisplus(true);
      sety(y + x);
      setx(0);
      setdecimal(false);
      setnoafterdec(0);
    } 
    else if (val === "-") {
      setisminus(true);
      if (y === 0) sety(x);
      else sety(y - x);
      setx(0);
      setdecimal(false);
      setnoafterdec(0);
    } 
    else if (val === "x") {
      setismultiply(true);
      if (y === 0) {
        sety((n) => 1);
        sety((n) => n * x);
      } else sety(y * x);
      setx(0);
      setdecimal(false);
      setnoafterdec(0);
    }
     else if (val === "/") {
      setisdivide(true);
      if (y === 0) sety(x);
      else sety(y / x);
      setx(0);
      setdecimal(false);
      setnoafterdec(0);
    } 
    else if (val === "DEL") {
      if(resultdisplay[resultdisplay.length-1]==='.'){
        setresultdisplay(resultdisplay.slice(0, -1));
        setdecimal(false)
        return;
      }
      setresultdisplay(resultdisplay.slice(0, -1));
      if (noafterdec === 0) 
        setdecimal(false);
      if (!isdecimal) setx(Math.floor(x / 10));
      else {
        setx((x) => x * Math.pow(10, noafterdec));
        setx((x) => Math.floor(x / 10));
        setx((x) => x / Math.pow(10, noafterdec - 1));
        setnoafterdec(noafterdec - 1);
      }
    }
     else if (val === "=") {
      if (isplus) {
        setresultdisplay(x + y);
        setx(x + y);
        setisplus(false);
      }
      if (isminus) {
        setresultdisplay(y - x);
        setx(y - x);
        setisminus(false);
      }
      if (ismultiply) {
        setresultdisplay(x * y);
        setx(y * x);
        setismultiply(false);
      }
      if (isdivide) {
        setresultdisplay(y / x);
        setx(y / x);
        setisdivide(false);
      }
      sety(0);
    } 
    else if (val === "RESET") {
      setresultdisplay("");
      setx(0);
      sety(0);
      setisdivide(false);
      setisminus(false);
      setismultiply(false);
      setisplus(false);
      setdecimal(false);
      setnoafterdec(0);
    } 
    else if (val === ".") {
      setdecimal(true);
    }
    console.log("x :"+x);
    console.log(noafterdec);
  }
  return (
    <div>
      <div className="status">calc</div>
      <div className="result">{resultdisplay}</div>
      <div className="buttons">
        <div className="board-row">
          <CalcButtons value="7" handleClick={() => onClickHandle(7)} />
          <CalcButtons value="8" handleClick={() => onClickHandle(8)} />
          <CalcButtons value="9" handleClick={() => onClickHandle(9)} />
          <CalcButtons
            value="DEL"
            style={customStyle1}
            handleClick={() => onClickHandle("DEL")}
          />
        </div>
        <div className="board-row">
          <CalcButtons value="4" handleClick={() => onClickHandle(4)} />
          <CalcButtons value="5" handleClick={() => onClickHandle(5)} />
          <CalcButtons value="6" handleClick={() => onClickHandle(6)} />
          <CalcButtons value="+" handleClick={() => onClickHandle("+")} />
        </div>
        <div className="board-row">
          <CalcButtons value="1" handleClick={() => onClickHandle(1)} />
          <CalcButtons value="2" handleClick={() => onClickHandle(2)} />
          <CalcButtons value="3" handleClick={() => onClickHandle(3)} />
          <CalcButtons value="-" handleClick={() => onClickHandle("-")} />
        </div>
        <div className="board-row">
          <CalcButtons value="." handleClick={() => onClickHandle(".")} />
          <CalcButtons value="0" handleClick={() => onClickHandle(0)} />
          <CalcButtons value="/" handleClick={() => onClickHandle("/")} />
          <CalcButtons value="x" handleClick={() => onClickHandle("x")} />
        </div>
        <div className="board-row">
          <CalcButtons
            value="RESET"
            style={customStyle3}
            handleClick={() => onClickHandle("RESET")}
          />
          <CalcButtons
            value="="
            style={customStyle2}
            handleClick={() => onClickHandle("=")}
          />
        </div>
      </div>
    </div>
  );
}
//This is a comment
