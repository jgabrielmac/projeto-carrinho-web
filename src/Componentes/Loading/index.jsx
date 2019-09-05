import React from 'react'
import { CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    progress: {
        margin: theme.spacing(2),
    },
    container: {
        display: 'flex',
        flex: 1,
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center'
    }
}));

export const Loading = () => {
    const classes = useStyles()
    return (
        <div className={classes.container}>
            <CircularProgress className={classes.progress} style={{ marginBottom: 400, marginTop: 400 }} />
        </div>
    )
}