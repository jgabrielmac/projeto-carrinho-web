
export const Types = {
    ADD_CART: 'ADD_CART',
    REMOVE_CART: 'REMOVE_CART',
    CART_LIST: 'CART_LIST'
}

const initialState = {
    carrinho: []
}

const removeItem = (id, carrinho) => {
    var newCarrinho = carrinho;
    const indexItem = newCarrinho.findIndex(prod => prod.id === id);

    if (indexItem >= 0) {
        newCarrinho.splice(indexItem, 1);
    }
    return newCarrinho
};

export default (state = initialState, action) => {
    switch (action.type) {
        case Types.ADD_CART:
            return {
                ...state,
                carrinho: [...state.carrinho, action.payload]
            }
        case Types.REMOVE_CART:
            return {
                ...state,
                carrinho: removeItem(action.id, state.carrinho)
            }
        case Types.CART_LIST:
            return {
                ...state,
            }
        default:
            return state
    }
}

export const Creators = {
    addCart: (product) => ({
        type: Types.ADD_CART,
        payload: product
    }),
    removeCart: ( id ) => ({
        type: Types.REMOVE_CART,
        id: id
    }),
    cartList: () => ({
        type: Types.CART_LIST,
    })
}