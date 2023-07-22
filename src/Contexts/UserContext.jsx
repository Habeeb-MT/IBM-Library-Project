import React from 'react'
import { useEffect, useState, createContext } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase/firebase'
import { db } from '../firebase/firebase'
import { getDocs } from 'firebase/firestore'
import { collection } from 'firebase/firestore'


export const UserContext = createContext()

export const UserContextProvider = ({ children }) => {

    const [currUser, setCurrUser] = useState({})

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            setCurrUser(user)
        })

        return () => {
            unsub()
        }
    }, [])

    // new lines
    const userCollectionRef = collection(db, "Users")
    const [usersList, setUsersList] = useState([])


    const [actUser, setActUser] = useState(null)
    const [isAdmin, setIsAdmin] = useState(false)



    useEffect(() => {
        getUserList()
        return () => getUserList()
    }, [])
    // console.log(usersList)


    const getUserList = async () => {
        try {
            const user = await getDocs(userCollectionRef);
            setUsersList(user.docs.map((doc) => ({
                ...doc.data(), id: doc.id
            })))
        }
        catch (error) {
            console.log(error)
        }
    }


    const getActUser = async () => {
        usersList.map((each, index) => {
            if (each && currUser && each.email === currUser.email)
                return setActUser(each)
            else
                return null
        })
    }
    // console.log(actUser)
    // console.log(currUser.email)

    useEffect(() => {
        getActUser()
    }, [usersList, actUser, currUser])



    useEffect(() => {
        setIsAdmin(actUser && actUser.role === "admin")
    }, [actUser])



    return (
        <UserContext.Provider value={{ currUser, isAdmin, actUser, usersList }}>
            {children}
        </UserContext.Provider>
    )
}
