import { useSelector } from "react-redux";
import { NavLink, Route, Switch, useHistory, useParams } from "react-router-dom";

import Playlists from "../Playlists";
import { SinglePlaylist } from "../Playlists";

const Library = () => {
  const history = useHistory();
  const user = useSelector(state => state.session.user)
  if (!user) history.push('/');

  // Note: use window.location.href to check url
  // if it isn't a valid url, redirect to 404

  return (
    <div>Library Component

      <nav>/you/:wildcard nav bar
        <div>
          <NavLink to='/you/library'>Overview</NavLink>
        </div>

        <div>
          <NavLink to='/you/playlists'>Playlists</NavLink>
        </div>

        <div>
          <NavLink to='/you/albums'>Albums</NavLink>
        </div>
      </nav>

      <Switch>
        {/* Note: /you/playlists should show your playlists that you've made OR LIKED */}
        {/*       whereas userId/playlists shows only YOUR playlists  */}
        <Route exact path='/you/playlists' component={Playlists}/>
      </Switch>
    </div>
  )

}

export default Library;
