import React, { Fragment, useReducer, useEffect } from "react";
import axios from "axios";

import Header from './components/Header'
// import Movie from "./components/Movie";
import Search from "./components/Search";
import { initialState, reducer } from "./store/reducer";
import spinner from './assets/promise-loader.gif';


import TvMazeAxiosUsers from "./components/TVMaze";

const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=4a3b711b";

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    axios.get(MOVIE_API_URL).then(jsonResponse => {
      dispatch({
        type: "SEARCH_MOVIES_SUCCESS",
        payload: jsonResponse.data.Search
      });
    });
  }, []);

  const search = searchValue => {
    dispatch({
      type: "SEARCH_MOVIES_REQUEST"
    });

    axios(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`).then(
      jsonResponse => {
        if (jsonResponse.data.Response === "True") {
          dispatch({
            type: "SEARCH_MOVIES_SUCCESS",
            payload: jsonResponse.data.Search
          });
        } else {
          dispatch({
            type: "SEARCH_MOVIES_FAILURE",
            error: jsonResponse.data.Error
          });
        }
      }
    );
  };

  // const { movies, errorMessage, loading } = state;

  // const fetchMovieData =
  //   loading && !errorMessage ? (
  //     <img className="spinner" src={spinner} alt="Loading spinner" />
  //   ) : errorMessage ? (
  //     <div className="errorMessage">{errorMessage}</div>
  //   ) : (
  //     movies.map((movie, index) => (
  //       <Movie key={`${index}-${movie.Title}`} movie={movie} />
  //     ))
  //   );

  return (
    <div className="App">
      <Fragment>
          <Header title=" React TVMaze App" />
          <Search search={search} />
          {/* <div className="movies">{fetchMovieData}</div> */}

          <TvMazeAxiosUsers />
        </Fragment>
    </div>
  );
};

export default App;

// eof