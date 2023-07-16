import React, { useContext } from "react";
import { TbSettings, TbUsers, TbLogout, TbBooks, TbRefresh, TbBook } from "react-icons/tb";
import { MdOutlineNotifications, MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import { auth } from "../firebase/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Contexts/UserContext";
import { PiBooks } from "react-icons/pi";
export const SideNavbar = () => {
    const { isAdmin } = useContext(UserContext)
    const navigate = useNavigate()

    const handleSignOut = () => {
        signOut(auth)
        navigate("/")
    }

    return (
        <div className="sidenavbar">
            <div className="features">
                <div className="icon">
                    <TbRefresh />
                </div>
                <div className="icon">
                    <MdOutlineNotifications />
                </div>
                <div className="icon">
                    <PiBooks onClick={() => { navigate("/books") }} />
                </div>
                {isAdmin ? <div className="icon">
                    <TbUsers onClick={() => { navigate("/users") }} />
                </div> : <div className="icon">
                    <TbBook />
                </div>}
            </div>
            <div className="settings">
                <div className="icon">
                    <MdOutlineLightMode />
                </div>
                <div className="icon">
                    <MdOutlineDarkMode />
                </div>
                <div className="icon">
                    <TbSettings />
                </div>
                <div className="icon">
                    <TbLogout onClick={handleSignOut} />
                </div>
            </div>
        </div>
    );
};
