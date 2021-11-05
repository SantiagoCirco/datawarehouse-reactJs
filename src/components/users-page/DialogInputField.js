import TextField from '@material-ui/core/TextField';

export function DialogInputField(props) {
    return (
        <TextField
            {...props}
            name={props.id}
            margin="normal"
            fullWidth
        />
    );
}