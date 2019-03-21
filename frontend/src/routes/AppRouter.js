import CssBaseline from '@material-ui/core/CssBaseline';
import {createBrowserHistory} from 'history';
import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import Tasks from '../components/TasksPage';
import Users from '../components/UsersPage';
import Dashboard from '../components/DashboardPage';
import Login from "../components/LoginPage";
import NotFoundPage from '../components/NotFoundPage';
import Requisitions from '../components/RequisitionsPage';
import Stocks from '../components/StockPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
// import { MuiThemeProvider } from '@material-ui/core/styles';
// import theme from './theme/theme';

export const history = createBrowserHistory();

const AppRouter = () => (
    <Router history={history}>
        <div>
            <CssBaseline />
            <Switch>
                <PublicRoute path='/' component={Login} exact />
                <PrivateRoute path='/dashboard' component={Dashboard} exact />
                <PrivateRoute path='/requisitions' component={Requisitions} exact />
                <PrivateRoute path='/stock' component={Stocks} exact />
                <PrivateRoute path='/tasks' component={Tasks} exact />
                <PrivateRoute path='/users' component={Users} exact />
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    </Router>
)

export default AppRouter