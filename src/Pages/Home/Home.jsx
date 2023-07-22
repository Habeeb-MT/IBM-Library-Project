import React, { useContext, useState, useEffect } from 'react'
import { Navbar } from '../../Components/Navbar'
import { Box } from '../../Components/Box'
import "./Home.scss"
import { EditProfile } from '../../Components/EditProfile'
import { UserContext } from '../../Contexts/UserContext'
import { useLocation } from 'react-router-dom'

export const Home = () => {
  const location = useLocation();
  const { actUser } = useContext(UserContext);
  const [openEdit, setOpenEdit] = useState(false);
  // const { luid } = useContext(UserContext)

  useEffect(() => {
    setOpenEdit(location.state && location.state.openEdit ? location.state.openEdit : false);
  }, [location.state]);

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  return (
    <div className='home'>
      <Navbar />
      <Box />
      {openEdit && <EditProfile openEdit={openEdit} handleCloseEdit={handleCloseEdit} data={actUser} />}
    </div>
  )
}
