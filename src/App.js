import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import { Header } from './components/Header';
import { SpecialistDashboard } from './views/SpecialistDashboard';

const App = () => (
  <Router>
    <div>
      <Header />

      <Switch>
        <Route path="/test">
          <div>This is a test page.</div>
        </Route>
        <Route path="/">
          <SpecialistDashboard />
        </Route>
      </Switch>
    </div>
  </Router>
);

export default App;
