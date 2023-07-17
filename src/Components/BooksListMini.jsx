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
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase/firebase';


export const AddBookForm = ({ open, handleClose }) => {

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const bookListCollectionRef = collection(db, "Books")

    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [category, setCat] = useState("")
    const [publisher, setPub] = useState("")
    const [isbn, setIsbn] = useState("")
    const [copies, setCopies] = useState("")
    const [available, setAvai] = useState("")
    const [bid, setBid] = useState("")
    const [price, setPrice] = useState("")

    const handleSubmit = async (e) => {
        if (title === "" || author === "" || category === "" || publisher === "" || isbn === 0 || copies === 0 || bid === "" || price === 0) {
            // Handle the validation error, e.g., show an error message
            return;
        }

        const obj = { title, author, category, publisher, isbn, copies, available, bid, price };
        const createBook = async () => {
            await addDoc(bookListCollectionRef, obj)
        }
        createBook()
        handleClose()

    }

    return (
        <div>
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
                    <form className='form'  >
                        <input type="text" placeholder="Title..." onChange={e => setTitle(e.target.value)} />
                        <input type="text" placeholder="Author..." onChange={e => setAuthor(e.target.value)} />
                        <input type="text" placeholder="Category..." onChange={e => setCat(e.target.value)} />
                        <input type="text" placeholder="Publisher..." onChange={e => setPub(e.target.value)} />
                        <input type="text" placeholder="ISBN..." onChange={e => setIsbn(e.target.value)} />
                        <input type="number" placeholder="Copies..." onChange={e => setCopies(e.target.value)} />
                        <input type="text" placeholder="Book-ID..." onChange={e => setBid(e.target.value)} />
                        <input type="number" placeholder="Price..." onChange={e => setPrice(e.target.value)} />

                        <DialogActions>
                            <Button
                                variant="contained"
                                component={Link}
                                size="small"
                                onClick={handleSubmit}
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
                    </form>
                </DialogContent>

            </Dialog>
        </div>
    )
}


export const BooksListMini = () => {

    const { booksList } = useContext(BooksContext);
    const { isAdmin } = useContext(UserContext)

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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
                                {isAdmin && <>
                                    <Button
                                        variant="contained"
                                        component={Link}
                                        size="small"
                                        onClick={handleClickOpen}
                                        style={{ background: "white", margin: "5px", color: "black", fontSize: "10px" }}
                                    >Add Book</Button>
                                    <AddBookForm open={open} handleClose={handleClose} /></>}
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
