import { all, call, put, takeLatest } from 'redux-saga/effects'
import api from '../../Services/Api'
import { Creators, Types } from '../Ducks/productsReducer'

function* getProducts() {
    try {
        const response = yield call(api.get, '/products')
        if (response.status !== 200) throw new Error(response)
        yield put(Creators.getProductsRequestSuccess({ products: response.data }))
    } catch (e) {
        yield put(Creators.getProductsRequestFailure())
    }
}

function* getProductId( params ) {
    try {
        const { payload } = params
        const response = yield call(api.get, `/products/${payload}`)
        if(response.status !== 200) throw new Error(response)
        yield put(Creators.getProductIdRequestSuccess(response.data))
    } catch (e) {
        yield put(Creators.getProductIdRequestFailure())
    }
}

export default function* productsSaga() {
    yield all([
        takeLatest(Types.PRODUCTS_REQUEST, getProducts),
        takeLatest(Types.PRODUCTID_REQUEST, getProductId)
    ])
}