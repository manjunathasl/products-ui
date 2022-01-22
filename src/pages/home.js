import "./home.css";
import SearchBox from "../components/SearchBox";
import { signout } from "../services/auth";

import DataTable from "react-data-table-component";

export default function Home() {
  const onSearch = (searchString) => {
    console.log(searchString);
  };
  const logout = (e) =>{
    e.preventDefault();
    signout();
  }

  const columns = [
    {
      name: "Title",
      selector: (row) => row.title,
    },
    {
      name: "Year",
      selector: (row) => row.year,
    },
  ];

  return (
    <div className="home">
      <div className="user">
        <div>Manjunatha Lakshmanna</div>
        <a href="/logout" onClick={logout}>Log Out</a>
      </div>
      <div className="search">
        <SearchBox placeholder="Search for laptop modal" onSearch={onSearch} />
      </div>
      <div className="grid">Home</div>
    </div>
  );
}
