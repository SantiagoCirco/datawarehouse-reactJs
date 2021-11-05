import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';


export function UserDialog({ children, open, onClose, onSubmit, text }) {

    const { title, subtitle, buttonText } = text;

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{subtitle}</DialogContentText>
                {children}
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={onClose}>
                    Cancelar
                </Button>
                <Button
                    color='primary'
                    onClick={onSubmit}>
                    {buttonText}
                </Button>
            </DialogActions>
        </Dialog>
    );
}