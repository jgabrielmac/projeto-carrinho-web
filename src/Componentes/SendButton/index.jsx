import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";

const useStyles = makeStyles((theme) => ({
  rightIcon: {
    marginLeft: theme.spacing(3),
  },
}));

export default function SendButton({ buttonMessage }) {
  const classes = useStyles();

  return (
    <Button
      variant="contained"
      color="primary"
      style={{ marginTop: 40, marginBottom: 40 }}
    >
      {buttonMessage}
      <Icon className={classes.rightIcon}>send</Icon>
    </Button>
  );
}
