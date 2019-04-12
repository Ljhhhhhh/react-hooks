import React, { Component } from 'react'
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import App from './App'
import Login from './pages/login'
import Layout from './layout/layout'
import Home from './pages/home'
import Category from './pages/product/category'

import NoMatch from './pages/nomatch'

export default class Router extends Component {
  render() {
    return (
      <HashRouter>
        <App>
          <Switch>
            <Route exact path='/login' component={Login} />
            <Route path='/' render={() => (
              <Layout>
                <Switch>
                  <Route path="/home" component={Home} />
                  <Route path="/product/category/:categoryId" component={Category} />
                  <Redirect to='/home' />
                  <Route component={NoMatch} />
                </Switch>
              </Layout>
            )} />
          </Switch>
        </App>
      </HashRouter>
    )
  }
}
