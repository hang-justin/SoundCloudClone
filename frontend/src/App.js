import { useEffect, useState } from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import LoginFormPage from "./components/LoginFormPage";
import SignUpFormPage from './components/SignUpFormPage';
import Navigation from './components/Navigation';
import UserHome from './components/UserHome';

import * as sessionActions from './store/session';
import * as playlistsActions from './store/playlists';

function App() {
  let dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const user = useSelector(state => state.session.user);

  // If there is a user, this loads the user's playlists in state
  if (isLoaded && user) dispatch(playlistsActions.getCurrentUserPlaylists());

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
      <h1>Hello from SonusNimbus</h1>
      <Navigation />

      <Switch>
        <Route exact path='/signup' component={SignUpFormPage} />
        <Route path='/you' component={UserHome} />
      </Switch>
    </>
  );
};

export default App;
