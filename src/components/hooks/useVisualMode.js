import React,{useState} from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
    function transition(next, replace) {
      if(replace) {
        setMode(next)
      } else {
      setMode(next)
      history.push(next)
      }
      return { transition };
    }
    function back() {
      if (history.length > 1) {
      history.pop()
      setMode(history[history.length -1])
      }
      return { back }
    }
    console.log(history)
  return { transition, back, mode };
}
