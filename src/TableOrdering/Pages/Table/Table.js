import { useContext, useState } from 'react';

import './Table.css'
import { context } from '../../../Store';
import { useNavigate } from 'react-router-dom';

function TablePage() {
    const [state,] = useContext(context);
    let navigate = useNavigate();

    const [table,] = useState(Object.keys(state.table).length > 0 ? { ...state.table } : null);
    const [allTrays,] = useState(state.allTrays.length > 0 ? [...state.allTrays] : []);
    const [tableFilter, setTableFilter] = useState("table");

    let subTotal = 0.00;

    const renderTable = () => {
        return Object.keys(table).map(key => {
            subTotal += table[key].quantity * parseFloat(table[key].price);
            return (
                <div className="table-items-div" key={table[key].id}>
                    <p>{table[key].name}</p>
                    <p>{"x " + table[key].quantity}</p>
                </div>
            )
        });
    }

    const renderTrays = () => {
        return allTrays.map((tray, index) => {
            return (
                <div key={index}>
                    {index !== 0 && <div className="table-hr-line"></div>}
                    {renderTray(allTrays[allTrays.length - index - 1])}
                </div>
            )
        });
    }

    const renderTray = (tray) => {
        return Object.keys(tray).map(key => {
            return (
                <div className="table-items-div" key={tray[key].id}>
                    <p>{tray[key].name}</p>
                    <p>{"x " + tray[key].quantity}</p>
                </div>
            )
        });
    }

    const backToMenu = () => {
        navigate("/order");
    }

    const wrapMyTable = async () => {
        navigate("/order/checkout");
    }

    return (
        <div className="table-bg">
            <div className="table-filter-div poppins-semibold">
                <p className={tableFilter === "table" ? "table-title" : "table-title-disabled"} onClick={() => setTableFilter("table")}>Your Table</p>
                <div className="table-filter-separator"></div>
                <p className={tableFilter === "trays" ? "table-title" : "table-title-disabled"} onClick={() => setTableFilter("trays")}>All Trays</p>
            </div>
            <div className='table-container'>
                {tableFilter === "table"
                    ? table !== null ?
                        <>
                            <div>
                                {renderTable()}
                                <div className="table-hr-line"></div>
                                <div className="table-sub-total poppins-semibold">
                                    <p>Sub Total</p>
                                    <p>{" $" + subTotal.toFixed(2)}</p>
                                </div>
                            </div>
                        </> :
                        <div className="no-table-text poppins-regular">
                            <p>We found your table empty. Please add something from the menu to your Tray or call attendant for help.</p>
                        </div>
                    : allTrays.length !== 0 ?
                        <>
                            <div>
                                {renderTrays()}
                            </div>
                        </> :
                        <div className="no-table-text poppins-regular">
                            <p>We found your table empty. Please add something from the menu to your Tray or call attendant for help.</p>
                        </div>
                }
            </div>
            <div className="table-btn-container">
                <div className='back-to-menu-btn' onClick={() => backToMenu()}>
                    Back to Menu
                </div>
                {table !== null && <div className='wrap-my-table-btn' onClick={() => wrapMyTable()}>
                    Wrap My Table
                </div>}
            </div>
        </div>
    )
}

export default TablePage;