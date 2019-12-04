import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '../components/CachedInput';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import Locale from '../components/Locale';
import Translation from '../components/question/questionLocale.json';

const l = Locale(Translation);

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  input: {
    width: '100%'
  },
  button: {
    width: '100%',
    marginTop: theme.spacing(2)
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
  }
}));

function Register(props) {
  const classes = useStyles();
  let inputs = {
    type: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  const [values, setValues] = useState({ ...inputs });
  const [errors, setErrors] = useState({});

  const onChange = input => value => {
    switch (input) {
      case 'U':
        return setValues({ ...values, type: 'U' });
      case 'S':
        return setValues({ ...values, type: 'S' });
      case 'O':
        return setValues({ ...values, type: 'O' });
      case 'username':
        return setValues({ ...values, username: value });
      case 'email':
        return setValues({ ...values, email: value });
      case 'password':
        return setValues({ ...values, password: value });
      case 'confirmPassword':
        return setValues({ ...values, confirmPassword: value });
      default:
        return values;
    }
  };

  const [addUser] = useMutation(REGISTER_USER, {
    update(proxy, result) {
      const category = result.data.register.type;
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
    addUser();
  };

  return (
    <div>
      <Grid container justify="center" spacing={2}>
        <Grid item>
          <Box className={classes.section}>
            <Typography variant="h6" className={classes.sectionTitle}>
              Registration
            </Typography>
            <Paper className={classes.sectionPaper}>
              <form
                className={classes.container}
                onSubmit={onSubmit}
                noValidate
                autoComplete="off"
              >
                <br />
                <FormControl component="fieldset">
                  <FormLabel component="legend">Select User Group</FormLabel>
                  <RadioGroup aria-label="position" name="type">
                    <FormControlLabel
                      value="U"
                      control={<Radio color="primary" />}
                      label="User Registration"
                      labelPlacement="end"
                      onChange={onChange('U')}
                    />
                    <FormControlLabel
                      value="S"
                      control={<Radio color="primary" />}
                      label="Specialist Registration"
                      labelPlacement="end"
                      onChange={onChange('S')}
                    />
                    <FormControlLabel
                      value="O"
                      control={<Radio color="primary" />}
                      label="Organization Registration"
                      labelPlacement="end"
                      onChange={onChange('O')}
                    />
                  </RadioGroup>
                </FormControl>
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
                  label="Email"
                  margin="normal"
                  variant="outlined"
                  type="email"
                  error={errors.email ? true : false}
                  value={values.email}
                  onChange={onChange('email')}
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
                <TextField
                  className={classes.input}
                  label="Confirm Password"
                  margin="normal"
                  variant="outlined"
                  type="password"
                  error={errors.confirmPassword ? true : false}
                  value={values.confirmPassword}
                  onChange={onChange('confirmPassword')}
                />
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  size="large"
                  type="submit"
                >
                  Submit
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

const REGISTER_USER = gql`
  mutation register(
    $type: String!
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        type: $type
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      type
      username
      email
      createdAt
      token
    }
  }
`;

export default Register;
