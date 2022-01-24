import { useState, useEffect } from "react";
import SearchBox from "../components/SearchBox";
import { signout, getUser } from "../services/auth";
import { getProducts } from "../services/products";
import InfiniteScroll from "react-infinite-scroll-component";

import "./home.css";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [svcError, setSvcError] = useState("");
  const [totalPages, setTotalPages] = useState(0);

  const [page, setPage] = useState(1);

  const [searchStr, setSearchStr] = useState("");

  const onSearch = (str) => {
    setSearchStr(str);
  };

  const logout = (e) => {
    e.preventDefault();
    signout();
  };
  const loadMore = () => {
    if (!loading && page < totalPages) {
      setPage(page + 1);
    }
  };

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
          setTotalPages(data.totalPages);
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
        <div>{user?.userName}</div>
        <a href="/logout" onClick={logout}>
          Log Out
        </a>
      </div>
      <div className="search">
        <SearchBox placeholder="Search for laptop modal" onSearch={onSearch} />
      </div>
      <div className="grid">
        <div className="row header">
          <div className="cell">ID</div>
          <div className="cell">Product Name</div>
          <div className="cell">Price</div>
        </div>
        <InfiniteScroll
          dataLength={(searchStr ? products.filter(it => it.productName.toLowerCase().includes(searchStr.toLowerCase())): products).length}
          next={loadMore}
          hasMore={true}
          loader={loading ? <h4>Loading...</h4> : ''}
          height={200}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>{svcError}</b>
            </p>
          }
        >
          {(searchStr ? products.filter(it => it.productName.toLowerCase().includes(searchStr.toLowerCase())): products).map((item, index) => (
            <div className="row" key={index}>
              <div className="cell">{item.id}</div>
              <div className="cell">{item.productName}</div>
              <div className="cell">{item.price}</div>
            </div>
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
}
