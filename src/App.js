import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Switch, Route, Redirect } from "react-router-dom"
import Home from './pages/Home'
import Profile from './pages/Profile'
import Authentication from './pages/Authentication'
import Layout from './components/layout/Layout';
import NoFoundPage from './pages/NoFoundPage'
import { checkTokenIsValid } from './store/login-actions';
import { retrieveStoredToken } from './utils/calculate-duration';

function App() {
  const token = useSelector((state) => state.login.token)
  const dispatch = useDispatch()

  const tokenData = retrieveStoredToken()

  const userIsLoggedIn = !!token

  useEffect(() => {
    if(tokenData) {
      dispatch(checkTokenIsValid())
    }
    
  }, [dispatch, tokenData])

  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <Home />
        </Route>
        {!userIsLoggedIn && <Route path='/auth'>
          <Authentication />
        </Route>}
        {userIsLoggedIn && <Route path='/profile'>
          <Profile />
        </Route>}
       {!userIsLoggedIn && <Route path='/profile'>
          <Redirect to='/auth'/>
        </Route>}
        <Route path='*'>
            <NoFoundPage />
        </Route>
      </Switch>
    </Layout>
  );
}
export default App;