/**
 * @file Generic confirmation dialog that can be called from anywhere and uses promises for response handling.
 * @author Tuomas Pöyry <tuomas.poyry@metropolia.fi>
 */

import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Translation from './question/questionLocale.json';
import Locale from './Locale';

const l = Locale(Translation);

let setOpenState = null;
let setContentState = null;
let resolveDialog = null;
let data = { title: 'Unknown', description: 'An error occurred.' };

const closeDialog = action => {
  setOpenState(false);
  if (resolveDialog) {
    resolveDialog(action);
    resolveDialog = null;
  }
};

const openDialog = ({ title = l`dialogTitleDefault`, description }) =>
  new Promise(resolve => {
    data = { title, description };
    setContentState(data);
    resolveDialog = resolve;
    setOpenState(true);
  });

const ConfirmationDialog = () => {
  const [open, setOpen] = React.useState(false);
  const [content, setContent] = React.useState(data);

  setOpenState = setOpen;
  setContentState = setContent;

  const handleClose = action => () => {
    closeDialog(action);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose('dismiss')}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{content.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {content.description}
        </DialogContentText>
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

export default ConfirmationDialog;
export { openDialog, closeDialog };
