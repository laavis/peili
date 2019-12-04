import { makeStyles } from '@material-ui/styles';

const styles = makeStyles(theme => ({
  section: {
    marginBottom: '2rem',
    display: 'flex',
    flexDirection: 'column'
  },
  sectionTitleContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.5rem'
  },
  sectionTitle: {
    fontSize: '1.125rem', // 18px
    fontWeight: 600,
    marginLeft: '1rem',
    marginBottom: '0 !important'
  },
  expansionPanelContainer: {
    marginBottom: '8px'
  },
  expansionPanel: {
    padding: '1rem'
  },
  outerContainerPadding: {
    padding: '1rem',
    position: 'relative'
  },
  expansionPanelPaddingReset: {
    padding: '0 !important',
    margin: '0 !important'
  },
  summaryWrapper: {
    flexDirection: 'column'
  },
  detailsWrapper: {
    marginBottom: '20px'
  },
  formControl: {
    width: '100%'
  },
  buttonAdd: {
    width: 'fit-content',
    alignSelf: 'flex-end'
  },
  hide: {
    display: 'none'
  },
  textCapitalizedSmall: {
    fontSize: '0.625rem', // 10px
    fontWeight: 600,
    letterSpacing: '1.5px',
    lineHeight: 2,
    textTransform: 'uppercase'
  },
  textEmphasis: {
    fontWeight: 600,
    fontSize: '1.25rem', // 20px
    letterSpacing: '0.15px',
    lineHeight: 1
  },
  removeIconButton: {
    width: 'fit-content',
    height: 'fit-content',
    alignSelf: 'flex-end'
  },
  unsavedChangesIcon: {
    width: '8px',
    height: '8px',
    background: 'red',
    display: 'inline-block',
    marginLeft: '0.5rem',
    borderRadius: '100%'
  },
  expansionPanelRemoveActionContainer: {
    display: 'flex',
    alignSelf: 'flex-end',
    justifyContent: 'flex-end'
  },
  feedInnerContent: {
    padding: '0.5rem',
    paddingTop: '1rem'
  },
  removeIconButton2: {
    position: 'absolute',
    right: '1rem',
    bottom: '1rem'
  },
  smallSpacingLeft: {
    marginLeft: '0.5rem'
  },
  editSectionButton: {
    padding: '0.5rem'
  },
  infoTooltip: {
    position: 'absolute',
    right: '-1.5rem'
  },
  helpIcon: {
    width: '1rem',
    height: '1rem'
  },
  sectionButtonsContainer: {
    display: 'flex',
    justifyContent: 'space-between'
  }
}));

export default styles;
