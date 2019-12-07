/**
 * @file Redirects user's from login and register pages if already logged in
 * @author Benard Gathimba <benard.gathimba@metropolia.fi>
 */

import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { AuthContext } from './auth';

function AuthRoute({ component: Component, ...rest }) {
  const { user } = useContext(AuthContext);
  function handleRedirect() {
    const type = user.type;
    switch (type) {
      case 'S':
        return <Redirect to="/specialist" />;
      case 'O':
        return <Redirect to="/organization" />;
      default:
        return <Redirect to="/" />;
    }
  }

  return (
    <Route
      {...rest}
      render={props => (user ? handleRedirect() : <Component {...props} />)}
    />
  );
}

export default AuthRoute;
