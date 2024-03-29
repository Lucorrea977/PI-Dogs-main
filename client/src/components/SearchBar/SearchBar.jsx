import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getName } from "../../redux/actions/index";

import FiltersOrders from "../FiltersOrders/FiltersOrders.jsx";

import "./SearchBar.css";

export default function SearchBar({ pagina, set }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    pagina(1);
    dispatch(getName(name));
    setName("");
  }

  return (
    <nav className="contenedor-SearchBar">
      <div className="SearchBar-contenador-nav">
        <div className="SearchBar-logo">
          <Link to="/create">
            <button className="searchBar_create">
              <p className="SearchBar_text">CREATE YOUR DOG</p>
            </button>
          </Link>
          <Link to="/create">
            <button className="SearchBar_create SearchBar_create-sm">
              <p className="SearchBar_text">CREATE</p>
            </button>
          </Link>
        </div>
        <div className="SearchBar-create-icon">
          <div className="SearchBar_search">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Search..."
                value={name}
                onChange={handleInputChange}
              />
              <div className="SearchBar_btn">
                <button className="Search_btn-submit" type="submit">
                🔍
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="filters-nav" id="filterId-nav">
        <FiltersOrders pagina={pagina} set={set} />
      </div>
    </nav>
  );
}