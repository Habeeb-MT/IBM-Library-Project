
import React, { createContext, useState, useContext } from "react";


// export const useTheme = () => {
//     return useContext(DarkLightContext);
// };

export const DarkLightContext = createContext();

export const DarkLightProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false);

    const toggleMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <DarkLightContext.Provider value={{ darkMode, toggleMode }}>
            {children}
        </DarkLightContext.Provider>
    );
};
