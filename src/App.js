import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Header } from './components/Header';
import { SpecialistDashboard } from './views/SpecialistDashboard';
import { OrganizationPanel } from './views/OrganizationPanel';
import { SurveyEdit } from './views/SurveyEdit';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#5A5C9C'
    }
  }
});

const App = () => (
  <ThemeProvider theme={theme}>
    <Router>
      <div style={{ backgroundColor: '#EEE' }}>
        <Header />

        <Switch>
          <Route path='/test'>
            <div>This is a test page.</div>
          </Route>
          <Route path='/survey'>
            <SurveyEdit />
          </Route>
          <Route path='/specialist'>
            <SpecialistDashboard />
          </Route>
          <Route path='/organization'>
            <OrganizationPanel />
          </Route>
        </Switch>
      </div>
    </Router>
  </ThemeProvider>
);

export default App;
