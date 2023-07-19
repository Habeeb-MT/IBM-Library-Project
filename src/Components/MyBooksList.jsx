import React, { useContext, useEffect } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography, TablePagination, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { BooksContext } from '../Contexts/BooksContext';
import { UserContext } from '../Contexts/UserContext';
import { db } from '../firebase/firebase';
import { arrayRemove, deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { AddBookForm } from './BooksListMini';
import { EditBookForm } from './EditBookForm';
import { ViewBook } from './ViewBook';

export const MyBooksList = () => {

    const { booksList } = useContext(BooksContext);
    const [rowPerPage, setRowsPerPage] = useState(10)
    const [page, setPage] = useState(0)
    const { isAdmin } = useContext(UserContext)
    const [isBorrowed, setIsBorrowed] = useState(false);
    const { actUser } = useContext(UserContext)

    const [openView, setOpenView] = useState(false)

    const [book, setBook] = useState(null)
    const [myBooks, setMyBooks] = useState([])

    const handleCloseView = () => {
        setOpenView(false);
    };


    useEffect(() => {
        const fetchBorrowedBooks = async (userId) => {
            try {
                const borrowedBooksRef = doc(db, 'BorrowedBooks', userId);
                const borrowedBooksDoc = await getDoc(borrowedBooksRef);

                if (borrowedBooksDoc.exists()) {
                    const borrowedBooksData = borrowedBooksDoc.data();
                    const borrowedBooks = borrowedBooksData.borrowed || [];

                    // console.log('Borrowed books:', borrowedBooks);
                    setMyBooks(borrowedBooks);
                } else {
                    console.log('Borrowed books not found for user:', userId);
                }
            } catch (error) {
                console.error('Error fetching borrowed books:', error);
            }
        };
        fetchBorrowedBooks(actUser?.uid)
    }, [])
    // console.log(myBooks)

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

    const handleReturn = async (book) => {
        try {
            const borrowedBooksRef = doc(db, "BorrowedBooks", actUser.uid);
            await updateDoc(borrowedBooksRef, {
                borrowed: arrayRemove(book?.bid),
            });

            // Update the myBooks state by removing the returned book from the array
            setMyBooks((prevMyBooks) => prevMyBooks.filter((b) => b !== book?.bid));

            setIsBorrowed(false);
        } catch (error) {
            console.error('Error returning book:', error);
        }
    };

    return (
        <div>
            <div className="heading" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Typography variant='h5' style={{ textAlign: "center", margin: "20px 40px" }}>Borrowed Books</Typography>
            </div>
            {booksList.length >= 1 && myBooks.length >= 1 ? (
                <>
                    <div className='table' style={{ padding: "20px" }}>
                        <TableContainer component={Paper} style={{ background: "#434141" }} >

                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead className='tablehead'>
                                    <TableRow>
                                        <TableCell style={{ fontSize: "16px", color: "white" }} align="center">SI</TableCell>
                                        <TableCell style={{ fontSize: "16px", color: "white" }} align="center">Book-ID</TableCell>
                                        <TableCell style={{ fontSize: "16px", color: "white" }} align="center">Title</TableCell>
                                        <TableCell style={{ fontSize: "16px", color: "white" }} align="center">Author</TableCell>
                                        <TableCell style={{ fontSize: "16px", color: "white" }} align="center">Category</TableCell>
                                        <TableCell style={{ fontSize: "16px", color: "white" }} align="center">Publisher</TableCell>
                                        <TableCell style={{ fontSize: "16px", color: "white" }} align="center">Available</TableCell>
                                        <TableCell style={{ fontSize: "16px", color: "white" }} align="center">Price</TableCell>
                                        <TableCell style={{ fontSize: "16px", color: "white" }} align="center">Due Date</TableCell>
                                        <TableCell style={{ fontSize: "16px", color: "white" }} align="center">Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {(rowPerPage > 0
                                        ? booksList.slice(page * rowPerPage, page * rowPerPage + rowPerPage)
                                        : booksList
                                    ).map((book, index) => {
                                        const isBorrowed = myBooks.includes(book?.bid);

                                        if (isBorrowed) {
                                            return (
                                                <TableRow
                                                    key={book?.isbn}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    {/* Render the table cells for the book details */}
                                                    <TableCell style={{ fontSize: "13px", color: "white" }} align="center">{index + 1}</TableCell>
                                                    <TableCell style={{ fontSize: "13px", color: "white" }} align="center">{book?.bid}</TableCell>
                                                    <TableCell component="th" scope="row" style={{ fontSize: "13px", color: "white" }} align="center">
                                                        {book?.title}
                                                    </TableCell>
                                                    <TableCell style={{ fontSize: "13px", color: "white" }} align="center">{book?.author}</TableCell>
                                                    <TableCell style={{ fontSize: "13px", color: "white" }} align="center">{book?.category}</TableCell>
                                                    <TableCell style={{ fontSize: "13px", color: "white" }} align="center">{book?.publisher}</TableCell>
                                                    <TableCell style={{ fontSize: "13px", color: "white" }} align="center">{book?.available}</TableCell>
                                                    <TableCell style={{ fontSize: "13px", color: "white" }} align="center">&#8377;{book?.price}</TableCell>
                                                    <TableCell style={{ fontSize: "13px", color: "white" }} align="center">{book?.due}</TableCell>
                                                    <TableCell align="center">
                                                        <Button
                                                            variant="contained"
                                                            component={Link}
                                                            size="small"
                                                            onClick={() => {
                                                                setOpenView(true);
                                                            }}
                                                            style={{ background: "#2a9942", margin: "1px", fontSize: "10px" }}
                                                            state={book}
                                                        >
                                                            View
                                                        </Button>
                                                        <Button
                                                            variant="contained"
                                                            component={Link}
                                                            size="small"
                                                            onClick={() => {
                                                                handleReturn(book);
                                                            }}
                                                            style={{ background: "#2a9942", margin: "1px", fontSize: "10px" }}
                                                        >
                                                            Return
                                                        </Button>
                                                        <ViewBook openView={openView} handleCloseView={handleCloseView} book={book} />
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        }

                                        return null; // Skip rendering for non-borrowed books
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            onRowsPerPageChange={(e) => {
                                setRowsPerPage(parseInt(e.target.value, 10))
                                setPage(0)
                            }}
                            component="div"
                            count={booksList.length}
                            rowsPerPage={rowPerPage}
                            page={page}
                            onPageChange={(e, newPage) => setPage(newPage)}
                            style={{ color: "white" }}
                        />

                    </div>


                </>
            ) : (
                <Typography variant='h5'> No Borrowed Books!</Typography>
            )
            }
        </div>
    )
}
