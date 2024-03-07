import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs, getTemperament } from "../../redux/actions/index";
import Card from "../Card/Card.jsx";
import Paginado from "../Paginado/Paginado.jsx";
import SearchBar from "../SearchBar/SearchBar";
import DogIcon from "../../assets/DogIcon.jpg";
import Loadingbar from "../../assets/Loading.gif";

export default function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage] = useState(8);
  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = allDogs ? allDogs.slice(indexOfFirstDog, indexOfLastDog) : [];
  const length = allDogs ? allDogs.length : 0;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getDogs());
    dispatch(getTemperament())
      .then(() => setLoading(false))
      .catch((error) => setError(error.message));
  }, [dispatch]);

  if (loading) {
    return (
      <div className="loading-background">
        <img src={Loadingbar} className="loading_icon" alt="Please wait" />
        <br />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="nav-Home">
        <SearchBar pagina={setCurrentPage} />
      </div>
      <Paginado
        dogsPage={dogsPerPage}
        allDogs={length}
        currentPage={currentPage}
        paginado={paginado}
      />
      <div className="card-Home">
        {currentDogs.map((d) => (
          <Card
            key={d.id}
            id={d.id}
            name={d.name}
            image={d.image ? d.image : DogIcon}
            temperament={d.temperament}
            weight={d.weight}
          />
        ))}
      </div>
    </div>
  );
}