import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Loadable from 'react-loadable';
// CRA’s chunks by default are ugly and unpredictable. We can improve this by naming
// our chunks using a relatively new feature of webpack: chunk names.
const AsyncComponent = Loadable({
    loader: () => import(/* webpackChunkName: "myNamedChunk" */ './SomeComponent'),
    loading: () => <div>loading...</div>,
    modules: ['myNamedChunk']
});
const AsyncComponentTwo = Loadable({
    loader: () => import(/* webpackChunkName: "myNamedChunk" */ './SomeComponentTwo'),
    loading: () => <div>loading...</div>,
    modules: ['myNamedChunk']
});
class App extends Component {
  render() {
    return (
      <div className="App">

        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
          <Switch>
              <Route path="/" exact component={ AsyncComponent } />
              <Route path="/about" component={ AsyncComponentTwo } />
          </Switch>
      </div>
    );
  }
}

export default App;
