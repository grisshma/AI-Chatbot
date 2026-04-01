import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Chat from './pages/Chat';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-950">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
  
  if (!user) return <Navigate to="/login" />;
  return children;
};

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <div className="min-h-screen transition-colors duration-300">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route 
                path="/" 
                element={
                  <ProtectedRoute>
                    <Chat />
                  </ProtectedRoute>
                } 
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
