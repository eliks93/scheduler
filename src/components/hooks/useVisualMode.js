import { useState } from "react";
// changes the visual mode when called to the specified mode
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history] = useState([initial]);
  function transition(next, replace) {
    if (replace) {
      setMode(next);
    } else {
      setMode(next);
      history.push(next);
    }
    return { transition };
  }
  function back() {
    if (history.length > 1) {
      history.pop();
      setMode(history[history.length - 1]);
    }
    return { back };
  }
  return { transition, back, mode };
}
