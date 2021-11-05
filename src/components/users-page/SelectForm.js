import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { makeStyles } from '@material-ui/core/styles';


const useStyle = makeStyles(theme => ({
    fieldset: {
        marginTop: '32px'
    }
}));

export function SelectForm({ name, data, onChange, value }) {

    const classes = useStyle();

    return (
        <FormControl className={classes.fieldset} component="fieldset">
            <FormLabel component="legend">Perfil</FormLabel>
            <RadioGroup
                aria-label="profile"
                defaultValue={value || 'Básico'}
                onChange={onChange}
            >
                {data.map(
                    (val) => (
                        <FormControlLabel
                            key={val}
                            value={val}
                            name={name}
                            control={<Radio />}
                            label={val} />
                    )
                )}
            </RadioGroup>
        </FormControl >
    );
}