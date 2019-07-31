import React from "react";
import { Router as DefaultRouter, Route, Switch } from "react-router-dom";
import dynamic from "umi/dynamic";
import renderRoutes from "umi/lib/renderRoutes";
import history from "@tmp/history";
import RendererWrapper0 from "/Users/lujiehui/Documents/www/learn/react-hooks/src/pages/.umi/LocaleWrapper.jsx";
import _dvaDynamic from "dva/dynamic";

const Router = require("dva/router").routerRedux.ConnectedRouter;

const routes = [
  {
    path: "/account",
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () =>
            import(
              /* webpackChunkName: "layouts__UserLayout" */ "../../layouts/UserLayout"
            ),
          LoadingComponent: require("/Users/lujiehui/Documents/www/learn/react-hooks/src/components/PageLoading/index")
            .default
        })
      : require("../../layouts/UserLayout").default,
    routes: [
      {
        name: "login",
        path: "/account/login",
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require("@tmp/dva").getApp(),
              models: () => [
                import(
                  /* webpackChunkName: 'p__account__login__model.ts' */ "/Users/lujiehui/Documents/www/learn/react-hooks/src/pages/account/login/model.ts"
                ).then(m => {
                  return { namespace: "model", ...m.default };
                })
              ],
              component: () =>
                import(
                  /* webpackChunkName: "p__account__login" */ "../account/login"
                ),
              LoadingComponent: require("/Users/lujiehui/Documents/www/learn/react-hooks/src/components/PageLoading/index")
                .default
            })
          : require("../account/login").default,
        exact: true
      },
      {
        component: () =>
          React.createElement(
            require("/Users/lujiehui/Documents/www/learn/react-hooks/node_modules/_umi-build-dev@1.10.16@umi-build-dev/lib/plugins/404/NotFound.js")
              .default,
            { pagesPath: "src/pages", hasRoutesInConfig: true }
          )
      }
    ]
  },
  {
    path: "/",
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () =>
            import(
              /* webpackChunkName: "layouts__BasicLayout" */ "../../layouts/BasicLayout"
            ),
          LoadingComponent: require("/Users/lujiehui/Documents/www/learn/react-hooks/src/components/PageLoading/index")
            .default
        })
      : require("../../layouts/BasicLayout").default,
    Routes: [require("../Authorized").default],
    authority: ["admin", "user"],
    routes: [
      {
        path: "/",
        name: "welcome",
        icon: "smile",
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__Welcome" */ "../Welcome"),
              LoadingComponent: require("/Users/lujiehui/Documents/www/learn/react-hooks/src/components/PageLoading/index")
                .default
            })
          : require("../Welcome").default,
        exact: true
      },
      {
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__404" */ "../404"),
              LoadingComponent: require("/Users/lujiehui/Documents/www/learn/react-hooks/src/components/PageLoading/index")
                .default
            })
          : require("../404").default,
        exact: true
      },
      {
        component: () =>
          React.createElement(
            require("/Users/lujiehui/Documents/www/learn/react-hooks/node_modules/_umi-build-dev@1.10.16@umi-build-dev/lib/plugins/404/NotFound.js")
              .default,
            { pagesPath: "src/pages", hasRoutesInConfig: true }
          )
      }
    ]
  },
  {
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () => import(/* webpackChunkName: "p__404" */ "../404"),
          LoadingComponent: require("/Users/lujiehui/Documents/www/learn/react-hooks/src/components/PageLoading/index")
            .default
        })
      : require("../404").default,
    exact: true
  },
  {
    component: () =>
      React.createElement(
        require("/Users/lujiehui/Documents/www/learn/react-hooks/node_modules/_umi-build-dev@1.10.16@umi-build-dev/lib/plugins/404/NotFound.js")
          .default,
        { pagesPath: "src/pages", hasRoutesInConfig: true }
      )
  }
];
window.g_routes = routes;
const plugins = require("umi/_runtimePlugin");
plugins.applyForEach("patchRoutes", { initialValue: routes });

export { routes };

export default class RouterWrapper extends React.Component {
  unListen = () => {};

  constructor(props) {
    super(props);

    // route change handler
    function routeChangeHandler(location, action) {
      plugins.applyForEach("onRouteChange", {
        initialValue: {
          routes,
          location,
          action
        }
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
