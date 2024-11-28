import { useContext, useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from '@stripe/react-stripe-js'

import './Payment.css'
import { CREATE_PAYMENT_INTENT_ENDPOINT, GET_CONFIG_ENDPOINT } from "../../../Constants";
import { context } from "../../../Store";
import CardPaymentComponent from "../../Components/CardPayment/CardPayment";

function PaymentPage() {

    const [state,] = useContext(context);

    const [total,] = useState(state.tableTotal);
    const [stripePromise, setStripePromise] = useState(null);
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        fetch(GET_CONFIG_ENDPOINT).then(async (res) => {
            const { publishableKey } = await res.json();
            setStripePromise(loadStripe(publishableKey));
        })
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (total !== 0) {
            fetch(CREATE_PAYMENT_INTENT_ENDPOINT, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    total: total * 100
                })
            }).then(async (res) => {
                const { clientSecret } = await res.json();
                setClientSecret(clientSecret);
            })
        }
        // eslint-disable-next-line
    }, [])

    const appearance = {
        theme: 'stripe',

        variables: {
            fontFamily: 'Poppins, sans-serif'
        }

    };

    return (
        <div className="payment-bg">
            {stripePromise && clientSecret && (
                <Elements stripe={stripePromise} options={{ clientSecret, appearance }}>
                    <CardPaymentComponent />
                </Elements>
            )}
        </div>
    )
}

export default PaymentPage;