import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/lib/renderRoutes';
import history from '@tmp/history';
import RendererWrapper0 from '/Users/macbookpro/Documents/www/learn/react-hooks/src/pages/.umi/LocaleWrapper.jsx';
import _dvaDynamic from 'dva/dynamic';

const Router = require('dva/router').routerRedux.ConnectedRouter;

const routes = [
  {
    path: '/account',
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () =>
            import(/* webpackChunkName: "layouts__UserLayout" */ '../../layouts/UserLayout'),
          LoadingComponent: require('/Users/macbookpro/Documents/www/learn/react-hooks/src/components/PageLoading/index')
            .default,
        })
      : require('../../layouts/UserLayout').default,
    routes: [
      {
        name: 'login',
        path: '/account/login',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__Account__login" */ '../Account/login'),
              LoadingComponent: require('/Users/macbookpro/Documents/www/learn/react-hooks/src/components/PageLoading/index')
                .default,
            })
          : require('../Account/login').default,
        exact: true,
      },
      {
        component: () =>
          React.createElement(
            require('/Users/macbookpro/Documents/www/learn/react-hooks/node_modules/_umi-build-dev@1.10.16@umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: true },
          ),
      },
    ],
  },
  {
    path: '/exception',
    routes: [
      {
        path: '/exception/404',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__Exception__404" */ '../Exception/404'),
              LoadingComponent: require('/Users/macbookpro/Documents/www/learn/react-hooks/src/components/PageLoading/index')
                .default,
            })
          : require('../Exception/404').default,
        exact: true,
      },
      {
        path: '/exception/403',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__Exception__403" */ '../Exception/403'),
              LoadingComponent: require('/Users/macbookpro/Documents/www/learn/react-hooks/src/components/PageLoading/index')
                .default,
            })
          : require('../Exception/403').default,
        exact: true,
      },
      {
        component: () =>
          React.createElement(
            require('/Users/macbookpro/Documents/www/learn/react-hooks/node_modules/_umi-build-dev@1.10.16@umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: true },
          ),
      },
    ],
  },
  {
    path: '/',
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () =>
            import(/* webpackChunkName: "layouts__BasicLayout" */ '../../layouts/BasicLayout'),
          LoadingComponent: require('/Users/macbookpro/Documents/www/learn/react-hooks/src/components/PageLoading/index')
            .default,
        })
      : require('../../layouts/BasicLayout').default,
    Routes: [require('../Authorized').default],
    authority: ['admin', 'user'],
    routes: [
      {
        path: '/',
        name: 'dashboard',
        icon: 'home',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__Home" */ '../Home'),
              LoadingComponent: require('/Users/macbookpro/Documents/www/learn/react-hooks/src/components/PageLoading/index')
                .default,
            })
          : require('../Home').default,
        exact: true,
      },
      {
        path: '/product',
        name: 'product',
        icon: 'shop',
        routes: [
          {
            name: 'category',
            path: '/product/category',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__Product__category__model.ts' */ '/Users/macbookpro/Documents/www/learn/react-hooks/src/pages/Product/category/model.ts').then(
                      m => {
                        return { namespace: 'model', ...m.default };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "p__Product__category" */ '../Product/category'),
                  LoadingComponent: require('/Users/macbookpro/Documents/www/learn/react-hooks/src/components/PageLoading/index')
                    .default,
                })
              : require('../Product/category').default,
            exact: true,
          },
          {
            component: () =>
              React.createElement(
                require('/Users/macbookpro/Documents/www/learn/react-hooks/node_modules/_umi-build-dev@1.10.16@umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: true },
              ),
          },
        ],
      },
      {
        name: 'user',
        path: '/user',
        icon: 'user',
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__User__list__model.ts' */ '/Users/macbookpro/Documents/www/learn/react-hooks/src/pages/User/list/model.ts').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__User__list" */ '../User/list'),
              LoadingComponent: require('/Users/macbookpro/Documents/www/learn/react-hooks/src/components/PageLoading/index')
                .default,
            })
          : require('../User/list').default,
        authority: 'admin',
        exact: true,
      },
      {
        component: () =>
          React.createElement(
            require('/Users/macbookpro/Documents/www/learn/react-hooks/node_modules/_umi-build-dev@1.10.16@umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: true },
          ),
      },
    ],
  },
  {
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () =>
            import(/* webpackChunkName: "p__Exception__404" */ '../Exception/404'),
          LoadingComponent: require('/Users/macbookpro/Documents/www/learn/react-hooks/src/components/PageLoading/index')
            .default,
        })
      : require('../Exception/404').default,
    exact: true,
  },
  {
    component: () =>
      React.createElement(
        require('/Users/macbookpro/Documents/www/learn/react-hooks/node_modules/_umi-build-dev@1.10.16@umi-build-dev/lib/plugins/404/NotFound.js')
          .default,
        { pagesPath: 'src/pages', hasRoutesInConfig: true },
      ),
  },
];
window.g_routes = routes;
const plugins = require('umi/_runtimePlugin');
plugins.applyForEach('patchRoutes', { initialValue: routes });

export { routes };

export default class RouterWrapper extends React.Component {
  unListen = () => {};

  constructor(props) {
    super(props);

    // route change handler
    function routeChangeHandler(location, action) {
      plugins.applyForEach('onRouteChange', {
        initialValue: {
          routes,
          location,
          action,
        },
      });
    }
    this.unListen = history.listen(routeChangeHandler);
    routeChangeHandler(history.location);
  }

  componentWillUnmount() {
    this.unListen();
  }

  render() {
    const props = this.props || {};
    return (
      <RendererWrapper0>
        <Router history={history}>{renderRoutes(routes, props)}</Router>
      </RendererWrapper0>
    );
  }
}
