import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
    width: 230
  },
  rightIcon: {
    marginLeft: theme.spacing(3),
  },
}));

export default function SendButton({ buttonMessage }) {
  const classes = useStyles();

  return (
    <div>
      <Button variant="contained" color="primary" className={classes.button}>
        {buttonMessage}
        <Icon className={classes.rightIcon}>send</Icon>
      </Button>
    </div>
  );
}