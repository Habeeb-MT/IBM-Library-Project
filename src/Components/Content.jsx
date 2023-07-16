import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from '../Contexts/UserContext'
import { UsersListMini } from './UsersListMini'
import { BooksListMini } from './BooksListMini'

export const Content = () => {

  const { currUser } = useContext(UserContext)

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
        <div className="stats">Total Users</div>
        <div className="stats">Borrowed Books</div>
        <div className="stats">Overdue Books</div>
      </div>
      <div className="bottomsection">
        {isAdmin && <div className="table"><UsersListMini /></div>}
        <div className="table"><BooksListMini /></div>
      </div>
    </div>
  )
}
