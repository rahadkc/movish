import React from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Link, NavLink} from 'react-router-dom';
import Movielist from './component/MovieList';
import Navbar from './component/Navbar';
import Footer from './component/Footer';
import * as actions from "./actions/MovieAction";
import './App.css';

class Home extends React.Component {

  state = {
    defaultPage: 1,
    page: 1,
    pageClick: false,
    movieList: true,
    totalSearch: false,
    searchAllText:null,
    searchPage:1,
    navSelect:false,
    data: false,
    homePage: true     
  }
  componentWillMount(){
    const path = this.props.location.pathname.split('/');
    this.setState({
      searchPage: isNaN(path[4]) ? 1 : parseInt(path[4],10)
    })
  }

  componentDidMount(){
    if(!this.props.queryParam && !this.props.querySortPage){
      this.apiCall(this.props.currentPage);
    }

    if(this.props.queryParam){
      const path = this.props.location.pathname.split('/');
      console.log("query param exist");
      this.setState({
        totalSearch: true,
        movieList: false,
        searchPage: isNaN(path[4]) ? 1 : parseInt(path[4],10)
      })
      this.props.actions.searchAllMovie(this.props.queryParam, this.state.searchPage)
    }

    if(this.props.querySortPage){
      const path = this.props.location.pathname.split('/');
      console.log("querySort Page exist");
      this.setState({
        totalSearch: false,
        movieList: false,
        navSelect:true,
        searchPage: isNaN(path[4]) ? 1 : parseInt(path[4],10)
      })
      const category = this.props.querySortPage;
      // const page = path ? parseInt(path[4],10) : 1;
      console.log(this.state.searchPage, " state.searchPage")
      this.navItemClick(category, this.props.newCatPage)
    }

  }
  componentWillReceiveProps(nextProps) {
    // let path = this.props.location.pathname.split('/');
    // path = isNaN(path[4]) ? 1 : parseInt(path[4],10);
    
    
    this.setState({
      movieList: true,
      navSelect: false,
      totalSearch: false,
      data: true
    });
    if(this.state.movieList){
      nextProps.currentPage !== this.props.currentPage && this.apiCall(nextProps.currentPage); 
    }
    
    
    if(this.props.queryParam){
      this.setState({
        totalSearch: true,
        movieList: false,
        navSelect: false   
      });
      nextProps.newCatPage !== this.props.newCatPage  && this.props.actions.searchAllMovie(this.props.queryParam, nextProps.newCatPage);
    }
    
    if(this.props.querySortPage){
      this.setState({
        totalSearch: false,
        movieList: false,
        navSelect:true
      })
      const category = this.props.querySortPage;
      nextProps.newCatPage !== this.props.newCatPage  && this.navItemClick(category, nextProps.newCatPage);
      nextProps.querySortPage !== category  &&  this.navItemClick(nextProps.querySortPage, nextProps.newCatPage);
      // console.log(nextProps.querySortPage, " this.props.querySortPage", this.props.querySortPage);
    }
    // console.log(this.state.movieList, " movieList", this.state.totalSearch, " totalsearch", this.state.navSelect, " navselect")
    console.log(nextProps, " next props")
    if(nextProps.match.path === '/'){
      // console.log(this.props.match.path === '/' && nextProps.match.path === '/', " match path")
      nextProps.match.path !== this.props.match.path && this.apiCall(nextProps.currentPage); 
    }
  }
 
  apiCall = (page) => {
    this.props.actions.fetchMovies(page)
  }

