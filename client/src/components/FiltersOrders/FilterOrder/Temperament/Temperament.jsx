import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { filterTemperament } from '../../../../redux/actions/index';
import arrow from '../../../../assets/arrow.png';
import './Temperament.css';

export default function Temperament({pagina}) {
    const allTemperament = useSelector((state) => state.temperaments);
    const dispatch = useDispatch();

    function handleStatus(e) {
        e.preventDefault()
        pagina(1)
        dispatch(filterTemperament(e.target.name))
    };

    return (
        <div>
            <ul className="temperament_links">
                <li className="temperament_item temperament_item--show">
                    <p className="temperament_link temperament_title">
                        Temperament
                        <img src={arrow} alt="No do found"
                        className="temperament_arrow"/>
                        </p>
                    <ul className="temperament_nesting" >
                        {
                            allTemperament && allTemperament.map(d => (
                            <li className="temperament_inside" key={d.id}>
                            <button className="temperament_link temperament_link--inside" name={d.name} onClick={e => handleStatus(e)}>{d.name}</button>
                        </li>
                            ))
                        }
                    </ul>
                </li>
            </ul>
        </div>
    )
}