import { ExpansionPanelSummary, withStyles } from '@material-ui/core';

export const StyledExpansionPanelSummary = withStyles({
  content: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    margin: 0
  }
})(ExpansionPanelSummary);
