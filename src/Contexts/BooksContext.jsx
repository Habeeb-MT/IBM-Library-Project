import { collection, onSnapshot } from 'firebase/firestore';
import React, { createContext, useState, useEffect } from 'react'
import { db } from '../firebase/firebase';

export const BooksContext = createContext();
export const BooksContextProvider = ({ children }) => {

    const [booksList, setBooksList] = useState([]);
    const booksCollectionRef = collection(db, "Books");

    useEffect(() => {
        getBooksList()
        return () => getBooksList()
    }, [])
    // console.log(booksList)


    // const getBooksList = async () => {
    //     try {
    //         const user = await getDocs(booksCollectionRef);
    //         setBooksList(user.docs.map((doc) => ({
    //             ...doc.data(), id: doc.id
    //         })))
    //     }
    //     catch (error) {
    //         console.log(error)
    //     }
    // }

    const getBooksList = async () => {
        try {
            const unsubscribe = onSnapshot(booksCollectionRef, (querySnapshot) => {
                const books = querySnapshot.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                }));
                setBooksList(books);
            });

            return () => {
                // Unsubscribe from the real-time updates when the component unmounts
                unsubscribe();
            };
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <BooksContext.Provider value={{ booksList, setBooksList }}>
            {children}
        </BooksContext.Provider>
    )
}   