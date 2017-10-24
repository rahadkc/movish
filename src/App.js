import React from 'react';
import {connect} from "react-redux";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Single from './component/Single';
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
          <Route exact path='/' component={Home} />
          <Route path='/sortby/:page' component={Home} />
          <Route path='/sortby/:page/page/:num' component={Home} />
          <Route path='/page/:num' component={Home} />
          <Route path='/movie/:id' component={Single} />
          <Route path='/search/query/:text' component={Home} />
          <Route path='/search/query/:text/:num' component={Home} />
        </Switch>
      </Router>
    );
  }
}


export default connect()(App);
