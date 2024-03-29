import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";

export default function Card({ name, image, temperament, weight, id }) {
    return (
        <div className="card_contenedor">
            < Link to={`/${id}`}>
                <div className="card_contenedor-image">
                    <img
                        src={image}
                        alt="Not found"
                        className="card_image"
                        width="100px"
                        height="250px"
                    />
                </div>
                <div className="card_contenido">
                    <h3 className="card_name">{name}</h3>
                    <div className="card_temp">
                        <p>TEMPERAMENT: </p>
                        <p>{temperament}</p>
                    </div>
                    <div className="card_data">Weight: {weight} kg</div>
                </div>
            </Link>
        </div>
    );
};