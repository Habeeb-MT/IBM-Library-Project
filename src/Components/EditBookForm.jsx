
import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useState } from 'react';


export const EditBookForm = ({ openEdit, handleCloseEdit, data }) => {

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const [ti, setTi] = useState("")
    const [aut, setAut] = useState("")
    const [cat, setCat] = useState("")
    const [publ, setPub] = useState("")
    const [isb, setIsb] = useState("")
    const [cop, setCop] = useState(0)
    const [avai, setAvai] = useState(0)
    const [bd, setBd] = useState("")
    const [pri, setPri] = useState(0)

    const handleSubmit = async (e) => {

        const upref = doc(db, "Books", data.id);
        await updateDoc(upref, {
            title: ti ? ti : data.title,
            author: aut ? aut : data.author,
            category: cat ? cat : data.category,
            publisher: publ ? publ : data.publisher,
            isbn: isb ? isb : data.isbn,
            copies: cop ? cop : data.copies,
            available: avai ? avai : data.available,
            bid: bd ? bd : data.bid,
            price: pri ? pri : data.price,
        })
        handleCloseEdit()

    }

    return (
        <div>
            <Dialog
                fullScreen={fullScreen}
                open={openEdit}
                onClose={handleCloseEdit}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Edit Book"}
                </DialogTitle>
                <DialogContent style={{ minHeight: "300px" }}>
                    <form className='form edit'  >
                        <div className="flex">
                            <div className="inputbox">
                                <label>Title</label>
                                <input required type="text" placeholder="Title..." onChange={e => setTi(e.target.value)} defaultValue={data.title} />
                            </div>
                            <div className="inputbox">
                                <label>Author</label>
                                <input required type="text" placeholder="Author..." onChange={e => setAut(e.target.value)} defaultValue={data.author} />
                            </div>
                        </div>
                        <div className="flex">
                            <div className="inputbox">
                                <label>Category</label>
                                <input required type="text" placeholder="Category..." onChange={e => setCat(e.target.value)} defaultValue={data.category} />

                            </div>
                            <div className="inputbox">
                                <label>Publisher</label>
                                <input required type="text" placeholder="Publisher..." onChange={e => setPub(e.target.value)} defaultValue={data.publisher} />
                            </div>
                        </div>
                        <div className="flex">
                            <div className="inputbox">
                                <label>ISBN</label>
                                <input required type="text" placeholder="ISBN..." onChange={e => setIsb(e.target.value)} defaultValue={data.isbn} />
                            </div>
                            <div className="inputbox">
                                <label>Copies</label>
                                <input required type="number" placeholder="Copies..." onChange={e => setCop(e.target.value)} defaultValue={data.copies} />
                            </div>
                        </div>
                        <div className="flex">
                            <div className="inputbox">
                                <label>Available</label>
                                <input required type="number" placeholder="Copies..." onChange={e => setAvai(e.target.value)} defaultValue={data.copies} />
                            </div>
                            <div className="inputbox">
                                <label>Price</label>
                                <input required type="number" placeholder="Price..." onChange={e => setPri(e.target.value)} defaultValue={data.price} />
                            </div>
                        </div>
                        <div className="inputbox">
                            <label>Book-ID</label>
                            <input required type="text" placeholder="Book-ID..." onChange={e => setBd(e.target.value)} defaultValue={data.bid} />
                        </div>

                        <DialogActions>
                            <Button
                                variant="contained"
                                component={Link}
                                size="small"
                                onClick={handleSubmit}
                                style={{ background: "green", margin: "5px", color: "white", fontSize: "10px" }}
                            >Edit</Button>
                            <Button
                                variant="contained"
                                component={Link}
                                size="small"
                                onClick={handleCloseEdit}
                                style={{ background: "red", margin: "5px", color: "white", fontSize: "10px" }}
                            >Cancel</Button>
                        </DialogActions>
                    </form>
                </DialogContent>

            </Dialog>
        </div>
    )
}
