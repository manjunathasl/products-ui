import { useState } from "react";
import useDebounce from "../hooks/userDebounce";
import "./searchBox.css";

export default function Search(props) {
  const [searchText, setSearchText] = useState("");

  const clear = () => {
    setSearchText("");
    props.onSearch("");
  };
  const boundced = useDebounce(props.onSearch, 300);

  const onSearchChange = (e) => {
    setSearchText(e.target.value);
    boundced(e.target.value);
  };

  return (
    <div className="search-box">
      <input
        type="input"
        name="search"
        placeholder={props.placeholder}
        value={searchText}
        onChange={onSearchChange}
      ></input>
      <span onClick={clear} className="search-clear">
        X
      </span>
    </div>
  );
}