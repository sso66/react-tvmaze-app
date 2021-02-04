import React, { Fragment, useReducer, useEffect } from "react";
import axios from "axios";

import Header from './components/Header'
import Search from "./components/Search";
import { initialState, reducer } from "./store/reducer"
import TVMaze from "./components/TVMaze";

const baseURL = 'https://api.tvmaze.com/search/shows?q=walking';

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    axios.get(baseURL).then(jsonResponse => {
      dispatch({
        type: "SEARCH_SUCCESS",
        payload: jsonResponse.data.Search
      });
    });
  }, []);

  const search = searchValue => {
    dispatch({
      type: "SEARCH_REQUEST"
    });

    axios(`https://api.tvmaze.com/search/shows?q=${searchValue}`).then(
      jsonResponse => {
        if (jsonResponse.data.Response === "True") {
          dispatch({
            type: "SEARCH_SUCCESS",
            payload: jsonResponse.data.Search
          });
        } else {
          dispatch({
            type: "SEARCH_FAILURE",
            error: jsonResponse.data.Error
          });
        }
      }
    );
  };

  return (
    <div className="App">
      <Fragment>
          <Header title="React TVMaze App" />
          <Search search={search} />
          <TVMaze />
      </Fragment>
    </div>
  );
};

export default App;

// eof