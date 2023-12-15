import React, { createContext, useState } from 'react';

export const MapCenterContext = createContext();

export const MapCenterProvider = ({ children }) => {
    const [mapCenter, setMapCenter] = useState([37.7814181, -122.4447141]);

    return (
        <MapCenterContext.Provider value={{ mapCenter, setMapCenter }}>
            {children}
        </MapCenterContext.Provider>
    );
};