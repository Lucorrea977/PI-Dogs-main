import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs, getTemperament } from "../../redux/actions/index";
import Card from "../Card/Card.jsx";
import Paginado from "../Paginado/Paginado.jsx";
import SearchBar from "../SearchBar/SearchBar";
import DogIcon from "../../assets/DogIcon.jpg";
import Loadingbar from "../../assets/Loading.gif";
import { Link } from "react-router-dom";

export default function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);
  const [, setOrden] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPage] = useState(8);
  const indexLastDog = currentPage * dogsPage;
  const indexFirstDog = indexLastDog - dogsPage;
  const currentDogs = allDogs?.slice(indexFirstDog, indexLastDog);
  const length = allDogs?.length;
  const [loading, setLoading] = useState(true);
  const [, setError] = useState(false);
  var counter = currentDogs?.length;

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getDogs());
    dispatch(getTemperament())
      .then((response) => {
        setLoading(false);
      })
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

  return (
    <div>
      <div className="nav-Home">
        <SearchBar pagina={setCurrentPage} set={setOrden} />
      </div>
      <Paginado
        dogsPage={dogsPage}
        allDogs={length}
        currentPage={currentPage}
        paginado={paginado}
      />

      <div className="card-Home">
        {currentDogs?.map((d) => {
          return (
            <Card
              key={d.id}
              id={d.id}
              name={d.name}
              image={d.image ? d.image : DogIcon}
              temperament={
                d.temperament ? (
                  d.temperament
                ) : d.temperaments ? (
                  d.temperaments.map((t) => t.name + " ")
                ) : (
                  <></>
                )
              }
              weight={d.weight ? d.weight[0] : d.weight_min}
            />
          );
        })}
      </div>
      {counter > 3 ? (
        <Paginado
          dogsPage={dogsPage}
          allDogs={length}
          currentPage={currentPage}
          paginado={paginado}
        />
      ) : (
        <></>
      )}

      <Link to="/">
        <button className="landing-button"> Back Landing </button>
      </Link>
    </div>
  );
}