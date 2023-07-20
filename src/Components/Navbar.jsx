import React, { useContext } from 'react'
import { UserContext } from '../Contexts/UserContext'
import { MdSearch } from "react-icons/md";
import Logo from "../Images/LogoLibrary.png"

export const Navbar = () => {

  const { currUser } = useContext(UserContext);
  const { actUser } = useContext(UserContext);

  // console.log(actUser)
  return (
    <div className='navbar'>
      <div className="logo">
        <div className='brand'>
          <img src={Logo} alt="" />
          <span>WISDOM LIBRARY</span>
        </div>
        <div className='pageName'>DASHBOARD</div>
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
