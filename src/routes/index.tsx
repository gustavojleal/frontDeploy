import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import CreateNewAccount from '../pages/CreateNewAccount'
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';

import Profile from '../pages/Profile';
import ListProjects from '../pages/ListProjects';
import NewProject from '../pages/NewProject';
import InviteFriend from '../pages/InviteFriend'

import Dashboard from '../pages/Dashboard';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/SignUp" component={SignUp} />
      <Route path="/reset-password" component={ResetPassword} />
      <Route path="/forgot-password" component={ForgotPassword} />
      <Route path="/CreateNewAccount" component={CreateNewAccount} />
      <Route path="/profile" component={Profile} isPrivate /> 
      <Route path="/projects" component={ListProjects} isPrivate />
      <Route path="/newproject" component={NewProject} isPrivate />
      <Route path="/InviteFriend" component={InviteFriend} isPrivate />
      

      <Route path="/dashboard" component={Dashboard} isPrivate />
    </Switch>
  );
};

export default Routes;
