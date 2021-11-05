import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

export function WarningDialog({ warning, handleClose, handleDelete }) {

    return (
        <Dialog
            open={warning}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Eliminar usuario
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Una vez eliminado el usuario, no podrá volver a habilitarlo. ¿Está seguro que desea continuar?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>
                    Cancelar
                </Button>
                <Button onClick={handleDelete} autoFocus color='secondary'>
                    Eliminar
                </Button>
            </DialogActions>
        </Dialog>
    );
}