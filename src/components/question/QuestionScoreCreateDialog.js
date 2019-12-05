/**
 * @file Handles picking a name for a new score.
 * @author Tuomas Pöyry <tuomas.poyry@metropolia.fi>
 */

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import Locale from '../Locale';
import Translation from './questionLocale.json';

const l = Locale(Translation);

let setOpenState = null;
let setInputState = null;
let resolveDialog = null;

/*
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 300
  },
  listSection: {
    backgroundColor: 'inherit'
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0
  },
  nested: {
    paddingLeft: theme.spacing(4)
  }
}));
*/

const closeDialog = action => {
  setOpenState(false);
  if (resolveDialog) {
    resolveDialog(action);
    resolveDialog = null;
  }
};

const openDialog = () =>
  new Promise(resolve => {
    setInputState('');
    resolveDialog = resolve;
    setOpenState(true);
  });

const QuestionScoreCreateDialog = () => {
  // const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('');

  setOpenState = setOpen;
  setInputState = setName;

  const handleClose = action => () => {
    if (action === 'confirm') {
      closeDialog(name);
    } else {
      closeDialog(null);
    }
  };

  const handleNameChange = event => {
    setName(event.target.value);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose(null)}
      aria-labelledby="input-dialog-title"
      aria-describedby="input-dialog-description"
      maxWidth="xs"
      fullWidth
      fullHeight
    >
      <DialogTitle id="input-dialog-title">{l`questionScoreCreateTitle`}</DialogTitle>
      <DialogContent>
        <DialogContentText id="input-dialog-description">
          <Typography variant="body2">
            {l`questionScoreCreateDescription`}
          </Typography>
        </DialogContentText>

        <TextField
          autoFocus
          id="name"
          label={l`questionScoreCreateNameLabel`}
          fullWidth
          value={name}
          onChange={handleNameChange}
          variant="outlined"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose('cancel')} color="primary">
          {l`dialogButtonCancel`}
        </Button>
        <Button
          onClick={handleClose('confirm')}
          variant="outlined"
          color="primary"
          autoFocus
        >
          {l`dialogButtonConfirm`}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default QuestionScoreCreateDialog;
export { openDialog, closeDialog };
