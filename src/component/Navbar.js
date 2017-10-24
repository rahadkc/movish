import React from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {NavLink} from 'react-router-dom';
import * as actions from "../actions/MovieAction";

class Navbar extends React.Component {
  
    state = {
        navItem : [
            "newest",
            "popularity",
            "top-rated",
            "kids-popular",
        ]
    }
    
    navItemClick = (category) => {
      this.props.navItem(category)
    }

    
    
  render() {
    const { navItem } = this.state;
    return (
        <div className="navbar">
            <ul className="nav-list">
               
                {navItem.map((item, i) => {
                     return <li key={i} onClick={()=> this.navItemClick(item)}><NavLink activeClassName="active disabled" to={`/sortby/${item}`}>{item.split('-').join(' ')}</NavLink></li>
                })}
            </ul>
        </div>
    );
  }
}

const mapStateAsProps = (state, ownProps) => {
  const myProps = ownProps.match;
  return {
    myProps,
    movies: state.movies.movies
  }
}

const mapDispatchAsProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateAsProps, mapDispatchAsProps)(Navbar);
