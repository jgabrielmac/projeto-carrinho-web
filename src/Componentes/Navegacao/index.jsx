import React from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from '../../Pages/Home'
import Product from '../Pages/Product'
import CartProduct from '../Pages/CartProduct'
import Cart from '../../Pages/Cart'
import CartForm from '../Pages/CartForm'
import IconeCarrinho from '../IconeCarrinho'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import '../../Estilos/Navegacao.css'

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1.5),
    },
}));

export default () => {
    const classes = useStyles()

    return (
        <Router>
            <div className="header">
                <div className="buttonsDeNavegacao">
                    <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
                        <Button variant="contained" className={classes.button}>Início</Button>
                    </Link>
                    <Link to="/carrinho/">
                        <IconeCarrinho />
                    </Link>
                </div>
            </div>
            <Route path="/" exact component={Home} />
            <Route path="/products/:id/" component={Product} />
            <Route path="/carrinho/" component={Cart} />
            <Route path="/product/:id/" component={CartProduct} />
            <Route path="/finalizar-pedido/" component={CartForm} />
        </Router>
    )
}
