const Reducer = (state, action) => {
    switch (action.type) {
        case 'select_category':
            return {
                ...state,
                selectedCategory: action.payload.selectedCategory
            };
        case 'update_tray':
            return {
                ...state,
                tray: { ...action.payload.tray },
                total: action.payload.total
            };
        case 'select_item':
            return {
                ...state,
                tray: { ...action.payload.tray },
                selectedItem: { ...action.payload.selectedItem },
                total: action.payload.total
            };
        case 'update_table':
            return {
                ...state,
                table: { ...action.payload.table },
                allTrays: [...action.payload.allTrays],
                tray: {},
                total: 0.00
            };
        case 'start_card_payment':
            return {
                ...state,
                tableTotal: action.payload.tableTotal
            }
        case 'payment_done':
            return {
                ...state,
                table: {},
                allTrays: [],
                tray: {},
                total: 0.00,
                selectedItem: {},
                selectedCategory: 'Best Sellers'
            };
        default:
            return {
                ...state
            };
    }
};

export default Reducer;