  nextPage = () => {
    const nextPage = this.props.currentPage + 1;
    if(this.state.movieList){
      this.apiCall(nextPage);
    }
    console.log(nextPage, " next page")

    
    let queryText = this.state.searchAllText ? this.state.searchAllText : this.props.queryParam;
    if(this.props.queryParam){
      const nextSearchPage = this.state.searchPage + 1;
      this.setState({
        searchPage: nextSearchPage
      })
      this.props.actions.searchAllMovie(queryText, nextSearchPage);
    }

    // console.log(this.props.currentPage, "current page");

    if(this.props.querySortPage){
      const nextCatPage = this.state.searchPage + 1;
      this.setState({
        searchPage: nextCatPage
      })
      this.navItemClick(this.props.querySortPage, nextCatPage);
    }
  }
  prevPage = () => {
    const prevPage = this.props.currentPage - 1;
    if(this.state.movieList){
      this.apiCall(prevPage);
    }

    let queryText = this.state.searchAllText ? this.state.searchAllText : this.props.queryParam;
    if(this.props.queryParam){
      const prevSearchPage = this.state.searchPage - 1;
      this.setState({
        searchPage: prevSearchPage
      })
      this.props.actions.searchAllMovie(queryText, prevSearchPage);
    }


 console.log(this.props.currentPage, "current page")
    if(this.props.querySortPage){
      const prevCatPage = this.state.searchPage - 1;
      this.setState({
        searchPage: prevCatPage
      })
      this.navItemClick(this.props.querySortPage, prevCatPage);
    }
  }


  filterList = (event) =>{
    var updatedList = this.props.movies;
    //Filter array
    updatedList = updatedList.filter(function(item){
      //Return items only match with event.target.value  
      return item.title.toString().toLowerCase().search(event.target.value.toLowerCase()) !== -1;
    });
    
    //if input value empty 
    if(event.target.value === ''){
     //this.props.actions.fetchMovies(this.props.currentPage);
      this.props.history.go();
    }else{
      this.props.actions.searchMovies(updatedList);
    }
  }

  //filter from api
  filterApi = (event) => {
    const val = event.target.value.toString().toLowerCase();
    console.log(val, "val search");
    this.setState({
      searchAllText: val
    })
  }
  searchAllMovie = (e) => {
    e.preventDefault();
    this.setState({
      totalSearch: true,
      movieList: false,
      searchPage: 1
    })
    let queryText = this.state.searchAllText ? this.state.searchAllText : this.props.queryParam;

    this.props.actions.searchAllMovie(queryText, 1);
    this.props.history.push(`/search/query/${queryText}/1`);
  }

