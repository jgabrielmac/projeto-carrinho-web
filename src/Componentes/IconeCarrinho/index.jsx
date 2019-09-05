import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import { useSelector } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const StyledBadge = withStyles(theme => ({
  badge: {
    top: '50%',
    right: -3,
    // The border color match the background color.
    border: `2px solid ${
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[900]
      }`,
  },
}))(Badge);

export default () => {

  const { carrinho } = useSelector(state => state.carrinho)
  const badgeExibido = carrinho.length

  return (
    <IconButton aria-label="Cart" style={{ marginLeft: '3%', backgroundColor: 'white' }}>
      <StyledBadge badgeContent={badgeExibido} color="primary">
        <ShoppingCartIcon />
      </StyledBadge>
    </IconButton>
  )
}