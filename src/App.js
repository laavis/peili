import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import { Header } from './components/Header';
import { SpecialistDashboard } from './views/SpecialistDashboard';
import { OrganizationPanel } from './views/OrganizationPanel';
import { SurveyEdit } from './views/SurveyEdit';

const App = () => (
  <Router>
    <div style={{ backgroundColor: '#EEE' }}>
      <Header />

      <Switch>
        <Route path="/test">
          <div>This is a test page.</div>
        </Route>
        <Route path="/survey">
          <SurveyEdit />
        </Route>
        <Route path="/specialist">
          <SpecialistDashboard />
        </Route>
        <Route path="/organization">
          <OrganizationPanel />
        </Route>
      </Switch>
    </div>
  </Router>
);

export default App;
