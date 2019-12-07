/**
 * @file The Login view page
 * @author Benard Gathimba <benard.gathimba@metropolia.fi>
 */

import React, { useContext, useState } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import TextField from '../components/CachedInput';
import Locale from '../components/Locale';
import Translation from '../components/question/questionLocale.json';
import { AuthContext } from '../context/auth';

const l = Locale(Translation);
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  section: {
    marginBottom: 15,
    width: 500
  },
  sectionTitle: {
    margin: 15
  },
  sectionPaper: {
    padding: '0 16px 16px 16px'
  },
  input: {
    width: '100%'
  },
  button: {
    width: '100%',
    marginTop: theme.spacing(2)
  }
}));

function Login(props) {
  const classes = useStyles();
  const context = useContext(AuthContext);

  let inputs = {
    username: '',
    password: ''
  };
  const [values, setValues] = useState({ ...inputs });
  const [errors, setErrors] = useState({});

  const onChange = input => value => {
    switch (input) {
      case 'username':
        return setValues({ ...values, username: value });
      case 'password':
        return setValues({ ...values, password: value });
      default:
        return values;
    }
  };

  const [loginUser] = useMutation(LOGIN_USER, {
    update(proxy, result) {
      // Parse the result to the app context
      context.login(result.data.login);
      // redirect user to home page based on user's type
      const category = result.data.login.type;
      switch (category) {
        case 'S':
          return props.history.push('/specialist');
        case 'O':
          return props.history.push('/organization');
        default:
          return props.history.push('/');
      }
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values
  });

  const onSubmit = event => {
    event.preventDefault();
    loginUser();
  };

  return (
    <div>
      <Grid container justify="center" spacing={2}>
        <Grid item>
          <Box className={classes.section}>
            <Typography variant="h6" className={classes.sectionTitle}>
              Login
            </Typography>
            <Paper className={classes.sectionPaper}>
              <form
                className={classes.container}
                onSubmit={onSubmit}
                noValidate
                autoComplete="off"
              >
                <TextField
                  className={classes.input}
                  label="Username"
                  margin="normal"
                  variant="outlined"
                  type="text"
                  error={errors.username ? true : false}
                  value={values.username}
                  onChange={onChange('username')}
                />
                <TextField
                  className={classes.input}
                  label="Password"
                  margin="normal"
                  variant="outlined"
                  type="password"
                  error={errors.password ? true : false}
                  value={values.password}
                  onChange={onChange('password')}
                />
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  size="large"
                  type="submit"
                >
                  Login
                </Button>
              </form>
              {Object.keys(errors).length > 0 && (
                <div>
                  <ul>
                    {Object.values(errors).map(value => (
                      <li key={value}>{value}</li>
                    ))}
                  </ul>
                </div>
              )}
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      type
      username
      email
      createdAt
      token
    }
  }
`;
export default Login;
