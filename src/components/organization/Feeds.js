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
import Typography from '@material-ui/core/Typography';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';

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
    contentColumn: {
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
    sectionHeader: {
        fontSize: '1rem', // 16px
        fontWeight: 500,
        marginLeft: '1rem',
        marginBottom: '0.5rem',
        width: '100%'
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
    const [ig_feeds, setIGFeeds] = React.useState([]);
    const [tw_feeds, setTwFeeds] = React.useState([]);

    React.useEffect(() => {
        // get feeds (or empty array if there are no feeds) from local storage
        const storedIGFeeds = JSON.parse(
            localStorage.getItem('igFeeds') || '[]'
        );
        // display retrieved feeds on the screen
        setIGFeeds(storedIGFeeds);
    }, [setIGFeeds]);

    React.useEffect(() => {
        // get feeds (or empty array if there are no feeds) from local storage
        const storedTwFeeds = JSON.parse(
            localStorage.getItem('twFeeds') || '[]'
        );
        // display retrieved feeds on the screen
        setTwFeeds(storedTwFeeds);
    }, [setTwFeeds]);

    // Handle creating an IG Feed and adding it
    const [igHandle, setIGHandle] = React.useState('')
    const [twHandle, setTwHandle] = React.useState('')
    const [ig_Tag, set_igTag] = React.useState('')
    const [tw_Tag, set_twTag] = React.useState('')

    const igHandleChange = e => setIGHandle(e.target.value);
    const twHandleChange = e => setTwHandle(e.target.value);
    const igTagHandleChange = e => set_igTag(e.target.value);
    const twTagHandleChange = e => set_twTag(e.target.value);
    // const handleKeywordChange = e => setIGHandle(e.target.value);
    const handleAddIGFeed = e => {
        if(igHandle === ''){
            console.log('An Instagram Handle is required')
        } else{
            if(ig_Tag === '') {
                console.log('A #tag is required');
            } else {
                setIGFeeds([
                    ...ig_feeds,
                    ig_Tag
                ]);
                set_igTag('');
            }
        }
    }

    // const handleKeywordChange = e => setIGHandle(e.target.value);
    const handleAddTwFeed = e => {
        if(twHandle === ''){
            console.log('A Twitter Handle is required')
        } else{
            if(tw_Tag === '') {
                console.log('A #tag is required');
            } else {
                setTwFeeds([
                    ...tw_feeds,
                    tw_Tag
                ]);
                set_twTag('');
            }
        }
    }

    // Handle chip deletion
    const handleIGDelete = chipToDelete => () => {
        let newIGFeeds = [...ig_feeds];
        const chipIndex = newIGFeeds.findIndex(newIGFeeds => newIGFeeds === chipToDelete);        
        newIGFeeds.splice(chipIndex, 1);
        setIGFeeds(newIGFeeds);
        
    };

    const handleTwDelete = chipToDelete => () => {
        let newTwFeeds = [...tw_feeds];
        const chipIndex = newTwFeeds.findIndex(newTwFeeds => newTwFeeds === chipToDelete);        
        newTwFeeds.splice(chipIndex, 1);
        setTwFeeds(newTwFeeds);
        
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
                    <div className={classes.contentColumn}>
                        <Typography className={classes.sectionHeader}>INSTAGRAM</Typography>

                        <div className={classes.summary}>
                            <InstagramIcon />
                            <FormControl className={classes.selectFormCtrl}>
                                <TextField
                                    label={l('feedsHandle')}
                                    margin="normal"
                                    value={igHandle}
                                    onChange={igHandleChange}
                                />
                            </FormControl>
                        </div>
                        <div className={classes.summary}>
                            {ig_feeds.map(word => {                    
                                return (
                                <Chip
                                    key={word.index}
                                    label={word}
                                    onDelete={handleIGDelete(word)}
                                    className={classes.chip}
                                />
                                );
                            })}
                        </div>
                        <div className={classes.summary}>
                            <FormControl className={classes.selectFormCtrl}>
                                <TextField
                                    label={l('addFeedsLabelText')}
                                    margin="normal"
                                    value={ig_Tag}
                                    onChange={igTagHandleChange}
                                />
                            </FormControl>
                            <Button 
                                className={classes.buttonAdd} 
                                color='primary'
                                onClick={handleAddIGFeed} >
                                {l('addButtonText')}
                            </Button>
                        </div>
                    </div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <div className={classes.contentColumn}>
                        <Typography className={classes.sectionHeader}>TWITTER</Typography>

                        <div className={classes.summary}>
                            <TwitterIcon />
                            <FormControl className={classes.selectFormCtrl}>
                                <TextField
                                    label={l('feedsHandle')}
                                    margin="normal"
                                    value={twHandle}
                                    onChange={twHandleChange}
                                />
                            </FormControl>
                        </div>
                        <div className={classes.summary}>
                            {tw_feeds.map(word => {                    
                                return (
                                <Chip
                                    key={word.index}
                                    label={word}
                                    onDelete={handleTwDelete(word)}
                                    className={classes.chip}
                                />
                                );
                            })}
                        </div>
                        <div className={classes.summary}>
                            <FormControl className={classes.selectFormCtrl}>
                                <TextField
                                    label={l('addFeedsLabelText')}
                                    margin="normal"
                                    value={tw_Tag}
                                    onChange={twTagHandleChange}
                                />
                            </FormControl>
                            <Button 
                                className={classes.buttonAdd} 
                                color='primary'
                                onClick={handleAddTwFeed} >
                                {l('addButtonText')}
                            </Button>
                        </div>
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    )
}

