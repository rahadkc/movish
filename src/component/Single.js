import React from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import Movie from "./Movie";
import * as actions from "../actions/MovieAction";

class Single extends React.Component {

  state = {
    detail: true,
    page:20,
    data: false
  }
  componentDidMount() {
    this.apiCall(this.props.currentItem)
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps.currentItem, "next Props", this.props.currentItem)
    if(!this.props.fetching){
      nextProps.currentItem !== this.props.currentItem &&  this.apiCall(nextProps.currentItem); 
    }
    this.setState({
      data: true
    })
  }
  apiCall = (item) => {
    this.props.actions.singleMovie(item)
  }

  
  render() {
    const notFoundStyle = {
      width: 650,
      padding:20,
      background: '#fff',
      marginRight: 'auto',
      marginLeft: 'auto',
      borderRadius: 8,
      boxSizing: 'border-box'
    }
    const dataLoadng = {
      width: 'inherit',
      padding:20,
      background: '#fff',
      marginRight: 'auto',
      marginLeft: 'auto',
      borderRadius: 8,
      boxSizing: 'border-box',
      position: 'relative',
      top:-2,
      height: '100%',
      minHeight: '100vh',
      zIndex: 2
    }
    const movie = this.props.movies;
    const isMovie = Object.keys(movie).length === 0;
    console.log(isMovie, " movie")
    // if(!this.props.fetching){
    //   return <div></div>
    // }
    
    return (
        <div className="App">
            <div className="App-intro">
            <br/>
            {!isMovie && this.state.data && !this.props.fetching && <Movie detail={this.state.detail} movie={movie} name={movie.original_title} showId={movie.id} key={movie.showId} year={movie.release_date} cast={movie.show_cast} summary={movie.overview} category={movie.genres} rating={movie.vote_average} director={movie.director} poster={movie.poster_path}   /> }

            {this.props.fetching && <div style={dataLoadng}> 
        <div className="load-wrapp">
            <div className="loader">
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
            </div>
        </div> </div>}
            
            {this.props.notFound && <h2 style={notFoundStyle}>Sorry, No match found</h2>}

          </div>
        </div>
    );
  }
}

const mapStateAsProps = (state, ownProps) => {
  const currentItem = parseInt(ownProps.match.params.id,10);
  return {
    currentItem,
    movies: state.movies.movies,
    notFound: state.movies.notFound,
    fetching: state.movies.fetching
  }
}

const mapDispatchAsProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateAsProps, mapDispatchAsProps)(Single);

