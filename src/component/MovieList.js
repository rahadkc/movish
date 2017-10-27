import React from 'react';
import Movie from "./Movie";

class Movielist extends React.Component {

  // componentWillMount(){

  // }

  render() {
    
    let movieNodes = [];
    if(!this.props.fetching){
      movieNodes = this.props.movies.map((movie,i) => {
          return (
              <Movie name={movie.original_title} showId={movie.id} key={i} year={movie.release_year} cast={movie.show_cast} summary={movie.overview} category={movie.genres} rating={movie.rating} director={movie.director} poster={movie.poster_path}   >  </Movie>
          )
      })
    }
   
    return (
      <div className="App">
        <div className="App-intro">
         {movieNodes}
        </div>
      </div>
    );
  }
}

export default Movielist;