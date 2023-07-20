import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { UserContextProvider } from './Contexts/UserContext';
import { BooksContextProvider } from './Contexts/BooksContext';
import { DarkLightProvider } from './Contexts/DarkLightContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <DarkLightProvider>
    <UserContextProvider>
      <BooksContextProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </BooksContextProvider>
    </UserContextProvider>
  </DarkLightProvider>
);
