import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as CarrinhoCreator } from 'Store/Ducks/carrinhoReducer';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Container,
} from '@material-ui/core';
import { RemoveMessageSnackbars } from 'Componentes/Snackbars';
import SendButton from 'Componentes/SendButton';
import { MessageContainer } from './styles';
import { WarningStockDialog } from 'Componentes/WarningDialog';
import { BuyMessageSnackbars } from 'Componentes/Snackbars';

const useStyles = makeStyles((theme) => ({
  media: {
    height: 100,
    width: 100,
    padding: '2em',
    margin: 30,
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  title: {
    fontSize: '16px',
    color: 'black',
  },
  noProdMessage: {
    fontSize: '50px',
    color: '#000080',
    fontWeight: 'bold',
  },
}));

const CartPage = () => {
  const dispatch = useDispatch();
  const { carrinho } = useSelector((state) => state.carrinho);
  const { product } = useSelector((state) => state.products);
  const [localState, setLocalState] = React.useState({
    openRemoveMessage: false,
    stockError: false,
    openBuyMessage: false,
  });
  const { openRemoveMessage, stockError, openBuyMessage } = localState;

  React.useEffect(() => {
    dispatch(CarrinhoCreator.cartList());
  }, [dispatch]);

  const Remover = (id) => {
    dispatch(CarrinhoCreator.removeCart(id));
    setLocalState({
      openRemoveMessage: true,
    });
  };

  const adicionar = (id) => {
    const compraSelecionada = carrinho.filter((obj) => obj.id === id);

    if (compraSelecionada.length >= product.quantity) {
      setLocalState({
        ...localState,
        stockError: true,
      });
    } else {
      dispatch(CarrinhoCreator.addCart(product));
      setLocalState({
        openBuyMessage: true,
      });
    }
  };

  // const noRepeatProds = [];
  // carrinho.forEach((prod) => {
  //   const prodIdIgual = noRepeatProds.filter(prodIdIgual =>  prod.id === prodIdIgual.id);
  //   if (prodIdIgual.length === 0) {
  //    return noRepeatProds.push(prod);
  //   }
  // });

  const handleCloseRemoveMessage = () => {
    setLocalState({
      openRemoveMessage: false,
    });
  };
  const handleCloseBuyMessage = () => {
    setLocalState({
      openBuyMessage: false,
    });
  };

  const handleClose = () => {
    setLocalState({
      stockError: false,
    });
  };
  const classes = useStyles();

  return (
    <Container maxWidth="xl" fixed>
      <Grid container spacing={5}>
        {carrinho.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={item.id}>
            <Card className={classes.card}>
              <CardActionArea>
                <Link
                  to={`/product/${item.id}`}
                  style={{ textDecoration: 'none' }}
                >
                  <CardMedia className={classes.media} image={item.picture} />
                  <CardContent>
                    <Typography gutterBottom className={classes.title}>
                      {item.title.substring(0, 70)}...
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {`R$ ${item.price}`}
                    </Typography>
                  </CardContent>
                </Link>
              </CardActionArea>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => Remover(item.id)}
                >
                  Remover
                </Button>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => adicionar(item.id)}
                >
                  Adicionar
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
        {openRemoveMessage ? (
          <RemoveMessageSnackbars
            openRemoveMessage
            handleCloseRemoveMessage={handleCloseRemoveMessage}
          />
        ) : null}
      </Grid>
      {carrinho.length > 0 ? (
        <Link
          to="/finalizar-pedido/"
          style={{ textDecoration: 'none', alignSelf: 'flex-end' }}
        >
          <SendButton buttonMessage={'Finalizar Pedido'} />
        </Link>
      ) : (
        <MessageContainer>
          <p className={classes.noProdMessage}>
            Você ainda não tem produtos no carrinho,
            <br />
            que tal dar uma olhada em nossa loja
          </p>
        </MessageContainer>
      )}
      {openBuyMessage && (
        <BuyMessageSnackbars
          openBuyMessage
          handleCloseBuyMessage={handleCloseBuyMessage}
        />
      )}
      {stockError && (
        <WarningStockDialog
          title="Sinto Muito"
          message="Estoque Indisponível No Momento"
          handleClose={handleClose}
        />
      )}
    </Container>
  );
};

export default CartPage;
