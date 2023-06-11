import React from 'react';
import './App.css';
import NavigationBar from './Components/NavigationBar';
import SearchBar from './Components/SearchBar.js';

function App() {

  // Rendering the components NavigationBar and SearchBar
  return (
    <div className="App">
      <NavigationBar/>
      <SearchBar/>
    </div>
  );
}

export default App;
