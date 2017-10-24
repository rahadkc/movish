import React from 'react';
import '../App.css';

class Search extends React.Component {
  filterList = (event) =>{
    var updatedList = this.props.movies;
    updatedList = updatedList.filter(function(item){
      return item.toString().toLowerCase().search(
        event.target.value.toLowerCase()) !== -1;
    });
    this.setState({movies: updatedList});
    console.log(event.target.value,"target value")
  }

  render() {
    // console.log(this.state.movies,"movies array")
    return ( 
        <div className="search-box">
            <input type="search" className="search" placeholder="Search movie title here" onChange={this.filterList} required/>
            <span className="icon">&#128269;</span>
            <ul className="item-list">
            
            </ul>
        </div>
    );
  }
}

export default Search;
        
        
       


       