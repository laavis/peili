import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Header } from './components/Header';
import { SpecialistDashboard } from './views/SpecialistDashboard';
import { OrganizationPanel } from './views/OrganizationPanel';
import { SurveyEdit } from './views/SurveyEdit';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';

import ConfirmationDialog from './components/ConfirmationDialog';
import { Home, Login, Register } from './pages';

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
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route path="/test">
            <div>This is a test page.</div>
          </Route>
          <Route path="/survey/:id" component={SurveyEdit} />
          <Route path="/survey" component={SurveyEdit} />
          <Route path="/specialist">
            <SpecialistDashboard />
          </Route>
          <Route path="/organization">
            <OrganizationPanel />
          </Route>
        </Switch>
      </div>
    </Router>

    <ConfirmationDialog />
  </ThemeProvider>
);

export default App;
