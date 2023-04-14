import { getRoutePath } from '@/utils/route';
import React, { FC, Fragment, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import NotFound from '../NotFound';
import routes, { Routes } from './router';

const XRouter: FC = () => {
  return (
    <Suspense fallback={<div></div>}>
      <Switch>
        <Redirect exact from="/" to={getRoutePath(routes) || '/'} />
        {recursionRouter({ routeList: routes })}
        <Route path="*" component={NotFound} />
      </Switch>
    </Suspense>
  );
};

function recursionRouter({
  routeList,
  path = '',
}: {
  routeList: Routes[];
  path?: string;
}) {
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

export default XRouter;
