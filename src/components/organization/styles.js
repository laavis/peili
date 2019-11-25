import { makeStyles } from '@material-ui/styles';

const styles = makeStyles(theme => ({
  section: {
    marginBottom: '2rem',
    display: 'flex',
    flexDirection: 'column'
  },
  sectionTitle: {
    fontSize: '1.125rem', // 18px
    fontWeight: 600,
    marginLeft: '1rem',
    marginBottom: '0.5rem'
  },
  expansionPanel: {
    padding: '0 1rem 0 1rem'
  },
  expansionPanelPaddingReset: {
    padding: '0',
    margin: '0'
  },
  summaryWrapper: {
    flexDirection: 'column'
  },
  detailsWrapper: {
    marginBottom: '20px'
  },
  selectFormControl: {
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
  }
}));

export default styles;
