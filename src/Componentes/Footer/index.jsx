import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #191970 30%, #0000CD 90%)',
    borderRadius: 3,
    color: 'white',
    height: 60,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    bottom: 0,
    width: '100%',
    marginTop: '4%',

  }
});

export default function ClassesNesting() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      FOOTER
    </div>
  );
}