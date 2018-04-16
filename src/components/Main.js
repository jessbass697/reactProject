import React from "react";
import {Route,NavLink,BrowserRouter} from "react-router-dom";
import Home from "./Home";
import Albums from "./Albums";
import Artists from "./Artists";

 class Main extends React.Component {
   render() {
     return (
        <BrowserRouter>
          <div className="mainHead">
            <ul className="header">
              <li><NavLink exact to="/">Home</NavLink></li>
              <li><NavLink to="/albums">Albums</NavLink></li>
              <li><NavLink to="/artists">Artists</NavLink></li>
            </ul>
          <div className="content">
            <Route exact path="/" component={Home} />
            <Route path="/albums" component={Albums} />
            <Route path="/artists" component={Artists} />
          </div>
        </div>
      </BrowserRouter>

    );
  }
}




 export default Main;
