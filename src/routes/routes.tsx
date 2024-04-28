import { BrowserRouter, Navigate, Route, Routes as ReactRoutes } from 'react-router-dom';
import React from 'react';
import paths from './paths';
import HomePage from '@/pages/home.tsx';
import Layout from '@/components/layout';
import EventsPage from '@/pages/events.tsx';
import App from '@/App.tsx';

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
                                <App />
                            </Layout>
                        }
                    />
                </Route>
                <Route
                    path={paths.login.path}
                    element={
                        <Layout>
                            <>Login</>
                        </Layout>
                    }
                />
                <Route
                    path={paths.register.path}
                    element={
                        <Layout>
                            <>Register</>
                        </Layout>
                    }
                />
                <Route path="*" element={<Navigate to={paths.notFound.path} replace />} />
            </ReactRoutes>
        </BrowserRouter>
    );
};

export default Routes;
