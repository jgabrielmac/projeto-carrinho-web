import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import {
    Container,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    useMediaQuery,
} from '@material-ui/core';

export const WarningDialog = ({ title, message }) => {

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm')); //para resposividade do aviso (caso dê problema)
    return (
        <Container style={{ height: 800 }}>
            <Dialog
                fullScreen={fullScreen}
                open={true}
                keepMounted
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {message}
              </DialogContentText>
                </DialogContent>
            </Dialog>
        </Container >
    )
}

export const WarningStockDialog = ({ title, message, handleClose }) => {

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm')); //para resposividade do aviso (caso dê problema)
    return (
        <Container style={{ height: 800 }}>
            <Dialog
                fullScreen={fullScreen}
                open={true}
                onClose={() => handleClose()}
                keepMounted
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {message}
              </DialogContentText>
                </DialogContent>
            </Dialog>
        </Container >
    )
}