

const initialState = {
    menu: [],
    loading: true,
    error: false,
    items: [],
    totalPrice: 0

}

const reducer = (state = initialState, action) => {
    console.log(state);
    switch(action.type){
        case 'MENU_LOADED':
            return {
                ...state,
                menu: action.payload,
                loading: false,
                error: false
            };
        case 'MENU_REQUESTED':
        return {
            ...state,
            menu: state.menu,
            loading: true,
            error: false
        };
        case 'MENU_ERROR':
        return {
            ...state,
            menu: state.menu,
            loading: true,
            error: true
        };
        case 'ITEM_ADD_CARD':
            const id = action.payload;
            
            const itemInd = state.items.findIndex(item => item.id === id);
            if (itemInd >= 0){
                const itemInState = state.items.find(item => item.id === id);
                const newItem = {
                    ...itemInState,
                    qtty: ++itemInState.qtty
                }
                return {
                    ...state, 
                    items: [
                        ...state.items.slice(0, itemInd),
                        newItem,
                        ...state.items.slice(itemInd + 1)
                    ],
                    totalPrice: state.totalPrice + newItem.price
                }

            } 
            // товара раньше не было в корзине
            const item = state.menu.find(item => item.id === id);
            const newItem = {
                title: item.title,
                price: item.price,
                url: item.url,
                id: item.id,
                qtty: 1
            };
            
            return {
                ...state,
                items: [
                    ...state.items,
                    newItem
                ],
                totalPrice: state.totalPrice + newItem.price
            };
        case 'ITEM_REMOVE_CARD':
            const index = action.payload;
            const event = action.event;
// На случай если надо уменьшить количество одноименных товаров в корзине
            if (event === 'one') {
                const itemInState = state.items.find(item => item.id === index);
            
// Если товар один, то при нажатии минуса он полностью удаляется из корзины
                if (itemInState.qtty === 1) {
                    return {
                        ...state,
                        items: [
                            ...state.items.filter(item => item.id !== index)
                        ],
                        totalPrice: state.totalPrice - itemInState.price
                    }
                }
                const newItemQty = {
                    ...itemInState,
                    qtty: --itemInState.qtty
                }
                return {
                    ...state,
                    items: [
                        ...state.items.filter(item => item.id !== index),
                        newItemQty
                    ],
                    totalPrice: state.totalPrice - itemInState.price
                }
            }
            return{
                ...state
            }
        default:
            return state;
    }
}

export default reducer;