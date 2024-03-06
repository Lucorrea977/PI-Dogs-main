import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetails } from '../../redux/actions/index';
import Loading from '../../assets/Loading.gif';
import './Details.css';

export default function Details() {
    const dispatch = useDispatch();
    const dogsDetails = useSelector((state) => state.details);
    const { id } = useParams(); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true); 
        dispatch(getDetails(id))
            .then(() => setLoading(false));
    }, [id, dispatch]);

    return (
        <div>
            {loading ? ( 
                <div>
                    <img src={Loading} alt="" className='loading_icon'/>
                </div>
            ) : (
                <div>
                    <nav className='contenedor-SearchBar contenedor_searchBar--details'>
                        <div className='searchBar-contenador-nav'>
                            <Link to="/home" className='details_links--home'>
                                
                            </Link>
                            <Link to='/create'>
                                <button className='details_link details_create'><p className='details_text'>CREATE YOUR DOG</p></button>
                            </Link>
                            <Link to="/home">
                                <button className='details_link details_home'>
                                    <p className='details_text'>HOME</p>
                                </button>
                            </Link>
                        </div>
                    </nav>
                    <div className='contenedor-Details'>
                        <div>
                            <div className='details_name'>
                                <h1>
                                {dogsDetails.name
                                ? dogsDetails.name
                                : dogsDetails[0].name}
                                </h1>
                            </div>
                            <div className='details_contenedor_img'>
                                <img className='img-Details'
                                src={dogsDetails.image
                                ? dogsDetails.image
                                : dogsDetails[0].image}
                                 alt="Not do found" />
                            </div>
                        </div>
                        <div className='contenido-Details'>
                            <div className='details_items'>
                                <h3 className='details_subtitle'>Height </h3>
                                {dogsDetails.height ?
                                    <p>{dogsDetails.height} cm</p>
                                    : <p>
                                        {dogsDetails[0].height_min} - {dogsDetails[0].height_max} cm
                                        </p>}
                            </div>
                            <div className='details_items'>
                                <h3 className='details_subtitle'>Weight </h3>
                                {dogsDetails.weight ?
                                    <p>{dogsDetails.weight} kg</p>
                                    : <p>
                                        {dogsDetails[0].weight_min} - {dogsDetails[0].weight_max} kg
                                        </p>}
                            </div>
                            <div className='details_items'>
                                <h3 className='details_subtitle'>Life span </h3>
                                {dogsDetails.life_span ?
                                    <p>{dogsDetails.life_span}</p> :
                                    <p>{dogsDetails[0].life_span} years</p>
                                }
                            </div>
                            <div className='details_items'>
                                <h3 className='details_subtitle'>Temperament </h3>
                                <p>
                                    {dogsDetails.temperament ? 
                                        dogsDetails.temperament : 
                                        (dogsDetails[0].temperaments ? 
                                            dogsDetails[0].temperaments.map(t => t.name + (' ')) : 
                                            'No temperament information available')
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
};