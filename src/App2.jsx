import React from 'react';
import './App.css';
import Header from '../components/Header';
import Search from './components/Search'
import TVMaze from './App'
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
      </header>
      <Search />
      <TVMaze />
    </div>
  );
}

export default App;
