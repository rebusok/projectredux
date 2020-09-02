const menuLoaded = (newMenu) =>{
    return{
        type: 'MENU_LOADED',
        payload: newMenu
    }
}
const menuRequested = () =>{
    return{
        type: 'MENU_REQUESTED'
    }
}
const menuError = () =>{
    return{
        type: 'MENU_ERROR'
    }
}
const addedToCard = (id) =>{
    return{
        type: 'ITEM_ADD_CARD',
        payload: id
    }
}
const deleteToCard = (id, event = '') =>{
    return{
        type: 'ITEM_REMOVE_CARD',
        payload: id, 
        event: event
    }
}

export{
    menuLoaded,
    menuRequested,
    menuError,
    addedToCard,
    deleteToCard
};