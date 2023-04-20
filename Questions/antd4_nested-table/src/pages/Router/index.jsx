import { getRoutePath } from '../../utils/route';
import React, { Fragment, Suspense } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import routes from './router';
import NotFound from '../NotFound';

const TableRoute = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Switch>
                <Redirect exact from="/" to={getRoutePath(routes) || '/'} />
                {recursionRouter({ routeList: routes })}
                <Route path="/404" component={NotFound} />
            </Switch>
        </Suspense>
    )
}

function recursionRouter({ routeList, path = '' }) {
    return (
        <>
            {routeList.map(route => {
                if (Array.isArray(route.children) && route.children.length > 0) {
                    return (
                        <Fragment key={route.path}>
                            {recursionRouter({
                                routeList: route.children,
                                path: `${path}${route.path}`,
                            })}
                        </Fragment>
                    );
                }

                if (route.component) {
                    const Component = route.component;

                    return (
                        <Route
                            key={route.path}
                            exact
                            strict
                            path={path + route.path}
                            render={props => <Component {...props} />}
                        ></Route>
                    );
                }
            })}
        </>
    );
}

export default TableRoute;