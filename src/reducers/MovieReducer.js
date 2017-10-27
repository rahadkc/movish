export default function reducer(state ={
    movies:[],
    searchMovies:[],
    searchMoviesPages:null,
    preloader: false,
    fetching: false,
    fetched: false,
    error: null,
    notFound: false
}, action){
    switch(action.type){
        case "FETCH_MOVIES":{
            return {...state, fetching: true}
        }
        case "FETCH_MOVIES_FULFILLED":{
            // console.log(action.payload, "action payload")
            return {...state, fetching: false, fetched: true, movies: action.payload}
        }
        case "FETCH_MOVIES_REJECTED":{
            return {...state, fetching: false, notFound:true, error: action.payload}
        }
        case "SEARCH_MOVIES":{
            if(action.payload.length === 0){
                return {...state, notFound: true}
            }
            return {...state, movies:action.payload, notFound: false}
        }
        case "SEARCH_ALL_MOVIE":{
            console.log(action.payload.total_pages, "movi search length")
            if(action.payload.length === 0){
                return {...state, notFound: true}
            }
            return {...state, fetching: false,  searchMovies:action.payload.results, searchMoviesPages:action.payload.total_pages, notFound: false}
        }
    }

    return state;
}