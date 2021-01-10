import Login from './components/Login'
import Posts from './components/Posts'

import React, { Component } from 'react';

import {BrowserRouter , Route} from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div>
          <BrowserRouter>
              <div>
              <Route path="/"  component={Login} exact />
              {/* <Route path="/:userID/posts"  component={Posts} /> */}
              <Route path="/:userID/posts"  component={() => <Posts/>} />
              </div>
          </BrowserRouter>
      </div>
  )
  }
}

export default App;
