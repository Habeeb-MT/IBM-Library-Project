import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { Login } from './Pages/LogReg/Login';
import { Register } from "./Pages/LogReg/Register"
import { Home } from './Pages/Home/Home';
import { useContext } from 'react';
import { UserContext } from './Contexts/UserContext';
import { BooksTable } from './Pages/BooksTable';
import { UsersTable } from './Pages/UsersTable';



function App() {


  const { currUser } = useContext(UserContext)

  const ProtectedRoute = ({ children }) => {
    if (!currUser) {
      return <Navigate to="/login" />
    }

    return children;
  }


  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<ProtectedRoute> <Home /></ProtectedRoute>} />
          <Route path='/books' element={<BooksTable />} />
          <Route path='/users' element={<UsersTable />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;