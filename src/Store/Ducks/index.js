import { combineReducers } from 'redux'
import productsReducer from './productsReducer'
import carrinhoReducer from './carrinhoReducer'

export default () => combineReducers({
    products: productsReducer,
    carrinho: carrinhoReducer,
})