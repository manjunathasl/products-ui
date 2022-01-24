import { useState, useEffect } from "react";
import SearchBox from "../components/SearchBox";
import { signout, getUser } from "../services/auth";
import { getProducts } from "../services/products";

import DataTable from "react-data-table-component";

import "./home.css";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [svcError, setSvcError] = useState("");
  const [totalPages, setTotalPages] = useState(0);

  const [page, setPage] = useState(1);
  
  const [searchStr, setSearchStr] = useState('');

  const onSearch = (str) => {
    setSearchStr(str)
  };

  const logout = (e) => {
    e.preventDefault();
    signout();
  };
  const handlePageChange = (page) =>{
    if(page < totalPages){
      setPage(page + 1)
    }
  }

  useEffect(() => {
    if (!user) {
      const u = getUser();
      setUser(u);
    }
    const loadProducts = async (page) => {
      try {
        setLoading(true);
        const data = await getProducts(page);
        if (data.products) {
          setTotalPages(data.totalPage);
          setProducts([...products, ...data.products]);
        }
      } catch (error) {
        setSvcError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [page]);

  const columns = [
    {
      name: "id",
      selector: (row) => row.id,
    },
    {
      name: "Name",
      selector: (row) => row.productName,
    },
    {
      name: "Price",
      selector: (row) => row.price,
    },
  ];

  return (
    <div className="home">
      <div className="user">
        <div>{user.userName}</div>
        <a href="/logout" onClick={logout}>
          Log Out
        </a>
      </div>
      <div className="search">
        <SearchBox placeholder="Search for laptop modal" onSearch={onSearch} />
      </div>
      <div className="grid">
        {svcError && <div className="error-text">{svcError}</div>}
        <DataTable
          columns={columns}
          data={searchStr ? products.filter(it => it.productName.toLowerCase().includes(searchStr.toLowerCase())): products}
          progressPending={loading}
          pagination
          paginationServer
          onChangePage={handlePageChange}
        />
      </div>
    </div>
  );
}
