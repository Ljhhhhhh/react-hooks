import React, { Component } from 'react'
import { HashRouter, Route, Switch } from "react-router-dom";
import App from './App'
import Login from './pages/login'

export default class Router extends Component {
  render() {
    return (
      <HashRouter>
        <App>
          <Switch>
            <Route path='/login' component={Login} />
          </Switch>
        </App>
      </HashRouter>
    )
  }
}
