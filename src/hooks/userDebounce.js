import { useState } from "react";

export default function useDebounce(fn, delay) {
  const [timer, setTimer] = useState(null);
  return (...args) => {
    clearTimeout(timer);
    let _temp = setTimeout(() => {
      fn(...args);
    }, delay);
    setTimer(_temp);
  };
}
