import { BrowserRouter, Navigate, Route, Routes as ReactRoutes } from 'react-router-dom';
import React from 'react';
import paths from './paths';
import HomePage from '@/pages/home.tsx';
import Layout from '@/components/layout';
import EventsPage from '@/pages/events.tsx';
import Event from '@/pages/event.tsx';
import Login from '@/pages/login.tsx';
import PageNotFound from '@/pages/404.tsx';
import Checkout from '@/pages/checkout.tsx';

const Routes: React.FC = () => {
    return (
        <BrowserRouter>
            <ReactRoutes>
                <Route
                    path={paths.home.path}
                    element={
                        <Layout>
                            <HomePage />
                        </Layout>
                    }
                />
                <Route path={paths.event.path}>
                    <Route
                        path={paths.emptyPath.path}
                        element={
                            <Layout>
                                <EventsPage />
                            </Layout>
                        }
                    />
                    <Route
                        path={paths.eventInfo.path}
                        element={
                            <Layout>
                                <Event />
                            </Layout>
                        }
                    />
                </Route>
                <Route
                    path={paths.checkout.path}
                    element={
                        <Layout>
                            <Checkout />
                        </Layout>
                    }
                />
                <Route
                    path={paths.login.path}
                    element={
                        <Layout>
                            <Login />
                        </Layout>
                    }
                />
                <Route
                    path="*"
                    element={
                        <>
                            <Navigate to={paths.notFound.path} replace />
                            <PageNotFound />
                        </>
                    }
                />
            </ReactRoutes>
        </BrowserRouter>
    );
};

export default Routes;
