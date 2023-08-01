import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from '../Contexts/UserContext'
import { UsersListMini } from './UsersListMini'
import { BooksListMini } from './BooksListMini'
import { FaUsers } from 'react-icons/fa'
import { FaBookOpen } from "react-icons/fa";
import { FaBookDead } from 'react-icons/fa'
import { MyBooksListMini } from './MyBooksListMini'
export const Content = () => {

  const { currUser } = useContext(UserContext)

  const { usersList } = useContext(UserContext)
  const filteredUsers = usersList.filter((user) => user.role !== "admin")

  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
  const formattedDateTime = currentDateTime.toLocaleString('en-US', options);
  const { isAdmin } = useContext(UserContext)
  return (
    <div className='content'>
      <div className="topsection">
        <h3>Hello <span>{currUser.displayName}</span></h3>
        <h5>{formattedDateTime}</h5>
      </div>
      <div className="middlesection">
        <div className="stats">
          <div className="flexicon">
            <h2>{filteredUsers.length}</h2>
            <div className="icon"><FaUsers /></div>
          </div>
          <p>Total Users</p>
        </div>
        <div className="stats">
          <div className="flexicon">
            <h2>225</h2>
            <div className="icon"><FaBookOpen /></div>
          </div>
          <p>Borrowed Books</p>
        </div>
        <div className="stats">
          <div className="flexicon">
            <h2>73</h2>
            <div className="icon"><FaBookDead /></div>
          </div>
          <p>Overdue Books</p>
        </div>
      </div>
      <div className="bottomsection">
        {isAdmin && <div className="table userTable"><UsersListMini /></div>}
        <div className="table bookTable"><BooksListMini /></div>
        {!isAdmin && <div className="table mybookTable"><MyBooksListMini /></div>}
      </div>
    </div>
  )
}
