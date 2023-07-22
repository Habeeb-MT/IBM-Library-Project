import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AddAvatar from "../../Images/addAvatar.png"
import "./LogReg.scss"
import { auth, db } from '../../firebase/firebase'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { storage } from '../../firebase/firebase'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { doc, setDoc } from 'firebase/firestore'
import { MdOutlineLightMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";
import { DarkLightContext } from '../../Contexts/DarkLightContext'
import logo from "../../Images/LogoLibrary.png"
import { BiImageAdd } from "react-icons/bi";
import { UserContext } from '../../Contexts/UserContext'

export const Register = () => {
    const { darkMode, toggleMode } = useContext(DarkLightContext)
    const navigate = useNavigate()

    const [err, setErr] = useState(null)
    const [luid, setLuid] = useState(0);

    const [openEdit, setOpenEdit] = useState(false);
    const handleCloseEdit = () => {
        setOpenEdit(false);
    };

    const { usersList } = useContext(UserContext)

    useEffect(() => {
        const getLid = () => {
            let max = -99999;
            usersList.map((user, key) => {
                if (user.lid)
                    max = (Math.max(user.lid, max));
            });
            setLuid(max + 1);
        };

        getLid(); // Call the function after its definition.

    }, [usersList]); // Include usersList in the dependency array to update luid when usersList changes.


    const handleSubmit = async (e) => {
        e.preventDefault()

        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const pic = e.target[3].files[0];

        try {

            const res = await createUserWithEmailAndPassword(auth, email, password);
            const userId = res.user.uid

            const storageRef = ref(storage, `profilepics/${userId}`);

            const uploadTask = uploadBytesResumable(storageRef, pic);


            uploadTask.on('state_changed', null,
                (error) => {
                    console.log(error)
                    setErr(error)
                },
                async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

                    await updateProfile(res.user, {
                        displayName,
                        photoURL: downloadURL,
                    })

                    await setDoc(doc(db, "Users", userId), {
                        uid: userId,
                        displayName,
                        email,
                        photoURL: downloadURL,
                        role: "student",
                        password: password,
                        lid: luid,
                    })
                    await setDoc(doc(db, "BorrowedBooks", userId), {
                        borrowed: []
                    })

                    setOpenEdit(true)
                    navigate('/', { state: { openEdit: true } });

                }
            );


        } catch (error) {
            setErr(error)
            console.log(error)
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
                    <span className="logo">
                        <img src={logo} alt="" />
                        <span>Wisom Library</span>
                    </span>
                    <span className="reg">Register</span>
                    <form onSubmit={handleSubmit} className='logregform'>
                        <input type="text" placeholder="Username..." />
                        <input type="email" placeholder="email..." />
                        <input type="password" placeholder="password..." />
                        <input type="file" id="file" style={{ display: 'none' }} />
                        <label htmlFor="file">
                            <BiImageAdd style={{ fontSize: "20px" }} />
                            <span>Add Profile Pic</span>
                        </label>
                        <button>sign up</button>
                        {err && <>
                            <span style={{ color: "red" }}>Something went wrong!</span>
                            <p style={{ color: "red" }}>{err}</p>
                        </>}
                    </form>
                    <p>
                        Already a user? <Link to="/login"><span>Login</span></Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

