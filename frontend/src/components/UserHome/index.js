import { useSelector } from "react-redux";
import { NavLink, Route, Switch, useHistory } from "react-router-dom";

import Playlists from "../Playlists";

const UserHome = () => {
  const history = useHistory();
  const user = useSelector(state => state.session.user)
  if (!user) history.push('/');

  return (
    <div>UserHome Component

      <nav>User homepage nav bar
        <div>
          <NavLink to='/you'>All</NavLink>
        </div>

        <div>
          <NavLink to='/you/playlists'>Playlists</NavLink>
        </div>
      </nav>

      <Switch>
        <Route exact path='/you/playlists' component={Playlists}/>
      </Switch>
    </div>
  )

}

export default UserHome;
