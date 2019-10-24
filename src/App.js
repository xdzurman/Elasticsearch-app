import React from 'react';
import TopBar from './TopBar'
import Search from './Search'

function App() {
  return (
    <div className="App">
      <TopBar />
      <div className="body">
        <Search />
      </div>
    </div>
  );
}

export default App;
