import { useEffect, useState } from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginFormPage from "./components/LoginFormPage";
import SignUpFormPage from './components/SignUpFormPage';
import Navigation from './components/Navigation';
import * as sessionActions from './store/session'

function App() {
  let dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  // const activeSession = useSelector(state => state.session.user);
  // let sessionStyle = !activeSession ?
  //   { display: 'block' } : { visibility: 'hidden' };

  // sessionActions.restoreSession
  // returns user obj if user is found
  // else returns an empty object

  useEffect(() => {
    dispatch(sessionActions.restoreSession())
      .then(() => setIsLoaded(true));
  }, [dispatch])

  if (!isLoaded) return <div>Loading...</div>

  return isLoaded && (
    <>
      <h1>Hello from App</h1>
      <Navigation />

      <Switch>
        <Route exact path='/login' component={LoginFormPage} />
        <Route exact path='/signup' component={SignUpFormPage} />
      </Switch>
    </>
  );
};

export default App;
