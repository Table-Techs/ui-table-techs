import { useContext, useState } from 'react';

import './Checkout.css'
import { context } from '../../../Store';
import { useNavigate } from 'react-router-dom';

function CheckoutPage() {
    const [state, dispatch] = useContext(context);
    let navigate = useNavigate();

    const [table,] = useState(Object.keys(state.table).length > 0 ? { ...state.table } : null);
    const [tip, setTip] = useState('');
    const [selectedTip, setTipSelected] = useState('');

    let preTax = 0.00;
    const tax = 15;
    let taxAmt = 0.00;
    let postTax = 0.00;
    let tip10 = "0.00";
    let tip15 = "0.00";
    let tip20 = "0.00";

    const renderTable = () => {
        return Object.keys(table).map((key, index) => {
            preTax += table[key].quantity * parseFloat(table[key].price);
            if (index === Object.keys(table).length - 1) {
                taxAmt = preTax * tax / 100;
                tip10 = (preTax * 0.10).toFixed(2);
                tip15 = (preTax * 0.15).toFixed(2);
                tip20 = (preTax * 0.20).toFixed(2);
                postTax = preTax + taxAmt;
            }
            return (
                <div className="checkout-items-div" key={table[key].id}>
                    <p>{table[key].name}<span className='checkout-quantity'>{"x " + table[key].quantity}</span></p>
                    <p className='poppins-semibold'>{"$ " + (table[key].quantity * table[key].price).toFixed(2)}</p>
                </div>
            )
        });
    }

    const handleTipChange = (val) => {
        setTip(parseFloat(val));
        setTipSelected('');
    }

    const onSelectTip = (val, tipFilter) => {
        setTip(parseFloat(val));
        setTipSelected(tipFilter);
    }

    const onPayment = async () => {
        const total = parseFloat((postTax + (tip || parseFloat("0.00"))).toFixed(2));
        // clearAppData();
        await dispatch({
            type: 'start_card_payment',
            payload: {
                tableTotal: total
            }
        });
        await navigate("/order/payment");
    }

    return (
        <div className="checkout-bg">
            <p className="checkout-title poppins-semibold">Your Table</p>
            <div className='checkout-container'>
                {table !== null ?
                    <>
                        <div>
                            {renderTable()}
                        </div>
                    </> :
                    <div className="no-checkout-text poppins-regular">
                        <p>We found your checkout empty. Please add something from the menu to your Tray or call attendant for help.</p>
                    </div>
                }
                <div className="checkout-hr-line" />
                <div className="checkout-tip-input-div">
                    <p className="checkout-tip-label poppins-semibold">Tip</p>
                    <input type='number' id="tip" placeholder='0.00' name="tip" min="0" step="0.01" value={tip} className="checkout-tip-input poppins-regular" onChange={(e) => handleTipChange(e.target.value)} />
                </div>
                <div className="checkout-tip-selector-div">
                    <p className={selectedTip === 'tip10' ? "checkout-tip-selector-selected" : "checkout-tip-selector"} onClick={() => onSelectTip(tip10, 'tip10')}>{"10% ($" + tip10 + ")"}</p>
                    <p className={selectedTip === 'tip15' ? "checkout-tip-selector-selected mr-inline-10" : "checkout-tip-selector mr-inline-10"} onClick={() => onSelectTip(tip15, 'tip15')}>{"15% ($" + tip15 + ")"}</p>
                    <p className={selectedTip === 'tip20' ? "checkout-tip-selector-selected" : "checkout-tip-selector"} onClick={() => onSelectTip(tip20, 'tip20')}>{"20% ($" + tip20 + ")"}</p>
                </div>
                <div className="checkout-hr-line" />
                <div className="checkout-sub-total poppins-semibold">
                    <p>Sub Total</p>
                    <p>{" $" + preTax.toFixed(2)}</p>
                </div>
                <div className="checkout-sub-total poppins-light">
                    <p>Tax</p>
                    <p>{" $" + taxAmt.toFixed(2)}</p>
                </div>
                <div className="checkout-sub-total poppins-light">
                    <p>Tip</p>
                    <p>{isNaN(parseFloat(tip)) ? "$0.00" : "$" + parseFloat(tip).toFixed(2)}</p>
                </div>
                <div className="checkout-hr-line" />
                <div className="checkout-sub-total poppins-semibold">
                    <p>Total</p>
                    <p>{" $" + (postTax + (tip || parseFloat("0.00"))).toFixed(2) + "  "}</p>
                </div>
            </div>
            <div className='checkout-bottom-container'>
                {/* <p className="checkout-total-div">
                    <span>pay</span><span className='checkout-total-content poppins-semibold'>{" $" + (postTax + (tip || parseFloat("0.00"))).toFixed(2) + "  "}</span><span>with</span>
                </p> */}
                {/* <div className='checkout-total-container'> */}
                    <div className='checkout-debit-btn' onClick={onPayment}>
                        <span>Proceed to Payment</span>
                    </div>
                {/* </div> */}
            </div>
        </div>
    )
}

export default CheckoutPage;