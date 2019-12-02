import React from "react";
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    marginTop: 50,
    height: 400,
    width: 300,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

function Register() {
  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();

  let type= ''
  const handleClick = value => () => {
    type = value;
    console.log(type);
  };

  return (
    <Grid container>
      <Grid item container justify="center" spacing={spacing} xs={12}>
            <Grid item>
              <Paper 
                className={classes.paper} 
                value = 'U'
                onClick = {handleClick('U')}>
                  <p>User registration</p>    
                  <form>
                    <TextField
                      className={classes.input}
                      label = 'Bla'
                      variant="outlined"
                    />
                  </form>           
                </Paper>
            </Grid>
            <Grid item>
              <Paper className={classes.paper} 
                value = 'S'
                onClick = {handleClick('S')} />
            </Grid>
            <Grid item>
              <Paper className={classes.paper} 
                value = 'O'
                onClick = {handleClick('O')} />
            </Grid>
      </Grid>
    </Grid>
  );
}

export default Register;