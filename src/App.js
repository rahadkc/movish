import React from 'react';
import {connect} from "react-redux";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Single from './component/Single';
import NoMatch from './component/NoMatch';
import Home from './Home';
import './App.css';

class App extends React.Component {
  
  render() {
    // const userList = this.props.users.map(user => {
    //   return <li>user</li>
    // })
    return (
      <Router>
        <Switch>
          <Route exact path='/movish/' component={Home} />
          <Route path='/movish/sortby/:page' component={Home} />
          <Route path='/movish/sortby/:page/page/:num' component={Home} />
          <Route path='/movish/page/:num' component={Home} />
          <Route path='/movish/movie/:id' component={Single} />
          <Route path='/movish/search/query/:text' component={Home} />
          <Route path='/movish/search/query/:text/:num' component={Home} />
          <Route component={NoMatch} />
        </Switch>
      </Router>
    );
  }
}


export default connect()(App);
