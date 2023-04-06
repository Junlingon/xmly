import React, { FC, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import NotFound from '../NotFound';
import routes from './route';

const XRouter: FC = () => {
    return (
        <Suspense fallback={<div></div>}>
            <Switch>
                <Redirect exact from="/" to={routes[0]?.path || '/'} />
                {routes.map(route => (
                    <Route
                        exact
                        strict
                        key={route.path}
                        path={route.path}
                        render={(props: any) => <route.component {...props} />}
                    ></Route>
                ))}
                <Route path="*" component={NotFound} />
            </Switch>
        </Suspense>
    );
};

export default XRouter;
