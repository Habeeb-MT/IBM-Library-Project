import './App.scss';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { Login } from './Pages/LogReg/Login';
import { Register } from "./Pages/LogReg/Register"
import { Home } from './Pages/Home/Home';
import { useContext } from 'react';
import { UserContext } from './Contexts/UserContext';
import { BooksTable } from './Pages/BooksTable';
import { UsersTable } from './Pages/UsersTable';
import { MyBooksTable } from './Pages/MyBooksTable';
import { DarkLightContext } from './Contexts/DarkLightContext';



function App() {


  const { currUser } = useContext(UserContext)

  const ProtectedRoute = ({ children }) => {
    if (!currUser) {
      return <Navigate to="/login" />
    }

    return children;
  }

  const { darkMode } = useContext(DarkLightContext)



  return (
    <div className={`App ${darkMode ? "dark-mode" : "light-mode"}`}>
      <Router>
        <Routes>
          <Route path='/' element={<ProtectedRoute> <Home /></ProtectedRoute>} />
          <Route path='/books' element={<BooksTable />} />
          <Route path='/:lid/books' element={<MyBooksTable />} />
          <Route path='/users' element={<UsersTable />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
