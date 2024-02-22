import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getDogs, getName } from "../../redux/actions/index";
import menu from "../../assets/menu.png";
import FiltersOrders from "../FiltersOrders/FiltersOrders.jsx";
import icon from "../../assets/collar-de-perro.png";
import { HiSearch } from "react-icons/hi";
import "./SearchBar.css";

export default function SearchBar({ pagina, set }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleClickAllDogs(e) {
    e.preventDefault();
    pagina(1);
    dispatch(getDogs(e.target.value));
  }

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

  function handleClick(e) {
    let app = document.getElementById("filterId-nav");
    if (app.classList.contains("filters-nav__inside"))
      app.classList.remove("filters-nav__inside");
    else app.classList.add("filters-nav__inside");
  }

  return (
    <nav className="contenedor-SearchBar">
      <div className="SearchBar-contenador-nav">
        <div className="SearchBar-logo">
          <img
            src={icon}
            alt=""
            className="SearchBar_icon"
            onClick={(e) => handleClickAllDogs(e)}
          />
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
                <button className="Search_btn-submit">
                  <HiSearch />
                </button>
              </div>
            </form>
          </div>
          <img
            src={menu}
            className="SearchBar-img"
            id="SearchBar-img"
            onClick={handleClick}
            alt="Not do found"
          ></img>
        </div>
      </div>
      <div className="filters-nav" id="filterId-nav">
        <FiltersOrders pagina={pagina} set={set} />
      </div>
    </nav>
  );
}