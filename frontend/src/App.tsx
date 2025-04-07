import React, { JSX, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import TaskListPage from './components/TaskListPage';

const App: React.FC = () => {
    const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

    useEffect(() => {
        if (isAuthenticated) {
            window.history.replaceState({}, document.title, "/tasklist");
        }
    }, [isAuthenticated]);

    if (isLoading) return <div>Loading authentication...</div>;

    return (
        <Routes>
            <Route
                path="/"
                element={
                    isAuthenticated ? (
                        <RedirectToTaskList />
                    ) : (
                        <div style={{ textAlign: 'center', marginTop: '100px' }}>
                            <h2>Please log in to access the Task Manager</h2>
                            <button onClick={() => loginWithRedirect()}>Log In</button>
                        </div>
                    )
                }
            />
            <Route
                path="/tasklist"
                element={
                    <ProtectedRoute>
                        <TaskListPage />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
};

const RedirectToTaskList: React.FC = () => {
    const navigate = useNavigate();
    React.useEffect(() => {
        navigate('/tasklist');
    }, [navigate]);
    return null;
};

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth0();

    if (isLoading) return <div>Loading authentication...</div>;
    if (!isAuthenticated) return <div>Access denied. Please login.</div>;

    return children;
};

export default App;