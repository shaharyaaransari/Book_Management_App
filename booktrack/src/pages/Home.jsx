import { Navbar } from "../Component/Navbar";
import Book from "../Component/Book";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/ContextApi";
import { Spinner } from "../Component/Spinner/Spinner";

export const Home = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState(1);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedSort, setSelectedSort] = useState(""); // Added state for selected sort
  const { title } = useContext(AuthContext);

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
    if (title) {
      params.append('title', title);
    }

    axios.get(`${url}?${params.toString()}`, config)
      .then((res) => {
        console.log(res.data); // Log response to check data
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
    setName(localStorage.getItem("name"));
    setRole(localStorage.getItem("role"));
  }, [sortBy, sortOrder, selectedGenres, title]);

  const handleSort = (criteria, order) => {
    setSortBy(criteria);
    setSortOrder(order);
    setSelectedSort(`${criteria}-${order}`); // Set selected sort
  };

  const handleGenre = (genreName) => {
    setSelectedGenres((prevGenres) =>
      prevGenres.includes(genreName)
        ? prevGenres.filter((genre) => genre !== genreName)
        : [...prevGenres, genreName]
    );
  };

  const getButtonStyle = (criteria, order) => {
    return selectedSort === `${criteria}-${order}` ? {  backgroundImage: "linear-gradient(-225deg, #29084f 0%, #5d4a9c 53%, #2f295b 100%)", color: "white" } : {};
  };

  const getGenreButtonStyle = (genreName) => {
    return selectedGenres.includes(genreName) ? { backgroundImage: "linear-gradient(-225deg, #29084f 0%, #5d4a9c 53%, #2f295b 100%)", color: "white" } : {};
  };

  return (
    <div>
      <Navbar name={name} role={role}/>
      <div>
        <div className="sort-price">
          <div>
            <span style={{ display: "block", color: "rgb(25, 118, 210)" }}>Sort By Price</span>
            <button 
              onClick={() => handleSort('price', 1)} 
              style={getButtonStyle('price', 1)}
            >
              Low to High
            </button>
            <button 
              onClick={() => handleSort('price', 0)} 
              style={getButtonStyle('price', 0)}
            >
              High to Low
            </button>
          </div>
          <div>
            <span style={{ display: "block", color: "rgb(25, 118, 210)" }}>Filter By Genre</span>
              <div className="filter-section">
              <button 
              onClick={() => handleGenre("Action")} 
              style={getGenreButtonStyle("Action")}
            >
              Action
            </button>
            <button 
              onClick={() => handleGenre("Adventure")} 
              style={getGenreButtonStyle("Adventure")}
            >
              Adventure
            </button>
            <button 
              onClick={() => handleGenre("Romance")} 
              style={getGenreButtonStyle("Romance")}
            >
              Romance
            </button>
            <button 
              onClick={() => handleGenre("Comedy")} 
              style={getGenreButtonStyle("Comedy")}
            >
              Comedy
            </button>
            <button 
              onClick={() => handleGenre("Sports")} 
              style={getGenreButtonStyle("Sports")}
            >
              Sports
            </button>
              </div>
            
          </div>
        </div>
        {loading && <Spinner />}
      </div>
      <Book data={data} fetchData={fetchData} role={role}/>
    </div>
  );
};
