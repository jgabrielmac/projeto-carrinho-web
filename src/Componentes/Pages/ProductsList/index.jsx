import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Creators } from '../../../Store/Ducks/productsReducer';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Container,
} from '@material-ui/core';
import { Loading } from '../../Loading';
import { WarningDialog } from '../../WarningDialog';

const useStyles = makeStyles(theme => ({
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
    height: '80px',
    color: 'black'
  },
}));

const ListaProdutos = () => {

  const dispatch = useDispatch()
  const { data, error, loading } = useSelector(state => state.products)

  React.useEffect(() => {
    dispatch(Creators.getProductsRequest())
  }, [dispatch])

  const classes = useStyles()

  return (
    <Container maxWidth="xl" fixed>
      {loading ? <Loading /> : null}
      <Grid container spacing={5}>
        {data.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={item.id}>
            <Card className={classes.card}>
              <CardActionArea>
                <Link to={`/products/${item.id}`} style={{ textDecoration: 'none' }}>
                  <CardMedia className={classes.media} image={item.picture} />
                  <CardContent>
                    <Typography gutterBottom className={classes.title}>
                      {item.title.substring(0, 70)}...
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {`R$ ${item.price}`}
                    </Typography>
                  </CardContent>
                </Link>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
      {error ? <WarningDialog title="OPSSS..." message="Houve um problema. Por favor, recarregue a página" /> : null}
    </Container>
  )
}

export default ListaProdutos;
