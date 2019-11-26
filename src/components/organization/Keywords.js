// Card for adding custom keywords, kinda like hashtags

// Component for target groups eg. criteria: Age from 18 to 30
// One criteria per component

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ExpansionPanelDetails, ExpansionPanelSummary } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';

import Translation from './organizationLocale';
import Locale from '../Locale';
const l = Locale(Translation);


const useStyles = makeStyles(theme => ({
    wrapper: {
        marginBottom: 8
    },
    summary: {
        display: 'flex',
        flexDirection: 'row'
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    selectFormCtrl: {
        margin: theme.spacing(1),
        width: '45%'
    },
    buttonAdd: {
        marginLeft: theme.spacing(2)
    },
    chip: {
        margin: theme.spacing(0.5),
    }
}));

export default ({ editable }) => {
    const classes = useStyles();
    const [keywords, setKeywords] = React.useState([]);

    React.useEffect(() => {
        // get keywords (or empty array if there are no keywords) from local storage
        const storedKeywords = JSON.parse(
            localStorage.getItem('keywords') || '[]'
        );
        // display retrieved keywords on the screen
        setKeywords(storedKeywords);
    }, [setKeywords]);

    // Handle creating a keyword and adding it
    const [text, setText] = React.useState('')
    const handleKeywordChange = e => setText(e.target.value);
    const handleAddKeyword = e => {
        if(text === ''){
            console.log('A keyword is required')
        } else{
            setKeywords([
                ...keywords,
                text
            ]);
            setText('')
        }
    }

    // Handle chip deletion
    const handleDelete = chipToDelete => () => {
        let newKeywords = [...keywords];
        const chipIndex = newKeywords.findIndex(newKeywords => newKeywords === chipToDelete);        
        newKeywords.splice(chipIndex, 1);
        setKeywords(newKeywords);
        
    };

    // Editable
    const icon = editable ? <ExpandMoreIcon /> : null;
    const [expanded, setExpanded] = React.useState(false);
    const handleExpandedChange = (event, isExpanded) => {
        if (!editable) return;
        setExpanded(isExpanded);
    };

    return (
        <div className={classes.wrapper}>
            <ExpansionPanel expanded={editable ? expanded : false} onChange={handleExpandedChange}>
                <ExpansionPanelSummary expandIcon={icon} aria-controls='panel1bh-content' id='panel1bh-header'>
                    <div className={classes.summary}>
                            {keywords.map(word => {                    
                                return (
                                <Chip
                                    key={word.index}
                                    label={word}
                                    onDelete={handleDelete(word)}
                                    className={classes.chip}
                                />
                                );
                            })}
                    </div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Grid container direction = "row">
                        <FormControl className={classes.selectFormCtrl}>
                            <TextField
                                label={l('addKeywordLabelText')}
                                margin="normal"
                                value={text}
                                onChange={handleKeywordChange}
                            />
                        </FormControl>
                        <Button 
                            className={classes.buttonAdd} 
                            color='primary'
                            onClick={handleAddKeyword} >
                            {l('addButtonText')}
                        </Button>
                    </Grid>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    )
}

