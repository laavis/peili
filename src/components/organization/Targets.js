// Target words eg. loneliness, exclusion etc, displayed as chips

// Component for target groups eg. criteria: Age from 18 to 30
// One criteria per component

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    chip: {
        margin: theme.spacing(0.5),
    },
}));

export default () => {
    const classes = useStyles();
    const [age, setAge] = React.useState('');    

    const handleChange = e => {
        setAge(e.target.value);
    };

    const [chipData, setChipData] = React.useState([
        { key: 0, label: 'Loneliness' },
        { key: 1, label: 'Exclusion' },
        { key: 2, label: 'Social Challenges' },
        { key: 3, label: 'Mental Health Problems' },
        { key: 4, label: 'Depression' },
    ]);

    const handleDelete = chipToDelete => () => {    
        setChipData(chips => chips.filter(chip => chip.key !== chipToDelete.key));
    };

    return (
        <div>
            <div>
                {chipData.map(data => {                    
                    return (
                    <Chip
                        key={data.key}
                        label={data.label}
                        onDelete={handleDelete(data)}
                        className={classes.chip}
                    />
                    );
                })}
            </div>
        </div>
    )
}

