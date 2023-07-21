import React, { useContext, useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { BooksContext } from '../Contexts/BooksContext';
import { UserContext } from '../Contexts/UserContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

// ... (previous imports and code)

export const MyBooksListMini = () => {
    const { booksList } = useContext(BooksContext);
    const { actUser } = useContext(UserContext);

    const [myBooks, setMyBooks] = useState([]);

    useEffect(() => {
        const fetchBorrowedBooks = async (userId) => {
            try {
                const borrowedBooksRef = doc(db, 'BorrowedBooks', userId);
                const borrowedBooksDoc = await getDoc(borrowedBooksRef);

                if (borrowedBooksDoc.exists()) {
                    const borrowedBooksData = borrowedBooksDoc.data();
                    const borrowedBooks = borrowedBooksData.borrowed || [];

                    setMyBooks(borrowedBooks);
                } else {
                    console.log('Borrowed books not found for user:', userId);
                }
            } catch (error) {
                console.error('Error fetching borrowed books:', error);
            }
        };
        fetchBorrowedBooks(actUser?.uid);
    }, []);

    const limitedBooksList = myBooks.slice(0, 4);

    return (
        <div>
            {limitedBooksList.length >= 1 ? ( // Use limitedBooksList instead of booksList
                <>
                    <div className='list'>
                        <TableContainer component={Paper} style={{ background: "var(--bg1)" }}>
                            <Typography variant="h6" style={{ textAlign: "center", color: "var(--textColor)" }}>
                                My Books
                            </Typography>
                            <Table sx={{ minWidth: 350 }} aria-label="simple table">
                                <TableHead className="tablehead">
                                    <TableRow>
                                        <TableCell style={{ fontSize: "12px", color: "var(--textColor)" }} align="center">
                                            SI
                                        </TableCell>
                                        {window.innerWidth >= 615 && (
                                            <TableCell style={{ fontSize: "12px", color: "var(--textColor)" }} align="center">
                                                Book-ID
                                            </TableCell>
                                        )}
                                        <TableCell style={{ fontSize: "12px", color: "var(--textColor)" }} align="center">
                                            Title
                                        </TableCell>
                                        <TableCell className='minitablet' style={{ fontSize: "12px", color: "var(--textColor)" }} align="center">
                                            Category
                                        </TableCell>
                                        <TableCell style={{ fontSize: "12px", color: "var(--textColor)" }} align="center">
                                            Due Date
                                        </TableCell>
                                        <TableCell style={{ fontSize: "12px", color: "var(--textColor)" }} align="center">
                                            Actions
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {limitedBooksList.map((bookId, index) => {
                                        const book = booksList.find((item) => item?.bid === bookId);
                                        if (book) {
                                            return (
                                                <TableRow
                                                    key={book.bid}
                                                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                                >
                                                    <TableCell style={{ fontSize: "12px", color: "var(--textColor)" }} align="center">
                                                        {index + 1}
                                                    </TableCell>
                                                    {window.innerWidth >= 615 && (
                                                        <TableCell component="th" scope="row" align="center" style={{ fontSize: "12px", color: "var(--textColor)" }}>
                                                            {book.bid}
                                                        </TableCell>
                                                    )}
                                                    <TableCell style={{ fontSize: "12px", color: "var(--textColor)" }} align="center">
                                                        {book.title}
                                                    </TableCell>
                                                    <TableCell className='minitablet' style={{ fontSize: "12px", color: "var(--textColor)" }} align="center">
                                                        {book.category}
                                                    </TableCell>
                                                    <TableCell style={{ fontSize: "12px", color: "var(--textColor)" }} align="center">
                                                        {book.due}
                                                    </TableCell>
                                                    <TableCell style={{ fontSize: "12px", color: "var(--textColor)" }} align="center">
                                                        ---
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        }
                                        return null;
                                    })}
                                </TableBody>
                            </Table>
                            <div className="button">
                                <Button
                                    variant="contained"
                                    component={Link}
                                    size="small"
                                    to={`/${actUser.uid}/books`}
                                    style={{ background: "var(--bg2)", margin: "5px", color: "var(--textColor)", fontSize: "10px" }}
                                >
                                    See All
                                </Button>
                            </div>
                        </TableContainer>
                    </div>
                </>
            ) : (
                <Typography variant='h5' style={{ textAlign: "center", color: "var(--textColor)" }}>No Borrowed Books!</Typography>
            )}
        </div>
    );
};

