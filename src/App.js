import React from 'react';
import SearchField from './SearchField'
import TopBar from './TopBar'
import SearchResults from './SearchResults'

function App() {
  return (
    <div className="App">
      <TopBar />
      <div className="body">
        <SearchField />
        <SearchResults />
      </div>
    </div>
  );
}

export default App;
