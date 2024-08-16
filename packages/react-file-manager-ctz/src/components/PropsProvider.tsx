import React, { createContext, useState } from 'react';

// Create a context
export const PropsContext = createContext();

// Create the provider component
export const PropsProvider = ({ children, initialValue }) => {

    return (
        <PropsContext.Provider value={initialValue}>
            {children}
        </PropsContext.Provider>
    );
};
