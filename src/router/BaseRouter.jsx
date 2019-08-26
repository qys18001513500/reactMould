import React, { Suspense } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import routerConfig from '../config/routerConfig';
import RouterGuard from "./RouterGuard";
// import { AppContainer } from 'react-hot-loader'; // 模块热替换的 Api

/**
 * 定义应用路由
 */
export default class BaseRouter extends React.Component {
    /**
     * 将路由信息扁平化，继承上一级路由的 path
     * @param {Array} config 路由配置
     */
    recursiveRouterConfigV4 = (config = []) => {
        const routeMap = [];
        config.forEach((item) => {
            const route = {
                path: item.path,
                layout: item.layout,
                component: item.component,
            };
            if (Array.isArray(item.routes)) {
                route.childRoutes = this.recursiveRouterConfigV4(item.routes);
            }
            routeMap.push(route);
        });
        return routeMap;
    }

    /**
     * 将扁平化后的路由信息生成 Route 节点
     *
     * @param {Element} container 路由容器
     * @param {object} router 路由对象
     * @param {string} contextPath 上层路由地址
     * @return {Route}
     * @example
     * <Switch>
     *   <Route exact path="/" component={Home} />
     *   <Route exact path="/page3" component={Page3} />
     *   <Route exact path="/page4" component={Page4} />
     *   <Route exact path="/page3/:id" component={Page3} />
     *   <Route exact component={NotFound} />
     * </Switch>
     */
    renderRouterConfigV4 = (container, routeMap, contextPath) => {
        let routeChildren = [];
        const renderRoute = (routeContainer, routeItem, routeContextPath) => {
            let routePath = '';
            if (!routeItem.path) {
                // eslint-disable-next-line
                console.error('route must has `path`');
            } else if (routeItem.path === '/' || routeItem.path === '*') {
                routePath = routeItem.path;
            } else {
                routePath = `${routeContextPath}/${routeItem.path}`.replace(/\/+/g, '/');
            }

            // 优先使用当前定义的 layout
            if (routeItem.layout && routeItem.component) {
                routeChildren.push(
                    <Route
                        key={routePath}
                        exact
                        path={routePath}
                        render={(props) => {
                            return <RouterGuard {...props} layout={routeItem.layout} component={React.createElement(routeItem.component, props)}/>
                            // return React.createElement(
                            //     routeItem.layout,
                            //     props,
                            //     React.createElement(routeItem.component, props)
                            // );
                        }}
                    />
                );
            } else if (routeContainer && routeItem.component) {
                // 使用上层节点作为 container
                routeChildren.push(
                    <Route
                        key={routePath}
                        exact
                        path={routePath}
                        render={(props) => {
                            return <RouterGuard {...props} layout={routeContainer} component={React.createElement(routeItem.component, props)}/>
                            // return React.createElement(
                            //     routeContainer,
                            //     props,
                            //     React.createElement(routeItem.component, props)
                            // );
                        }}
                    />
                );
            } else {
                routeChildren.push(
                    <Route
                        key={routePath}
                        exact
                        path={routePath}
                        render={(props) => {
                            return <RouterGuard {...props} layout={""} component={routeItem.component}/>
                        }}
                        // component={routeItem.component}
                    />
                );
            }
            // 存在子路由，递归当前路径，并添加到路由中
            if (Array.isArray(routeItem.childRoutes)) {
                routeItem.childRoutes.forEach((router) => {
                    // 递归传递当前 route.component 作为子节点的 container
                    renderRoute(routeItem.component, router, routePath);
                });
            }
        };

        routeMap.forEach((routeItem) => {
            renderRoute(container, routeItem, contextPath);
        });
        // console.log(routeChildren);
        return <Switch>{routeChildren}</Switch>;
    }

    fallback() {
        return <div>Loading...</div>;
    }


    render() {
        const routeMap = this.recursiveRouterConfigV4(routerConfig);
        const routeChildren = this.renderRouterConfigV4(null, routeMap, '/');
        return (
            <Router>
                <Suspense fallback={this.fallback()}>{routeChildren}</Suspense>
            </Router>
        );
    }
}
