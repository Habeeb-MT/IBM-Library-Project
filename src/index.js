import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { UserContextProvider } from './Contexts/UserContext';
import { BooksContextProvider } from './Contexts/BooksContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <UserContextProvider>
   <BooksContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
   </BooksContextProvider>
 </UserContextProvider>
);
