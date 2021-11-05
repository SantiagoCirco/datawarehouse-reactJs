import { useContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { AuthContext } from './context/auth-context';
import { NavBar } from './components/NavBar';
import { LoginPage } from './components/login-page/LoginPage';
import { ContactsPage } from './components/contacts-page/ContactsPage';
import { CompaniesPage } from './components/companies-page/CompaniesPage';
import { LocationPage } from './components/location-page/LocationPage';
import { UsersPage } from './components/users-page/UsersPage';



export default function App() {

  const authContext = useContext(AuthContext);


  return (
    <>
      <NavBar />
      {!authContext.isLoggedIn && <Redirect to='/login' />}
      <Switch>
        <Route path='/login' exact>
          {
            !authContext.isLoggedIn ?
              <LoginPage /> :
              <Redirect to='/contacts' />
          }
        </Route>
        <Route path='/contacts' exact><ContactsPage /></Route>
        <Route path='/companies' exact> <CompaniesPage /></Route>
        <Route path='/users' exact><UsersPage /></Route>
        <Route path='/location' exact><LocationPage /></Route>
        <Route path='*'>
          {
            authContext.isLoggedIn ?
              <Redirect to='/contacts' /> :
              <Redirect to='/login' />
          }
        </Route>
      </Switch>
    </>
  );
}