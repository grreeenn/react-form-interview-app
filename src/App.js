// @flow
import React, {Component} from 'react';
import logo from './jones-logo.png';
import './App.css';
import {NewLead} from './NewLead';


class App extends Component<{}> {
    render() {
        return (
            <div className="App Grid-container">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to Jones!</h1>
                </header>
                <NewLead/>
            </div>
        );
    }
}

export default App;
