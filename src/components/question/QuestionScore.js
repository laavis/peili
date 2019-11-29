import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AddIcon from '@material-ui/icons/Add';
import AttachmentIcon from '@material-ui/icons/Attachment';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import React from 'react';
import uuid from 'uuid/v4';
import Locale from '../Locale';
import Translation from './questionLocale.json';
import { QuestionScoreList } from './QuestionScoreList';
import QuestionScoreSourceDialog, * as sourceDialog from './QuestionScoreSourceDialog';
import { handleSurveyQuestionUpdate } from './QuestionUtil';

const l = Locale(Translation);

export const QuestionScore = ({ survey, index, question, setSurvey }) => {
  const [menuAnchorEl, setMenuAnchorEl] = React.useState(null);

  /*
  const handleSourceUpdate = source => {
    setSurvey(
      handleSurveyQuestionUpdate(survey, index, {
        source
      })
    );
  };
  */

  const handleScoreUpdate = score => {
    setSurvey(
      handleSurveyQuestionUpdate(survey, index, {
        score
      })
    );
  };

  /*
  const handleMenuClick = event => {
    setMenuAnchorEl(event.currentTarget);
  };
  */

  const handleMenuClose = action => async () => {
    setMenuAnchorEl(null);

    if (action === 'variable') {
      const name = await sourceDialog.openDialog();
      if (!name) return;

      handleScoreUpdate([...question.score, [`id.${uuid()}.${name}`]]);
    }
  };

  return (
    <>
      <Box>
        <Box>
          <QuestionScoreList
            survey={survey}
            index={index}
            questionId={question.id}
            scoreList={question.score}
            setSurvey={setSurvey}
          />

          <Chip
            icon={<AddIcon />}
            label={l`questionScoreVariableCreateButton`}
            onClick={handleMenuClose('variable')}
            // onDelete={() => {}}
            variant="outlined"
            style={{ marginRight: 8 }}
          />

          <Chip
            icon={<DonutLargeIcon />}
            label="Modify User Meters"
            onClick={handleMenuClose('meter')}
            // onDelete={() => {}}
            variant="outlined"
          />
        </Box>
      </Box>

      <Menu
        id="simple-menu"
        anchorEl={menuAnchorEl}
        keepMounted
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose(null)}
        style={{ zIndex: 2000 }}
      >
        <MenuItem onClick={handleMenuClose('variable')}>
          <ListItemIcon>
            <AttachmentIcon />
          </ListItemIcon>
          Create Score
        </MenuItem>
        <MenuItem onClick={handleMenuClose('meter')}>
          <ListItemIcon>
            <DonutLargeIcon />
          </ListItemIcon>
          Move Meter
        </MenuItem>
      </Menu>

      <QuestionScoreSourceDialog
        survey={survey}
        index={index}
        question={question}
      />
    </>
  );
};
