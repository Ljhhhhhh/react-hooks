import React, { Component } from 'react'
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import App from './App'
import Login from './pages/login'
import Layout from './layout/layout'
import Home from './pages/home'
import Category from './pages/product/category'
import CategoryAdd from './pages/product/category/add'
import Product from './pages/product/product'
import ProductDetail from './pages/product/product/handle'
import Order from './pages/order'
import OrderDetail from './pages/order/detail'
import User from './pages/user';

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
                  <Route path="/product/category/add" component={CategoryAdd} />
                  <Route path="/product/category/:categoryId" component={Category} />
                  <Route path="/product/index" component={Product} />
                  <Route exact path="/product/product" component={ProductDetail} />
                  <Route exact path="/product/product/:productId" component={ProductDetail} />
                  <Route exact path="/product/product/:productId/:detail" component={ProductDetail} />
                  <Route path="/order/list" component={Order} />
                  <Route path="/order/detail/:id" component={OrderDetail} />
                  <Route path="/user" component={User} />
                  
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
