import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import routes from './routes';
import ErrorBoundary from '../util/ErrorBoundary';

const HomePage = lazy(() => import('./HomePage'));
const TrackedList = lazy(() =>  import('./TrackedList'));

const Pages = () => {
    return (
        <ErrorBoundary>
            <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                    <Route path={routes.HOME} exact component={HomePage} />
                    <Route path={routes.TRACKED_FLIGHTS} component={TrackedList} />
                </Switch>
            </Suspense>
        </ErrorBoundary>
    )
};

export default Pages;