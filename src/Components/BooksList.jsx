import React, { useContext } from 'react'
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
import { AddBookForm } from './BooksListMini';

export const BooksList = () => {
    const { booksList } = useContext(BooksContext);
    const [rowPerPage, setRowsPerPage] = useState(10)
    const [page, setPage] = useState(0)
    const { isAdmin } = useContext(UserContext)
    return (
        <div>
            <div className="heading" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Typography variant='h5' style={{ textAlign: "center", margin: "20px 40px" }}>Books Lists</Typography>
                {isAdmin ? (
                    <Typography style={{ textAlign: "center", margin: "20px 40px" }}>
                        {/* <Button
                            variant="contained"
                            component={Link}
                            size="small"
                            // to={`/admin/books/addbook`}
                            style={{ background: "#2a9942" }}
                        >Add Book</Button> */}
                        <AddBookForm />
                    </Typography>
                ) : ("")}
            </div>
            {booksList.length >= 1 ? (
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
                                        <TableCell style={{ fontSize: "16px", color: "white" }} align="center">ISBN</TableCell>
                                        <TableCell style={{ fontSize: "16px", color: "white" }} align="center">Copies</TableCell>
                                        <TableCell style={{ fontSize: "16px", color: "white" }} align="center">Available</TableCell>
                                        <TableCell style={{ fontSize: "16px", color: "white" }} align="center">Price</TableCell>
                                        <TableCell style={{ fontSize: "16px", color: "white" }} align="center">Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {(rowPerPage > 0
                                        ? booksList.slice(page * rowPerPage, page * rowPerPage + rowPerPage)
                                        : booksList
                                    ).map((book, index) => (
                                        <TableRow
                                            key={book?.isbn}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell style={{ fontSize: "13px", color: "white" }} align="center">{index + 1}</TableCell>
                                            <TableCell style={{ fontSize: "13px", color: "white" }} align="center">{book?.bid}</TableCell>
                                            <TableCell component="th" scope="row" style={{ fontSize: "13px", color: "white" }} align="center">
                                                {book?.title}
                                            </TableCell>
                                            <TableCell style={{ fontSize: "13px", color: "white" }} align="center">{book?.author}</TableCell>
                                            <TableCell style={{ fontSize: "13px", color: "white" }} align="center">{book?.category}</TableCell>
                                            <TableCell style={{ fontSize: "13px", color: "white" }} align="center">{book?.publisher}</TableCell>
                                            <TableCell style={{ fontSize: "13px", color: "white" }} align="center">{book?.isbn}</TableCell>
                                            <TableCell style={{ fontSize: "13px", color: "white" }} align="center">{book?.copies}</TableCell>
                                            <TableCell style={{ fontSize: "13px", color: "white" }} align="center">{book?.available}</TableCell>
                                            <TableCell style={{ fontSize: "13px", color: "white" }} align="center">&#8377;{book?.price}</TableCell>
                                            <TableCell align="center">
                                                <Button
                                                    variant="contained"
                                                    component={Link}
                                                    size="small"
                                                    // to={isAdmin ? `/admin/books/${book?.isbn}/details` : `/student/books/${book?.isbn}/details`}
                                                    // onClick={() => navigate(`/books/${book.isbn}`)}
                                                    style={{ background: "#2a9942", margin: "1px", fontSize: "10px" }}
                                                    state={book}
                                                >View</Button>
                                                {isAdmin && <>
                                                    <Button
                                                        variant="contained"
                                                        component={Link}
                                                        size="small"
                                                        // to={`/admin/books/${book?.isbn}/details/updatebook`}
                                                        // onClick={() => navigate(`/books/${book.isbn}`)}
                                                        style={{ background: "#2a9942", margin: "1px", fontSize: "10px" }}
                                                        state={book}
                                                    >Edit</Button>
                                                    <Button
                                                        variant="contained"
                                                        component={Link}
                                                        size="small"
                                                        // onClick={() => deleteBook(book?.id)}
                                                        style={{ background: "red", margin: "1px", fontSize: "10px" }}
                                                        state={book}
                                                    >Delete</Button>
                                                </>}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                    }
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
                <Typography variant='h5'> No Books found!</Typography>
            )
            }
        </div>
    )
}
