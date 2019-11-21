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
    lineHeight: 2
  },
  removeIconButton: {
    width: 'fit-content',
    height: 'fit-content',
    alignSelf: 'flex-end'
  }
}));

export default styles;
