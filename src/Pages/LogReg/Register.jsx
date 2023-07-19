import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AddAvatar from "../../Images/addAvatar.png"
import "./LogReg.scss"
// import logo from "../images/icons8-whatsapp-48.png"
import { auth, db } from '../../firebase/firebase'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { storage } from '../../firebase/firebase'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { doc, setDoc } from 'firebase/firestore'
import { MdOutlineLightMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";



export const Register = () => {

    const navigate = useNavigate()

    const [err, setErr] = useState(null)


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
                    })
                    await setDoc(doc(db, "BorrowedBooks", userId), {
                        borrowed: []
                    })

                    navigate('/')
                }
            );


        } catch (error) {
            setErr(error)
            console.log(error)
        }
    }

    return (
        <div className="fullContainer">
            <div className="icon"><MdOutlineDarkMode /></div>
            <div className="formContainer">
                <div className="formWrapper">
                    {/* <img src={logo} alt="" /> */}
                    <span className="logo">BookHive</span>
                    <span className="reg">Register</span>
                    <form onSubmit={handleSubmit}>
                        <input type="text" placeholder="Username..." />
                        <input type="email" placeholder="email..." />
                        <input type="password" placeholder="password..." />
                        <input type="file" id="file" style={{ display: 'none' }} />
                        <label htmlFor="file">
                            <img src={AddAvatar} alt="" />
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

