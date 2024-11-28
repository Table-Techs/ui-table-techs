import { useContext, useState } from 'react';

import { context } from '../../../Store';
import './Details.css';
import { useNavigate } from 'react-router-dom';

function DetailsPage() {

    const [state, dispatch] = useContext(context);
    let navigate = useNavigate();

    const [item,] = useState({ ...state.selectedItem }, {});
    let [quantity, setQuantity] = useState(state.tray[item.id] ? state.tray[item.id].quantity : 0);
    const [specialInstruction, setSpecialInstruction] = useState(state.tray[item.id] ? state.tray[item.id].instruction : "");
    const [total, setTotal] = useState(state.total);

    const increaseQuantity = () => {
        quantity++;
        setTotal(total + parseFloat(item.price));
        setQuantity(quantity);
    }

    const decreaseQuantity = () => {
        quantity--;
        setTotal(total - parseFloat(item.price));
        setQuantity(quantity);
    }

    const updateTray = async () => {
        const newTray = { ...state.tray };
        if (newTray[item.id]) {
            newTray[item.id].quantity = quantity;
        } else {
            newTray[item.id] = { ...item, quantity: quantity };
        }
        newTray[item.id].instruction = specialInstruction;
        if (newTray[item.id].quantity === 0) {
            delete newTray[item.id];
        }
        await dispatch({
            type: 'update_tray',
            payload: {
                tray: { ...newTray },
                total: total
            }
        });
        await navigate(-1);
    }

    return (
        <div className="details-bg">
            {item !== undefined && <>
                <div className="details-banner">
                    <img src={item.img} className='details-banner-img' alt='details-banner-image' />
                </div>
                <div className="details-container">
                    <div className="details-header-div">
                        <div>
                            <p className="details-title poppins-semibold">{item.name}</p>
                            <p className="details-price">{"$" + item.price}</p>
                        </div>
                        <div className="details-quantity-div">
                            {quantity !== 0 && <>
                                <div className="details-quantity-btn" onClick={() => decreaseQuantity()}>-</div>
                                <div className="details-quantity"><span>{quantity}</span></div>
                            </>}
                            <div className="details-quantity-btn" onClick={() => increaseQuantity()}>+</div>
                        </div>
                    </div>
                    <div className="details-description poppins-light">
                        {item.description}
                    </div>
                    <p className="details-special-title">Special Instruction</p>
                    <textarea
                        name='specialInstruction'
                        value={specialInstruction}
                        rows={3}
                        onChange={(e) => setSpecialInstruction(e.target.value)}
                        placeholder='make it spicy...'
                        className='details-special-textarea' />
                </div>
                <div className='details-done-btn' onClick={() => updateTray()}>
                    Done
                </div>
            </>}
        </div>
    );
}

export default DetailsPage;