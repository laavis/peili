import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import { ExpansionPanelDetails, ExpansionPanelSummary } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { Targets } from './';

const useStyles = makeStyles(theme => ({
    wrapper: {
        marginBottom: 8
    },
    summary: {
        display: 'flex',
        flexDirection: 'column'
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default ({ editable }) => {
    const classes = useStyles();
    const [age, setAge] = React.useState('');  
    
    // Editable
    const icon = editable ? <ExpandMoreIcon /> : null;
    const [expanded, setExpanded] = React.useState(false);
    const handleExpandedChange = (event, isExpanded) => {
        if (!editable) return;
        setExpanded(isExpanded);
    };

    const handleChange = e => {
        setAge(e.target.value);
    };

    return (
        <div className={classes.wrapper}>
            <ExpansionPanel expanded={editable ? expanded : false} onChange={handleExpandedChange}>
                <ExpansionPanelSummary expandIcon={icon} aria-controls='panel1bh-content' id='panel1bh-header'>
                    <div className={classes.summary}>
                        <Targets />
                    </div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>                    
                            <FormControl className={classes.formControl} style={{ width: '100%' }}>
                                <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                                    Keyword
                                </InputLabel>
                                <Select
                                labelId="demo-simple-select-placeholder-label-label"
                                id="demo-simple-select-placeholder-label"
                                value={age}
                                onChange={handleChange}
                                displayEmpty
                                className={classes.selectEmpty}
                                >
                                <MenuItem value="">
                                    <em>Help center</em>
                                </MenuItem>
                                </Select>
                            </FormControl>
                            <Button className={classes.buttonAdd} color='primary'>
                                Add
                            </Button>
                </ExpansionPanelDetails>
                </ExpansionPanel>
        </div>
    )
}

