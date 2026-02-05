//src/components/protected/RoleBaseRoute.jsx 

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

/* 
** RoleBaseRoute 
** - Protects routes base on user roles 
 */
const RoleBaseRoute = ({ allowedRoles = [], redirectPath = '/unauthorized' }) => {
    const { user, isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        // If user is not authenticated, redirect to login
        return <Navigate to="/login" replace />;
    }

    if (!allowedRoles.includes(user.role)) {
        // If user does not have the required role, redirect to unauthorized page
        return <Navigate to={redirectPath} replace />;
    }

    // If user is authenticated and has the required role, render the child routes
    return <Outlet />;
};

export default RoleBaseRoute;

