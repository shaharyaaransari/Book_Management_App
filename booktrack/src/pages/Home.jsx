import { Navbar } from "../Component/Navbar";
import Book from "../Component/Book";
import axios from "axios";
import React, { useEffect, useState } from "react";

export const Home = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState(1);
  const [role, setRole] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);

  const fetchData = () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    let url = `https://sample-bakened.onrender.com/books`;
    const params = new URLSearchParams();
    if (selectedGenres.length > 0) {
      params.append("genre", selectedGenres.join(","));
    }
    if (sortBy) {
      params.append("sort", sortBy);
      params.append("order", sortOrder);
    }

    axios
      .get(`${url}?${params.toString()}`, config)
      .then((res) => {
        console.log(res.data); // Log response to check data
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
    setRole(localStorage.getItem("role"));
    setName(localStorage.getItem("name"));
  }, [sortBy, sortOrder, selectedGenres]);

  const handleSort = (criteria) => {
    if (sortBy === criteria) {
      setSortOrder(sortOrder === 1 ? -1 : 1);
    } else {
      setSortBy(criteria);
      setSortOrder(1);
    }
  };

  const handleGenre = (GenreName) => {
    setSelectedGenres((prevGenres) =>
      prevGenres.includes(GenreName)
        ? prevGenres.filter((genre) => genre !== GenreName)
        : [...prevGenres, GenreName]
    );
  };

  return (
    <div>
      <Navbar name={name} />
      <div>
        <div className="sort-price">
          <div>
            <span style={{ display: "block", color: "#61c96f", fontFamily: "Montserrat" }}>
              Sort By Price
            </span>
            <button onClick={() => handleSort('price')}>High to Low</button>
            <button onClick={() => handleSort('price')}>Low to High</button>
          </div>
          <div>
            <span style={{ display: "block", color: "#61c96f", fontFamily: "Montserrat" }}>
              Filter By Genre
            </span>
            <button onClick={() => handleGenre("Action")}>Action</button>
            <button onClick={() => handleGenre("Adventure")}>Adventure</button>
            <button onClick={() => handleGenre("Romance")}>Romance</button>
            <button onClick={() => handleGenre("Comedy")}>Comedy</button>
            <button onClick={() => handleGenre("Sports")}>Sports</button>
          </div>
        </div>
      </div>
      <Book data={data} fetchData={fetchData} role={role} />
    </div>
  );
};
