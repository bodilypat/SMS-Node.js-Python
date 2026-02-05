//src/contextt/NotificationContext.jsx 

import React, { createContext, useCallback, useState } from 'react';

// Create context 
export const NotificationContext = createContext();

// Notification types (optional but recommended)
export const NOTIFICATION_TYPES = {
    SUCCESS: 'success',
    ERROR: 'error',
    INFO: 'info',
    WARNING: 'warning',
};

let idCounter = 0;

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);

    // Add notification 
    const addNotification = useCallback((message, type = NOTIFICATION_TYPES.INFO, duration = 3000) => {
        const id = idCounter++;

        setNotifications((prevNotifications) => [
            ...prevNotifications,
            { id, message, type },
        ]);

        // Auto remove notification 
        if (duration > 0) {
            setTimeout(() => {
                removeNotification(id);
            }, duration);
        }
    }, []);

    // Remove notification
    const removeNotification = useCallback((id) => {
        setNotifications((prevNotifications) =>
            prevNotifications.filter((notification) => notification.id !== id)
        );
    }, []);

    // Clear all notifications
    const clearNotifications = useCallback(() => {
        setNotifications([]);
    }, []);

    return (
        <NotificationContext.Provider 
            value={{ 
                notifications,
                addNotification,
                removeNotification,
                clearNotifications,
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
};

export default NotificationContext;

