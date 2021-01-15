import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Home from 'Pages/Home';
import Login from 'Pages/Login/index';
import Product from 'Componentes/Pages/Product';
import CartProduct from 'Componentes/Pages/CartProduct';
import Cart from 'Pages/Cart';
import CartForm from 'Componentes/Pages/CartForm';
import IconeCarrinho from 'Componentes/IconeCarrinho';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import 'Estilos/Navegacao.css';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1.5),
  },
}));

export default () => {
  const classes = useStyles();

  return (
    <Router>
      <div className="header">
        <div className="buttonsDeNavegacao">
          <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
            <Button variant="contained" className={classes.button}>
              Início
            </Button>
          </Link>
          <Link to="/login" style={{ textDecoration: 'none', color: 'black' }}>
            <Button variant="contained" className={classes.button}>
              Entrar
            </Button>
          </Link>
          <Link to="/carrinho/">
            <IconeCarrinho />
          </Link>
        </div>
      </div>
      <Route path="/" exact component={Home} />
      <Route path="/login" exact component={Login} />
      <Route path="/products/:id/" component={Product} />
      <Route path="/carrinho/" component={Cart} />
      <Route path="/product/:id/" component={CartProduct} />
      <Route path="/finalizar-pedido/" component={CartForm} />
    </Router>
  );
};
