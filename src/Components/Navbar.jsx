import React, { useContext } from 'react'
import { UserContext } from '../Contexts/UserContext'
import { MdSearch } from "react-icons/md";

export const Navbar = () => {

  const { currUser } = useContext(UserContext);
  const { actUser } = useContext(UserContext);

  // console.log(actUser)
  return (
    <div className='navbar'>
      <div className="logo">
        <span className='brand'>LOGO</span>
        <span>DASHBOARD</span>
      </div>

      <div className="searchbar">
        <input type="text" placeholder='Search...' />
        {/* <MdSearch /> */}

      </div>

      <div className="user">
        <div className="userinfo">
          <span className='name'>{currUser?.displayName}</span>
          <span className='role'>{actUser?.role}</span>
        </div>
        <img src={currUser?.photoURL} alt="" />
      </div>
    </div>
  )
}
