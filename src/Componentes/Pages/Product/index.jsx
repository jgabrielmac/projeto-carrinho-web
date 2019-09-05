import React from 'react'
import Footer from '../../Footer'
import { useDispatch, useSelector } from 'react-redux';
import { Creators } from '../../../Store/Ducks/productsReducer';
import { Creators as CarrinhoCreator } from '../../../Store/Ducks/carrinhoReducer';
import { makeStyles } from '@material-ui/core/styles';
import {
    Typography,
    Button,
    Box,
} from '@material-ui/core';
import { Loading } from '../../Loading';
import { WarningDialog, WarningStockDialog } from '../../WarningDialog';
import { BuyMessageSnackbars } from '../../Snackbars';

const useStyles = makeStyles(theme => ({
    media: {
        height: 600,
        width: 600,
        marginRight: 130
    },
    button: {
        width: '100%',
        height: 80,
        marginTop: 15,
        backgroundColor: '#034f84',
        color: 'white',
        "&:hover": {
            color: '#034f84'
        }
    },
    title: {
        color: 'black',
        textAlign: 'justify'
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    }
}));

const Product = (props) => {
    const dispatch = useDispatch()
    const { product, productLoading, productError } = useSelector(state => state.products)
    const { carrinho } = useSelector(state => state.carrinho)
    const [localState, setLocalState] = React.useState({
        stockError: false,
        openBuyMessage: false
    })
    const { stockError, openBuyMessage } = localState

    const handleClose = () => {
        setLocalState({
            stockError: false
        })
    }

    const handleCloseBuyMessage = () => {
        setLocalState({
            openBuyMessage: false
        })
    }

    React.useEffect(() => {
        dispatch(Creators.getProductIdRequest(props.match.params.id))
    }, [dispatch, props.match.params.id])

    const Comprar = (id) => {
        const compraSelecionada = carrinho.filter(obj => obj.id === id)

        if (compraSelecionada.length >= product.quantity) {
            setLocalState({
                ...localState,
                stockError: true
            })
        } else {
            dispatch(CarrinhoCreator.addCart(product))
            setLocalState({
                openBuyMessage: true
            })
        }
    }

    const classes = useStyles()

    return (
        <Box className={classes.container}>
            {productLoading ? <Loading /> :
                <>
                    <Box>
                        <img alt="" className={classes.media} src={product.picture} />
                    </Box>
                    <Box style={{ maxWidth: 600 }}>
                        <Typography variant="h6" className={classes.title}>
                            <b>Nome:</b> {product.title}
                        </Typography>
                        <br />
                        <Typography variant="h6" color="textSecondary" className={classes.title}>
                            <b>Descrição:</b> {product.description}
                        </Typography>
                        <Typography variant="h6" className={classes.title}>
                            <b>Memória:</b> {product.memory}
                        </Typography>
                        <Typography variant="h6" className={classes.title}>
                            <b>Chip:</b> {product.chipType}
                        </Typography>
                        <br />
                        <Typography variant="h5">
                            {`R$ ${product.price}`}
                        </Typography>
                        <Button variant="outlined" color="primary" className={classes.button} onClick={() => Comprar(product.id)}> Comprar </Button>
                    </Box>
                    <Footer />
                </>
            }
            {productError ? <WarningDialog /> : null}
            {stockError ? <WarningStockDialog title="Sinto Muito" message="Estoque Indisponível No Momento" handleClose={handleClose} /> : null}
            {openBuyMessage ? <BuyMessageSnackbars openBuyMessage handleCloseBuyMessage={handleCloseBuyMessage} /> : null}
        </Box>
    )
}

export default Product