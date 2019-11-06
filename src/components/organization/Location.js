import { ExpansionPanelDetails, ExpansionPanelSummary } from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import React from 'react';

const useStyles = makeStyles(theme => ({
  wrapper: {
    marginBottom: 8
  },
  summary: {
    display: 'flex',
    flexDirection: 'column'
  },
  city: {
    fontSize: '0.625rem', // 10px
    fontWeight: 600,
    letterSpacing: '1.5px',
    lineHeight: 2
  },
  address: {
    fontWeight: 600,
    fontSize: '1.25rem', // 20px
    letterSpacing: '0.15px',
    lineHeight: 1
  },
  disabled: {
    backgroundColor: 'white'
  }
}));

export const LocationCard = ({ city, address, editable }) => {
  const classes = useStyles();
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
            <Typography className={classes.city} variant='overline'>
              {city}
            </Typography>
            <Typography className={classes.address}>{address}</Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails></ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
};
