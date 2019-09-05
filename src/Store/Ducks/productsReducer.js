
export const Types = {
    // PARA AS LISTAS DE PRODUTOS
    PRODUCTS_REQUEST: 'PRODUCTS_REQUEST',
    PRODUCTS_REQUEST_SUCCESS: 'PRODUCTS_REQUEST_SUCCESS',
    PRODUCTS_REQUEST_FAILURE: 'PRODUCTS_REQUEST_FAILURE',
    // PARA CADA PRODUTO
    PRODUCTID_REQUEST: 'PRODUCTID_REQUEST',
    PRODUCTID_REQUEST_SUCCESS: 'PRODUCTID_REQUEST_SUCCESS',
    PRODUCTID_REQUEST_FAILURE: 'PRODUCTID_REQUEST_FAILURE',
}

const initialState = {
    // PARA LISTA DOS PRODUTOS
    data: [],
    loading: false,
    error: false,
    // PARA CADA PRODUTO
    product: {},
    productLoading: false,
    productError: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        // PARA LISTA DOS PRODUTOS
        case Types.PRODUCTS_REQUEST:
            return {
                ...state,
                loading: true,
                error: false
            }
        case Types.PRODUCTS_REQUEST_SUCCESS:
            return {
                ...state,
                data: action.payload,
                loading: false,
                error: false
            }
        case Types.PRODUCTS_REQUEST_FAILURE:
            return {
                ...state,
                loading: false,
                error: true
            }
        // PARA CADA PRODUTO
        case Types.PRODUCTID_REQUEST:
            return {
                ...state,
                productLoading: true,
                productError: false
            }
        case Types.PRODUCTID_REQUEST_SUCCESS:
            return {
                ...state,
                product: action.payload,
                productLoading: false,
                productError: false
            }
        case Types.PRODUCTID_REQUEST_FAILURE:
            return {
                ...state,
                productLoading: false,
                productError: true
            }
        default:
            return state
    }
}

export const Creators = {
    // PARA LISTA DOS PRODUTOS
    getProductsRequest: () => ({
        type: Types.PRODUCTS_REQUEST,
    }),
    getProductsRequestSuccess: ({ products }) => ({
        type: Types.PRODUCTS_REQUEST_SUCCESS,
        payload: products
    }),
    getProductsRequestFailure: () => ({
        type: Types.PRODUCTS_REQUEST_FAILURE
    }),
    // PARA CADA PRODUTO
    getProductIdRequest: ( id ) => ({
        type: Types.PRODUCTID_REQUEST,
        payload: id
    }),
    getProductIdRequestSuccess: ( product ) => ({
        type: Types.PRODUCTID_REQUEST_SUCCESS,
        payload: product
    }),
    getProductIdRequestFailure: () => ({
        type: Types.PRODUCTID_REQUEST_FAILURE,
    })
}