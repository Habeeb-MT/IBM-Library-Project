import React, { useContext, useEffect, useState } from "react";
import { TbSettings, TbUsers, TbLogout, TbHome, TbBook } from "react-icons/tb";
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

    const [darkMode, setDarkMode] = useState(false);

    const toggleMode = () => {
        setDarkMode(!darkMode);
    };

    const { actUser } = useContext(UserContext)

    return (
        <div className="sidenavbar">
            <div className="features">
                <div className="icon">
                    <TbHome onClick={() => navigate("/")} />
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
                    <TbBook onClick={() => { navigate(`/${actUser?.lid}/books`) }} />
                </div>}
            </div>
            <div className="settings">
                <div className="icon" onClick={toggleMode}>
                    {darkMode ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}
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
