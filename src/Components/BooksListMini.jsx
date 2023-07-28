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
import { db, storage } from '../firebase/firebase';
import { RiImageAddFill } from "react-icons/ri";
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { DarkLightContext } from '../Contexts/DarkLightContext';
import "../css/mui.scss"

export const AddBookForm = ({ open, handleClose }) => {

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const bookListCollectionRef = collection(db, "Books")
    const [err, setErr] = useState(false)
    const { darkMode } = useContext(DarkLightContext)

    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [category, setCat] = useState("")
    const [publisher, setPub] = useState("")
    const [isbn, setIsbn] = useState("")
    const [copies, setCopies] = useState("")
    const [available, setAvai] = useState("")
    const [bid, setBid] = useState("")
    const [price, setPrice] = useState("")
    const [descript, setDescrit] = useState("")
    const [pic, setPic] = useState(null);

    const handleSubmit = async (e) => {
        if (title === "" || author === "" || category === "" || publisher === "" || isbn === 0 || copies === 0 || bid === "" || price === 0) {
            return;
        }

        try {


            const storageRef = ref(storage, `coverpages/${bid}`);

            const uploadTask = uploadBytesResumable(storageRef, pic);


            uploadTask.on('state_changed', null,
                (error) => {
                    console.log(error)
                    setErr(error)
                },
                async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

                    const obj = { title, author, category, publisher, isbn, copies, available, bid, price, descript, downloadURL };
                    const createBook = async () => {
                        await addDoc(bookListCollectionRef, obj)
                    }
                    createBook()
                    handleClose()
                }
            );


        } catch (error) {
            setErr(error)
            console.log(error)
        }



    }

    return (
        <div>
            <Dialog
                fullScreen={fullScreen}
                className={`${darkMode ? "dark-mode" : "light-mode"}`}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title" style={{ color: "#754ef9", margin: "0px auto" }}>
                    {"Add Book"}
                </DialogTitle>
                <DialogContent style={{ minHeight: "300px" }}>
                    <form className='form bookForm' >
                        <div className="columns">
                            <div className="col">
                                <input type="text" placeholder="Title..." onChange={e => setTitle(e.target.value)} />
                                <input type="text" placeholder="Author..." onChange={e => setAuthor(e.target.value)} />
                                <input type="text" placeholder="Category..." onChange={e => setCat(e.target.value)} />
                                <input type="text" placeholder="Publisher..." onChange={e => setPub(e.target.value)} />
                            </div>
                            <div className="col">
                                <input type="text" placeholder="ISBN..." onChange={e => setIsbn(e.target.value)} />
                                <input type="number" placeholder="Copies..." onChange={e => {
                                    setCopies(e.target.value)
                                    setAvai(e.target.value)
                                }} />
                                <input type="text" placeholder="Book-ID..." onChange={e => setBid(e.target.value)} />
                                <input type="number" placeholder="Price..." onChange={e => setPrice(e.target.value)} />
                            </div>
                        </div>
                        <textarea cols="30" rows="10" placeholder='Description...' onChange={e => setDescrit(e.target.value)}></textarea>
                        <input type="file" id="file" style={{ display: 'none' }} onChange={e => setPic(e.target.files[0])} />
                        <label htmlFor="file">
                            <RiImageAddFill />
                            <span>Add Cover Page</span>
                        </label>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        component={Link}
                        size="small"
                        onClick={handleSubmit}
                        style={{ background: "#754ef9", margin: "5px", color: "#fdfdfd", fontSize: "10px" }}
                    >Add</Button>
                    <Button
                        variant="contained"
                        component={Link}
                        size="small"
                        onClick={handleClose}
                        style={{ background: "red", margin: "5px", color: "#fdfdfd", fontSize: "10px" }}
                    >Discard</Button>
                </DialogActions>

            </Dialog>
        </div>
    )
}


export const BooksListMini = () => {
    const { booksList } = useContext(BooksContext);
    const { isAdmin } = useContext(UserContext);

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // Select the first 5 books
    const limitedBooksList = booksList.slice(0, 4);

    return (
        <div>
            {limitedBooksList.length >= 1 ? (
                <>
                    <div className="List">
                        <TableContainer component={Paper} style={{ background: "var(--bg1)" }}>
                            <Typography variant="h6" style={{ textAlign: "center", color: "var(--textColor)" }}>
                                Books List
                            </Typography>
                            <Table sx={{ minWidth: 350 }} aria-label="simple table">
                                <TableHead className="tablehead">
                                    <TableRow>
                                        <TableCell style={{ fontSize: "12px", color: "var(--textColor)" }} align="center">
                                            SI
                                        </TableCell>
                                        {window.innerWidth >= 615 && <TableCell style={{ fontSize: "12px", color: "var(--textColor)" }} align="center">
                                            Book-ID
                                        </TableCell>}
                                        <TableCell style={{ fontSize: "12px", color: "var(--textColor)" }} align="center">
                                            Title
                                        </TableCell>
                                        <TableCell className='minitablet' style={{ fontSize: "12px", color: "var(--textColor)" }} align="center">
                                            Category
                                        </TableCell>
                                        <TableCell style={{ fontSize: "12px", color: "var(--textColor)" }} align="center">
                                            Available
                                        </TableCell>
                                        <TableCell style={{ fontSize: "12px", color: "var(--textColor)" }} align="center">
                                            Actions
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {limitedBooksList.map((book, index) => (
                                        <TableRow
                                            key={book.bid}
                                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                        >
                                            <TableCell style={{ fontSize: "12px", color: "var(--textColor)" }} align="center">
                                                {index + 1}
                                            </TableCell>
                                            {window.innerWidth >= 615 && <TableCell component="th" scope="row" align="center" style={{ fontSize: "12px", color: "var(--textColor)" }}>
                                                {book.bid}
                                            </TableCell>}
                                            <TableCell style={{ fontSize: "12px", color: "var(--textColor)" }} align="center">
                                                {book.title}
                                            </TableCell>
                                            <TableCell className='minitablet' style={{ fontSize: "12px", color: "var(--textColor)" }} align="center">
                                                {book.category}
                                            </TableCell>
                                            <TableCell style={{ fontSize: "12px", color: "var(--textColor)" }} align="center">
                                                {book.available}
                                            </TableCell>
                                            <TableCell style={{ fontSize: "12px", color: "var(--textColor)" }} align="center">
                                                ---
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <div className="button">
                                {isAdmin && (
                                    <>
                                        <Button
                                            variant="contained"
                                            component={Link}
                                            size="small"
                                            onClick={handleClickOpen}
                                            style={{ background: "var(--mainColor)", margin: "5px", color: "var(--whiteColor)", fontSize: "10px" }}
                                        >
                                            Add Book
                                        </Button>
                                        <AddBookForm open={open} handleClose={handleClose} />
                                    </>
                                )}
                                <Button
                                    variant="contained"
                                    component={Link}
                                    size="small"
                                    to={"/books"}
                                    style={{ background: "var(--bg2)", margin: "5px", color: "var(--textColor)", fontSize: "10px" }}
                                >
                                    See All
                                </Button>
                            </div>
                        </TableContainer>
                    </div>
                </>
            ) : (
                <Typography variant="h6">No Books found!</Typography>
            )}
        </div>
    );
};
