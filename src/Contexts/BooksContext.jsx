import { collection } from 'firebase/firestore';
import React, { createContext, useState, useEffect } from 'react'
import { db } from '../firebase/firebase';
import { getDocs } from 'firebase/firestore';

export const BooksContext = createContext();
export const BooksContextProvider = ({ children }) => {

    const [booksList, setBooksList] = useState([]);
    const booksCollectionRef = collection(db, "Books");

    useEffect(() => {
        getBooksList()
        return () => getBooksList()
    }, [])
    // console.log(booksList)


    const getBooksList = async () => {
        try {
            const user = await getDocs(booksCollectionRef);
            setBooksList(user.docs.map((doc) => ({
                ...doc.data(), id: doc.id
            })))
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <BooksContext.Provider value={{ booksList }}>
            {children}
        </BooksContext.Provider>
    )
}   