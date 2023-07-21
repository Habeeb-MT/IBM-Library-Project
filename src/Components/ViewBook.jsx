import React, { useContext, useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@mui/material";
import { UserContext } from "../Contexts/UserContext";
import { arrayUnion, doc, updateDoc, getDoc, arrayRemove } from "firebase/firestore";
import { db } from "../firebase/firebase";
import "../css/mui.scss"
import { DarkLightContext } from "../Contexts/DarkLightContext";

export const ViewBook = ({ openView, handleCloseView }) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
    const { isAdmin } = useContext(UserContext);
    const { actUser } = useContext(UserContext);
    const [isBorrowed, setIsBorrowed] = useState(false);
    const { darkMode } = useContext(DarkLightContext)
    const location = useLocation();
    const [book, setBook] = useState({});
    useEffect(() => {
        setBook(location.state);
    }, [location.state]);

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
                console.error("Error checking borrowed status:", error);
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
                borrowed: arrayUnion(book?.bid),
            });
            setIsBorrowed(true);
            handleCloseView();
        } catch (error) {
            console.error("Error borrowing book:", error);
        }
    };

    const handleReturn = async (book) => {
        try {
            const borrowedBooksRef = doc(db, "BorrowedBooks", actUser.uid);
            await updateDoc(borrowedBooksRef, {
                borrowed: arrayRemove(book?.bid),
            });

            setIsBorrowed(false); // Update the isBorrowed state to reflect the book is returned
            handleCloseView(); // Close the dialog immediately

        } catch (error) {
            console.error("Error returning book:", error);
        }
    };

    return (
        <div >
            <Dialog
                className={`${darkMode ? "dark-mode" : "light-mode"}`}
                fullScreen={fullScreen}
                open={openView}
                onClose={handleCloseView}
                aria-labelledby="responsive-dialog-title"
                fullWidth
            >
                <DialogTitle id="responsive-dialog-title">
                    {/* {book?.title} */}
                </DialogTitle>
                <DialogContent style={{ minHeight: "300px" }}>
                    <div className="bookContainer">
                        <div className="bookHead">
                            <img src={book?.downloadURL} alt="" />
                            <div className="bookTitle">
                                <h2>{book?.title}</h2>
                                <h3>{book?.author}</h3>
                                <span>Publisher : {book?.publisher}</span>
                                <span>Category : {book?.category}</span>
                                <span>ISBN : {book?.isbn}</span>
                            </div>
                        </div>
                        <div className="bookInfo">
                            <p>{book?.descript}</p>
                            <span>Price : &#8377;{book?.price}</span>
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
                                    style={{
                                        background: "red",
                                        color: "white",
                                        fontSize: "10px",
                                    }}
                                    onClick={() => handleReturn(book)}
                                >
                                    Return
                                </Button>
                            ) : (
                                <Button
                                    variant="contained"
                                    component={Link}
                                    size="small"
                                    style={{
                                        background: "green",
                                        color: "white",
                                        fontSize: "10px",
                                    }}
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
                        onClick={handleCloseView}
                    >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