  navItemClick = (category,pageNum) => {
      let page = pageNum ? pageNum : 1;
      this.setState({
        searchPage:page
      })
      // this.props.history.push(`/sortby/${category}/page/${page}`);
      switch (category){
        case "popularity": 
          return this.props.actions.fetchPopular(page);
        case "top-rated": 
          return this.props.actions.fetchTopRated(page);
        case "newest": 
          return this.props.actions.fetchMovies(page);
        case "kids-popular": 
          return this.props.actions.fetchKidsPopular(page);
      }
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
    const pagePath = this.props.location.pathname.split('/');
    
    return (
        <div className="App">
            <div className="header">
              <div className="logo"><NavLink activeClassName="active" to='/'><img src="https://www.onlinelogomaker.com/applet_userdata/0/prdownload/onlinelogomaker-102417-2222-4606.png?7633"  alt="Homepage"/></NavLink></div>

              <div className="searchWrapper">

                <div className="search-box">
                    <input type="search" className="search" placeholder="Search from page" onChange={this.filterList} required/>
                    <span className="icon">&#128269;</span>
                </div>

                <div className="search-box">
                    <form onSubmit={this.searchAllMovie}>
                      <input type="search" className="search" placeholder="Search from website" onChange={this.filterApi}/>
                    </form>
                </div>
              </div>
            
              <Navbar navItem={this.navItemClick}  pagePath={pagePath}/>
            </div>

            <div className="pagination">
              {/*query prev nav*/}
              {this.state.totalSearch && !this.state.navSelect && <div  className={this.props.newCatPage === 1 ? "disabled" : ""}  onClick={() => this.prevPage()} ><Link to={`/search/query/${this.props.queryParam}/${this.state.searchPage-1}`}>Prev</Link></div>}

              {/*default prev nav*/}
              {!this.state.totalSearch && !this.state.navSelect &&  <div className={this.props.currentPage === 1 ? "disabled" : ""} onClick={() => this.prevPage()}><Link to={`/page/${this.props.currentPage - 1}`}>prev</Link></div>}

              {/*category prev nav*/}
              {!this.state.totalSearch && this.state.navSelect && <div className={this.props.newCatPage === 1 ? "disabled" : ""} onClick={() => this.prevPage()}><Link to={`/sortby/${this.props.querySortPage}/page/${this.props.newCatPage - 1}`}>prev</Link></div>}

              {/*page number*/}
              {this.state.movieList && <div className="num movie list">{this.props.currentPage ? this.props.currentPage : this.state.defaultPage } </div>}
              {this.state.totalSearch && <div className="num total search">{ this.props.newCatPage }</div>}
              {this.state.navSelect && <div className="num nav select">{ this.props.newCatPage }</div>}

              {/*default next nav*/}
              {!this.state.totalSearch && !this.state.navSelect &&  <div onClick={() => this.nextPage()}><Link to={`/page/${this.props.currentPage + 1}`}>Next</Link></div>}

              {/*category next nav*/}
              {!this.state.totalSearch && this.state.navSelect &&  <div onClick={() => this.nextPage()}><Link to={`/sortby/${this.props.querySortPage}/page/${this.props.newCatPage + 1}`}>Next</Link></div>}

              {/*query next nav*/}
              {this.state.totalSearch && !this.state.navSelect &&  <div  className={this.props.searchMoviesPages === this.props.newCatPage ? "disabled" : ""}  onClick={() => this.nextPage()} ><Link to={`/search/query/${this.props.queryParam}/${this.props.newCatPage+1}`}>Next</Link></div>}
            </div>


            <div className="App-intro">
            {this.props.fetching && <div style={dataLoadng}> 
        <div className="load-wrapp">
            <div className="loader">
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
            </div>
        </div> </div>}

            {this.props.queryParam && <h3 className="searchTitle">Search result for "{this.props.queryParam}"</h3>}

            {this.props.notFound ? <h2 style={notFoundStyle}>Sorry, No match found</h2> : this.state.movieList && !this.state.totalSearch && !this.state.navSelect && this.state.data &&  <Movielist fetching={this.props.fetching} defaultPage={this.props.currentPage} preloader={this.props.preloader} movies={this.props.movies} /> }

            {this.state.totalSearch && !this.state.navSelect && this.state.data &&  <Movielist fetching={this.props.fetching} defaultPage={this.props.currentPage} movies={this.props.searchMovies} />}

            {this.state.navSelect && this.state.data && <Movielist fetching={this.props.fetching} defaultPage={this.props.currentPage} movies={this.props.movies} />}


          </div>

          <Footer/>
        </div>
    );
  }
}

const mapStateAsProps = (state, ownProps) => {
  const path = ownProps.location.pathname.split('/');
  const newPage = parseInt(ownProps.match.params.num,10);
  const catPage = parseInt(path[4]);
  const queryParam = ownProps.match.params.text;
  const querySortPage = ownProps.match.params.page;
  let currentPage = null;
  if(isNaN(newPage)){
    currentPage = 1
  } else{
    currentPage = newPage
  }
  let newCatPage = null;
  if(querySortPage || queryParam){
    newCatPage = isNaN(catPage) ? 1 : catPage;
  }
  return {
    queryParam,
    querySortPage,
    newCatPage,
    currentPage,
    myState: state.movies,
    movies: state.movies.movies,
    searchMovies: state.movies.searchMovies,
    searchMoviesPages: state.movies.searchMoviesPages,
    notFound: state.movies.notFound,
    fetching: state.movies.fetching
  }
}

const mapDispatchAsProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateAsProps, mapDispatchAsProps)(Home);
