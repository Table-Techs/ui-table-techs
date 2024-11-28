import { createContext, useReducer } from "react";
import Reducer from "./Reducer";

const initialState = {
    tray: {},
    allTrays: [],
    table: {},
    user: {},
    total: 0.00,
    tableTotal: 0.00,
    selectedItem: {},
    selectedCategory: 'Best Sellers'
};

export const context = createContext(initialState);

const Store = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, initialState);
    return (
        <context.Provider value={[state, dispatch]}>
            {children}
        </context.Provider>
    )
};

export default Store;