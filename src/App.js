import React from 'react';
import Navegacao from './Componentes/Navegacao';
import configureStore from './Store'
import { Provider } from 'react-redux'

const { store } = configureStore()

function App() {
  return (
    <Provider store={store}>
      <Navegacao />
    </Provider>
  );
}

export default App;
