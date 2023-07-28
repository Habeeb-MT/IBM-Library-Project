import React, { useContext, useState } from 'react'
import { UserContext } from '../Contexts/UserContext'
import { MdSearch } from "react-icons/md";
import Logo from "../Images/LogoLibrary.png"
import { ViewProfile } from './ViewProfile';

export const Navbar = () => {

  const { currUser } = useContext(UserContext);
  const { actUser } = useContext(UserContext);



  const [openView, setOpenView] = useState(false)
  const handleCloseView = () => {
    setOpenView(false);
  };

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
        <img src={currUser?.photoURL} alt="" onClick={() => setOpenView(true)} style={{ cursor: "pointer" }} />
        <ViewProfile openView={openView} handleCloseView={handleCloseView} />
      </div>
    </div>
  )
}
