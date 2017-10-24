import React from 'react';
import {Link} from 'react-router-dom';
import '../App.css';

class Movie extends React.Component {
   limitWords = (textToLimit, wordLimit) =>{
    var finalText = "";

    var numberOfWords = textToLimit.length;

    var i=0;

    if(numberOfWords > wordLimit)
    {
    for(i=0; i< wordLimit; i++)
    finalText = finalText+ textToLimit[i];

    return finalText+".";
    }
    else return textToLimit;
}
  render() {
    const { detail, movie }  = this.props;
    const url = 'https://image.tmdb.org/t/p/w640';
    const urlLg = 'https://image.tmdb.org/t/p/w1400_and_h450_bestv2';
    const imgUrl = this.props.poster;
    const summary = this.limitWords(this.props.summary,85);
    let categories = "",
        languages = "";
        
    if(this.props.detail){
      categories = this.props.category.map((cat,i) => {
        return <span key={i}>{cat.name},</span>
      })
      languages = movie.spoken_languages.map((lan,i) => {
        return <span key={i}>{lan.name},</span>
      })
    }


    return (

      <div className={detail ? "single-item" : "item"}>
            {detail && <div className="poster-bg"><img src={urlLg + imgUrl} alt="Movie Poster"/></div>}
            {detail && <div className="layer"></div>}
            <div className="wrapper">
              <div className="content">
                <div className={detail ? "poster" : "poster-sm"}><Link to={`/movie/${this.props.showId}`}><img src={url + imgUrl} alt="Movie poster"/></Link></div>
                <div className="text">
                  {detail && <h5>Movie</h5>}
                  {!detail && <h3 className="title"><Link to={`/movie/${this.props.showId}`}><i>{this.props.name}</i></Link></h3>}
                  {detail && <h3 className="title">Name: <i>{this.props.name}</i></h3>}
                  {detail &&  <div className="m_d">Category: <span>{categories}</span></div>}
                  {detail && <div className="m_d">Release: <span>{this.props.year}</span></div>}
                  {detail &&  <div className="m_d">Rating: <span>{this.props.rating}/10</span></div>}
                  {detail && <div className="m_d">Runtime: <span>{movie.runtime}min</span></div>}
                  {detail && <div className="m_d">Languages: <span>{languages}</span></div>}
                  {detail && <div className="m_d">Website: <span><a href={movie.homepage} target="_blank">{movie.homepage}</a></span></div>}
                  <p className="summary">{detail && "Description:"}  <span>{detail ? this.props.summary : summary}</span></p>
                </div>
              </div>
            </div>
      </div>






    );
  }
}

export default Movie;
