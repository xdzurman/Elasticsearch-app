import React from 'react';
import logo from './logo.svg';

function TopBar() {
    return (
        <div className="top-bar">
            <img src={logo} className="App-logo" alt="logo" />
            <span className="title">VINF Seach Engine</span>
        </div>
    )
}

export default TopBar