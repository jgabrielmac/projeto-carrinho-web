import { createStore, compose, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga';
import reducers from './Ducks'
import rootSaga from './Saga';

const sagaMiddleware = createSagaMiddleware()
const middlewares = [sagaMiddleware];

export default function configureStore() {
    const store = createStore(
    reducers(),  
    compose(applyMiddleware(...middlewares))
    )
    sagaMiddleware.run(rootSaga)
    return { store }
}

