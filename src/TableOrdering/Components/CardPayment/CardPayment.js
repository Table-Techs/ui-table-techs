import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useContext, useState } from 'react';

import './CardPayment.css'
import { context } from '../../../Store';

function CardPaymentComponent() {

    const [state,] = useContext(context);

    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        setIsProcessing(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: `${window.location.origin}/order/thanks`,
            },
        });

        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message);
        } else {
            setMessage("An unexpected error occured.");
        }

        setIsProcessing(false);
    }

    return (
        <div className="payment-div">
            <p className='payment-total poppins-semibold'>Your Total: ${state.tableTotal}</p>
            <form id="payment-form" onSubmit={handleSubmit}>
                <PaymentElement id="payment-element" options={{ layout: {
                    type: "accordion"
                } }} />
                <button disabled={isProcessing || !stripe || !elements} className={isProcessing ? 'payment-btn-disabled' : 'payment-btn'} id="submit">
                    <span>
                        {isProcessing ? "Processing ... " : "Pay now"}
                    </span>
                </button>
                {/* Show any error or success messages */}
                {message && <div className="payment-error-message">{message}</div>}
            </form>
        </div>
    )
}

export default CardPaymentComponent;