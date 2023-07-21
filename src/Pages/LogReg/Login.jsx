import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./LogReg.scss"
// import logo from "../images/icons8-whatsapp-48.png"
import { auth } from '../../firebase/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { MdOutlineLightMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";
import { DarkLightContext } from '../../Contexts/DarkLightContext'

export const Login = () => {

    const { darkMode, toggleMode } = useContext(DarkLightContext)

    const navigate = useNavigate()
    const [err, setErr] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const email = e.target[0].value;
        const password = e.target[1].value;

        try {
            await signInWithEmailAndPassword(auth, email, password)
            navigate("/")
        }
        catch (error) {
            setErr(error)
        }
    }

    return (

        <div className={`fullContainerlogreg ${darkMode ? "dark-mode" : "light-mode"}`}>
            <div className="icon" onClick={() => {
                toggleMode();
            }}>
                {darkMode ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}
            </div>
            <div className="formContainer">
                <div className="formWrapper">
                    {/* <img src={logo} alt="" /> */}
                    <span className="logo">BookHive</span>
                    <span className="reg">Login</span>
                    <form onSubmit={handleSubmit} >
                        <input type="email" placeholder="email..." />
                        <input type="password" placeholder="password..." />
                        <button>sign in</button>
                        {err && <>
                            <span style={{ color: "red" }}>Something went wrong!</span>
                            {<p style={{ color: "red" }}>{err}</p>}
                        </>}
                    </form>
                    <p>
                        New user? <Link to="/register"><span>Signup</span></Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
