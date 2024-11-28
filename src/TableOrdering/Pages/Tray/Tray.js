import { useContext, useState } from 'react';

import './Tray.css'
import { context } from '../../../Store';
import { useNavigate } from 'react-router-dom';

function TrayPage() {
    const [state, dispatch] = useContext(context);
    let navigate = useNavigate();

    const [tray, setTray] = useState(Object.keys(state.tray).length > 0 ? { ...state.tray } : null);

    const renderTray = () => {
        return Object.keys(tray).map(key => {
            return (
                <div className="tray-items-div" key={tray[key].id}>
                    <p>{tray[key].name}</p>
                    <div className="tray-quantity-div">
                        <div className="tray-quantity-btn" onClick={() => decreaseQuantity(tray[key].id)}>-</div>
                        <div className="tray-quantity"><span>{tray[key].quantity}</span></div>
                        <div className="tray-quantity-btn" onClick={() => increaseQuantity(tray[key].id)}>+</div>
                    </div>
                </div>
            )
        });
    }

    const increaseQuantity = (itemId) => {
        const newTray = { ...tray };
        const objectToUpdate = { ...newTray[itemId] };
        objectToUpdate.quantity++;
        newTray[itemId] = objectToUpdate;
        setTray(newTray);
    }

    const decreaseQuantity = (itemId) => {
        const newTray = { ...tray };
        const objectToUpdate = { ...newTray[itemId] };
        objectToUpdate.quantity--;
        newTray[itemId] = objectToUpdate;
        if (objectToUpdate.quantity === 0) {
            delete newTray[itemId];
        }
        setTray(newTray);
    }

    const backToMenu = () => {
        navigate("/order");
    }

    const addToTable = async () => {
        let table = { ...state.table };
        let allTrays = [...state.allTrays];
        allTrays.push(tray);
        await Object.keys(tray).forEach(key => {
            if (table[tray[key].id]) {
                let newQuantity = table[tray[key].id].quantity + tray[key].quantity;
                table[tray[key].id] = { ...tray[key], quantity: newQuantity }
            } else {
                table[tray[key].id] = { ...tray[key] }
            }
        })
        await dispatch({
            type: 'update_table',
            payload: {
                table: { ...table },
                allTrays: [...allTrays]
            }
        });
        await navigate("/order/table");
    }

    return (
        <div className="tray-bg">
            <p className="tray-title poppins-semibold">Your Tray</p>
            <div className='tray-container'>
                {tray !== null ?
                    <>
                        <div>
                            {renderTray()}
                        </div>
                    </> :
                    <div className="no-tray-text poppins-regular">
                        <p>We found your tray empty. Please add something from the menu or call attendant for help.</p>
                    </div>
                }
            </div>
            <div className="tray-btn-container">
                <div className='back-to-menu-btn' onClick={() => backToMenu()}>
                    Back to Menu
                </div>
                {tray !== null && <div className='add-to-table-btn' onClick={() => addToTable()}>
                    Add to Table
                </div>}
            </div>
        </div>
    )
}

export default TrayPage;