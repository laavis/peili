/**
 * @file Scoring functionality for a single question. Will handle displaying and adding scores.
 * @author Tuomas Pöyry <tuomas.poyry@metropolia.fi>
 */

import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import AddIcon from '@material-ui/icons/Add';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import React from 'react';
import uuid from 'uuid/v4';
import Locale from '../Locale';
import Translation from './questionLocale.json';
import QuestionScoreCreateDialog, * as sourceDialog from './QuestionScoreCreateDialog';
import { QuestionScoreList } from './QuestionScoreList';

const l = Locale(Translation);

export const SurveyScore = ({ survey, setSurvey }) => {
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
    setSurvey({ ...survey, score });
  };

  /*
  const handleMenuClick = event => {
    setMenuAnchorEl(event.currentTarget);
  };
  */

  const handleMenuClose = action => async () => {
    if (action === 'variable') {
      const name = await sourceDialog.openDialog();
      if (!name) return;

      handleScoreUpdate([...survey.score, [`id.${uuid()}.${name}`]]);
    }
  };

  return (
    <>
      <Box>
        <Box>
          <QuestionScoreList
            survey={survey}
            index={null}
            scoreList={survey.score}
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

      <QuestionScoreCreateDialog survey={survey} />
    </>
  );
};
