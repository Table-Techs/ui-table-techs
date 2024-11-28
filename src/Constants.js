const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

//endpoints
export const GET_CONFIG_ENDPOINT = BACKEND_URL + "/stripe/config";
export const CREATE_PAYMENT_INTENT_ENDPOINT = BACKEND_URL + "/stripe/createPaymentIntent";