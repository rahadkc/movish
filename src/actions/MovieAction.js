import axios from "axios";

export function fetchMovies(page){
    return function(dispatch){
        const currentYear = new Date().getFullYear();
        const pageNum = page;
        const defaultPage = 1;
        const apiKey = '&api_key=cfe422613b250f702980a3bbf9e90716';
        let url = '';
        if(page){
            url = 'https://api.themoviedb.org/3/discover/movie?with_genres=18&page='+pageNum+'&primary_release_year='+currentYear+'&api_key=cfe422613b250f702980a3bbf9e90716';
        }else{
            url = 'https://api.themoviedb.org/3/discover/movie?with_genres=18&page='+defaultPage+'&primary_release_year='+currentYear+apiKey;
        }
        axios.get(url)
        .then((response) => {
            dispatch({type: "FETCH_MOVIES_FULFILLED", fetched: true, payload: response.data.results})
        })
        .catch((err) => {
            dispatch({type: "FETCH_MOVIES_REJECTED" , fetching: false, payload: err});
        })
    }
}


export function fetchTopRated(page){
    return function(dispatch){
        const pageNum = page;
        const defaultPage = 1;
        const apiKey = '&api_key=cfe422613b250f702980a3bbf9e90716';
        let topRatedUrl = '';
        if(page){
            topRatedUrl= 'https://api.themoviedb.org/3/discover/movie?with_genres=18&sort_by=vote_average.desc&vote_count.gte=10&page='+pageNum+apiKey;
        }else{
            topRatedUrl= 'https://api.themoviedb.org/3/discover/movie?with_genres=18&sort_by=vote_average.desc&vote_count.gte=10&page='+defaultPage+apiKey;
        }
        axios.get(topRatedUrl)
        .then((response) => {
            dispatch({type: "FETCH_MOVIES_FULFILLED", fetched: true, payload: response.data.results})
        })
        .catch((err) => {
            dispatch({type: "FETCH_MOVIES_REJECTED" , fetching: false, payload: err});
        })
    }
}

export function fetchPopular(page){
    return function(dispatch){
        const pageNum = page;
        const defaultPage = 1;
        const apiKey = '&api_key=cfe422613b250f702980a3bbf9e90716';
        let PopularUrl = '';
        if(page){
            PopularUrl = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&page='+pageNum+apiKey;
        }else{
            PopularUrl = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&page='+defaultPage+apiKey;
        }
        axios.get(PopularUrl)
        .then((response) => {
            dispatch({type: "FETCH_MOVIES_FULFILLED", fetched: true, payload: response.data.results})
        })
        .catch((err) => {
            dispatch({type: "FETCH_MOVIES_REJECTED" , fetching: false, payload: err});
        })
    }
}

export function fetchKidsPopular(page){
    return function(dispatch){
        const pageNum = page;
        const defaultPage = 1;
        const apiKey = '&api_key=cfe422613b250f702980a3bbf9e90716';
        let kidsPopularUrl = '';
        if(page){
            kidsPopularUrl = 'https://api.themoviedb.org/3/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&page='+pageNum+apiKey;
        }else{
            kidsPopularUrl = 'https://api.themoviedb.org/3/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&page='+defaultPage+apiKey;
        }
        axios.get(kidsPopularUrl)
        .then((response) => {
            dispatch({type: "FETCH_MOVIES_FULFILLED", fetched: true, payload: response.data.results})
        })
        .catch((err) => {
            dispatch({type: "FETCH_MOVIES_REJECTED" , fetching: false, payload: err});
        })
    }
}


export function singleMovie(id){
    return function(dispatch){
        const url = 'https://api.themoviedb.org/3/movie/'+ id +'?&api_key=cfe422613b250f702980a3bbf9e90716';
        axios.get(url)
        .then((response) => {
            console.log(response.data, "response.data")
            dispatch({type: "FETCH_MOVIES_FULFILLED", fetched: true, payload: response.data})
        })
        .catch((err) => {
            dispatch({type: "FETCH_MOVIES_REJECTED" , fetching: false, payload: err});
        })
    }
}

//search for movie in page
export const searchMovies = (movies) =>{
    return{
        type: "SEARCH_MOVIES",
        payload: movies
    }
}

//Search for all movies 
export function searchAllMovie(movie, page){
    return function(dispatch){
        const searchUrl = 'https://api.themoviedb.org/3/search/movie?query='+ movie +'&page='+ page + '&api_key=cfe422613b250f702980a3bbf9e90716';
        axios.get(searchUrl)
        .then((response) => {
            dispatch({type: "SEARCH_ALL_MOVIE", fetched: true, payload: response.data})
        })
        .catch((err) => {
            dispatch({type: "FETCH_MOVIES_REJECTED" , fetching: false, payload: err});
        })
    }
}


