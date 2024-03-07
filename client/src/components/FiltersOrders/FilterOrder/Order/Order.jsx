import React from 'react';
import { useDispatch } from 'react-redux';
import { orderAs, orderWeight } from '../../../../redux/actions/index';
import arrow from '../../../../assets/arrow.png';
import './Order.css';

export default function Order({ pagina, set }) {
    const dispatch = useDispatch();

    function handleOrder(e, orderType) {
        e.preventDefault();
        pagina(1);
        dispatch(orderAs(orderType)); 
        if (typeof set === 'function') {
            set(`Ordenado ${orderType}`); 
        }
    }

    function handleWeight(e) {
        e.preventDefault();
        dispatch(orderWeight(e.target.name));
        pagina(1);
    }

    return (
        <div>
            <ul className="order_links">
                <li className="order_item order_item--show">
                    <p className="order_link">
                        Order
                        <img src={arrow} alt="No do found" className="order_arrow"/>
                    </p>
                    <ul className="order_nesting">
                        <li className="order_inside">
                            <button className="order_link order_link--inside" onClick={e => handleOrder(e, 'asc')}>A - Z</button>
                        </li>
                        <li className="order_inside">
                            <button className="order_link order_link--inside" onClick={e => handleOrder(e, 'desc')}>Z - A</button>
                        </li>
                        <li className="order_inside">
                            <button className="order_link order_link--inside" name="min" onClick={e => handleWeight(e)}>WeightMin</button>
                        </li>
                        <li className="order_inside">
                            <button className="order_link order_link--inside" name="max" onClick={e => handleWeight(e)}>WeightMax</button>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    );
}