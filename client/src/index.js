import React from 'react';
import ReactDOM from 'react-dom';
import {createBrowserHistory} from 'history';
import {Router, Route, Switch, Redirect} from 'react-router-dom';
//! Data providers
import {Provider as DashboardProvider} from './features/dashboard/state/DashboardContext';
import {Provider as ProfileProvider} from './features/profile/createprofile/state/ProfileContext';
import {Provider as ProfileEditProvider} from './features/profile/editprofile/state/ProfileEditContext';

// core components
import Admin from 'layouts/Admin.js';
import 'index.css';

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <DashboardProvider>
      <ProfileProvider>
        <ProfileEditProvider>
          <Switch>
            <Route path="/admin" component={Admin} />
            <Redirect from="/" to="/admin/dashboard" />
          </Switch>
        </ProfileEditProvider>
      </ProfileProvider>
    </DashboardProvider>
  </Router>,
  document.getElementById('root'),
);
