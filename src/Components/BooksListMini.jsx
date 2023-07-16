import React, { useContext, useState } from 'react'
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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { UserContext } from '../Contexts/UserContext';


export const AddBookForm = () => {

    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button
                variant="contained"
                component={Link}
                size="small"
                onClick={handleClickOpen}
                style={{ background: "white", margin: "5px", color: "black", fontSize: "10px" }}
            >Add Book</Button>

            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Add Book"}
                </DialogTitle>
                <DialogContent style={{ minHeight: "300px" }}>
                    <form className='form' >
                        <input type="text" placeholder="Title..." />
                        <input type="text" placeholder="Author..." />
                        <input type="text" placeholder="Category..." />
                        <input type="text" placeholder="Publisher..." />
                        <input type="text" placeholder="ISBN..." />
                        <input type="number" placeholder="Copies..." />
                        <input type="text" placeholder="Book-ID..." />
                        <input type="number" placeholder="Price..." />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        component={Link}
                        size="small"
                        onClick={handleClose}
                        style={{ background: "green", margin: "5px", color: "white", fontSize: "10px" }}
                    >Add</Button>
                    <Button
                        variant="contained"
                        component={Link}
                        size="small"
                        onClick={handleClose}
                        style={{ background: "red", margin: "5px", color: "white", fontSize: "10px" }}
                    >Discard</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}


export const BooksListMini = () => {

    const { booksList } = useContext(BooksContext);
    const { isAdmin } = useContext(UserContext)

    return (
        <div>
            {booksList.length >= 1 ? (
                <>
                    <div className='List'>
                        <TableContainer component={Paper} style={{ background: "#434141" }} >
                            <Typography variant='h6' style={{ textAlign: "center", color: "white" }}>Books List</Typography>
                            <Table sx={{ minWidth: 350 }} aria-label="simple table" >
                                <TableHead className='tablehead' >
                                    <TableRow>
                                        <TableCell style={{ fontSize: "12px", color: "white" }} align='center'>SI</TableCell>
                                        <TableCell style={{ fontSize: "12px", color: "white" }} align='center'>Book-ID</TableCell>
                                        <TableCell style={{ fontSize: "12px", color: "white" }} align="center">Title</TableCell>
                                        <TableCell style={{ fontSize: "12px", color: "white" }} align="center">Category</TableCell>
                                        <TableCell style={{ fontSize: "12px", color: "white" }} align="center">Available</TableCell>
                                        <TableCell style={{ fontSize: "12px", color: "white" }} align='center'>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody >
                                    {booksList.map((book, index) => (
                                        <TableRow
                                            key={book.isbn}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell style={{ fontSize: "12px", color: "white" }} align='center'>{index + 1}</TableCell>
                                            <TableCell component="th" scope="row" align='center' style={{ fontSize: "12px", color: "white" }}>
                                                {book.bid}
                                            </TableCell>
                                            <TableCell style={{ fontSize: "12px", color: "white" }} align="center">{book.title}</TableCell>
                                            <TableCell style={{ fontSize: "12px", color: "white" }} align="center">{book.category}</TableCell>
                                            <TableCell style={{ fontSize: "12px", color: "white" }} align="center">{book.available}</TableCell>
                                            <TableCell style={{ fontSize: "12px", color: "white" }} align="center">---</TableCell>
                                        </TableRow>

                                    ))
                                    }
                                </TableBody>
                            </Table>
                            <div className="button">
                                {isAdmin && <AddBookForm />}
                                <Button
                                    variant="contained"
                                    component={Link}
                                    size="small"
                                    to={"/books"}
                                    style={{ background: "transparent", margin: "5px", color: "white", fontSize: "10px" }}
                                >See All</Button>
                            </div>
                        </TableContainer>

                    </div>


                </>
            ) : (
                <Typography variant='h6'> No Users found!</Typography>
            )
            }
        </div>
    )
}
