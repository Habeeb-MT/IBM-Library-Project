import React, { useContext, useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@mui/material';
import { UserContext } from '../Contexts/UserContext';
import { arrayUnion, doc, updateDoc, getDoc, arrayRemove, collection } from 'firebase/firestore';
import { db } from '../firebase/firebase';

export const ViewBook = ({ openView, handleCloseView }) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const { isAdmin } = useContext(UserContext);
    const { actUser } = useContext(UserContext)
    const [isBorrowed, setIsBorrowed] = useState(false);

    const location = useLocation()
    const [book, setBook] = useState({})
    useEffect(() => {
        setBook(location.state)
    }, [location.state])

    useEffect(() => {
        const checkBorrowedStatus = async () => {
            try {
                const borrowedBooksRef = doc(db, "BorrowedBooks", actUser.uid);
                const borrowedBooksDoc = await getDoc(borrowedBooksRef);

                if (borrowedBooksDoc.exists()) {
                    const borrowedBooksData = borrowedBooksDoc.data();
                    const borrowedBooks = borrowedBooksData.borrowed || [];

                    setIsBorrowed(borrowedBooks.includes(book?.bid));
                }
            } catch (error) {
                console.error('Error checking borrowed status:', error);
            }
        };

        if (!isAdmin && actUser) {
            checkBorrowedStatus();
        }
    }, [actUser, book, isAdmin]);

    const handleBorrow = async (book) => {
        try {
            const borrowedBooksRef = doc(db, "BorrowedBooks", actUser.uid);
            await updateDoc(borrowedBooksRef, {
                borrowed: arrayUnion(book?.bid)
            });
            setIsBorrowed(true);
            handleCloseView();
        } catch (error) {
            console.error('Error borrowing book:', error);
        }
    };

    const handleReturn = async (book) => {
        try {
            const borrowedBooksRef = doc(db, "BorrowedBooks", actUser.uid);
            await updateDoc(borrowedBooksRef, {
                borrowed: arrayRemove(book?.bid)
            });
            setIsBorrowed(false);
            handleCloseView();
        } catch (error) {
            console.error('Error returning book:', error);
        }
    };

    return (
        <div>
            <Dialog
                fullScreen={fullScreen}
                open={openView}
                onClose={handleCloseView}
                aria-labelledby="responsive-dialog-title"
                fullWidth
            >
                <DialogTitle id="responsive-dialog-title">
                    {book?.title}
                </DialogTitle>
                <DialogContent style={{ minHeight: "300px" }}>
                    <div className="bookContainer">
                        <div className="bookImg">
                            <img src={book?.photoURL} alt="" />
                            <span>{book?.title}</span>
                            <span>{book?.author}</span>
                            <span>{book?.publisher}</span>
                        </div>
                        <div className="bookInfo">
                            <p>{book?.description}</p>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    {!isAdmin && (
                        <>
                            {isBorrowed ? (
                                <Button
                                    variant="contained"
                                    component={Link}
                                    size="small"
                                    style={{ background: "red", color: "white", fontSize: "10px" }}
                                    onClick={() => handleReturn(book)}
                                >
                                    Return
                                </Button>
                            ) : (
                                <Button
                                    variant="contained"
                                    component={Link}
                                    size="small"
                                    style={{ background: "green", color: "white", fontSize: "10px" }}
                                    onClick={() => handleBorrow(book)}
                                >
                                    Borrow
                                </Button>
                            )}
                        </>
                    )}
                    <Button
                        variant="contained"
                        component={Link}
                        size="small"
                        style={{ background: "green", color: "white", fontSize: "10px" }}
                        onClick={() => handleBorrow(book)}
                    >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};



// import { collection, doc, getDoc, arrayRemove, arrayUnion, updateDoc } from 'firebase/firestore';
// import { db } from '../firebase/firebase';
// export const ViewBook = ({ openView, handleCloseView, book, actUser }) => {
//     const theme = useTheme();
//     const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
//     const { isAdmin } = useContext(UserContext);

//     const [isBorrowed, setIsBorrowed] = useState(false);

//     useEffect(() => {
//         const checkBorrowedStatus = async () => {
//             try {
//                 const borrowedBooksRef = doc(db, "BorrowedBooks", actUser.uid);
//                 const borrowedBooksDoc = await getDoc(borrowedBooksRef);

//                 if (borrowedBooksDoc.exists()) {
//                     const borrowedBooksData = borrowedBooksDoc.data();
//                     const borrowedBooks = borrowedBooksData.borrowed || [];

//                     setIsBorrowed(borrowedBooks.includes(book?.bid));
//                 }
//             } catch (error) {
//                 console.error('Error checking borrowed status:', error);
//             }
//         };

//         if (!isAdmin && actUser) {
//             checkBorrowedStatus();
//         }
//     }, [actUser, book, isAdmin]);

//     const handleBorrow = async (book) => {
//         try {
//             const borrowedBooksRef = doc(db, "BorrowedBooks", actUser.uid);
//             await updateDoc(borrowedBooksRef, {
//                 borrowed: arrayUnion(book?.bid)
//             });
//             setIsBorrowed(true);
//             handleCloseView();
//         } catch (error) {
//             console.error('Error borrowing book:', error);
//         }
//     };

//     const handleReturn = async (book) => {
//         try {
//             const borrowedBooksRef = doc(db, "BorrowedBooks", actUser.uid);
//             await updateDoc(borrowedBooksRef, {
//                 borrowed: arrayRemove(book?.bid)
//             });
//             setIsBorrowed(false);
//             handleCloseView();
//         } catch (error) {
//             console.error('Error returning book:', error);
//         }
//     };

//     return (
//         <div>
//             <Dialog
//                 fullScreen={fullScreen}
//                 open={openView}
//                 onClose={handleCloseView}
//                 aria-labelledby="responsive-dialog-title"
//             >
//                 <DialogTitle id="responsive-dialog-title">
//                     {book?.title}
//                 </DialogTitle>
//                 <DialogContent style={{ minHeight: "300px" }}>
//                     {/* ... */}
//                 </DialogContent>
//                 <DialogActions>
//                     {!isAdmin && (
//                         <>
//                             {isBorrowed ? (
//                                 <Button
//                                     variant="contained"
//                                     component={Link}
//                                     size="small"
//                                     style={{ background: "red", color: "white", fontSize: "10px" }}
//                                     onClick={() => handleReturn(book)}
//                                 >
//                                     Return
//                                 </Button>
//                             ) : (
//                                 <Button
//                                     variant="contained"
//                                     component={Link}
//                                     size="small"
//                                     style={{ background: "green", color: "white", fontSize: "10px" }}
//                                     onClick={() => handleBorrow(book)}
//                                 >
//                                     Borrow
//                                 </Button>
//                             )}
//                         </>
//                     )}
//                     {/* ... */}
//                 </DialogActions>
//             </Dialog>
//         </div>
//     );
// };

