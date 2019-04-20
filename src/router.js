import React, { Component } from 'react'
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import Storage from './utils/storage'
import routerConfig from './config/routerConfig'
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

const storage = new Storage()
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
                  <AuthorizedRoute path="/order/list" component={Order} routeRole={[1]} />
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

class AuthorizedRoute extends Component{
  render() {
    const {component: Component, ...rest} = this.props
    const userinfo = storage.getStorage('userinfo')
    const userrole = userinfo.role;
    const {routeRole} = {...rest}
    console.log(routerConfig, 'routerConfig');
    routerConfig.map(item => {
      if (item.key === {...rest}.path) {
        console.log(item);
      }
    })
    // console.log({...rest}.path, 'rest')
    return (
      <Route {...rest} render={props => {
        return routeRole.includes(userrole) ? 
          <Component {...props} /> :
          <div>暂未权限访问该页面</div>
      }} />
    )
  }
}