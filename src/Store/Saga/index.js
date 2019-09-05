import { all, fork } from 'redux-saga/effects'
import productsSaga from './productsSaga'

export default function* rootSaga() {
    yield all([
        fork(productsSaga)
    ])
}