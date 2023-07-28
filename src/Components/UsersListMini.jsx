import React, { useContext, useState } from 'react'
import { UserContext } from '../Contexts/UserContext'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import "../css/style.scss"
import { BsFillImageFill } from "react-icons/bs";
// new
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { DarkLightContext } from '../Contexts/DarkLightContext';

export const AddUserForm = ({ open, handleClose }) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
    const { darkMode } = useContext(DarkLightContext)
    return (
        <div>
            <Dialog
                maxWidth="md"
                fullScreen={fullScreen}
                open={open} onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
                className={`${darkMode ? "dark-mode" : "light-mode"}`}
            >

                <DialogTitle style={{ color: "#754ef9", margin: "0px auto" }} id="responsive-dialog-title" >Add User</DialogTitle>
                <DialogContent style={{ minHeight: "300px" }}>
                    <form className="form">
                        <input type="text" placeholder="Name..." />
                        <input type="email" placeholder="Email..." />
                        <input type="text" placeholder="Phone..." />
                        <input type="text" placeholder="College..." />
                        <input type="text" placeholder="Library-ID..." />
                        <input type="text" placeholder="Admission Year..." />
                        <input type="file" id="file" style={{ display: "none" }} />
                        <label htmlFor="file">
                            <BsFillImageFill />
                            <span>Add Profile Pic</span>
                        </label>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        component={Link}
                        size="small"
                        onClick={handleClose}
                        style={{ background: "#754ef9", margin: "5px", color: "#fdfdfd", fontSize: "10px" }}
                    >
                        Add
                    </Button>
                    <Button
                        variant="contained"
                        component={Link}
                        size="small"
                        onClick={handleClose}
                        style={{ background: "red", margin: "5px", color: "#fdfdfd", fontSize: "10px" }}
                    >
                        Discard
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};


export const UsersListMini = () => {
    const { usersList } = useContext(UserContext);
    const [open, setOpen] = useState(false);
    const { darkMode } = useContext(DarkLightContext)
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // Filter out admin users from the list
    const filteredUsers = usersList.filter((user) => user.role !== "admin").slice(0, 4);

    return (
        <div>
            {filteredUsers.length >= 1 ? (
                <>
                    <div className="List">
                        <TableContainer component={Paper} style={{ background: "var(--bg1)" }}>
                            <Typography variant="h6" style={{ textAlign: "center", color: "var(--textColor)" }}>
                                Users List
                            </Typography>
                            <Table sx={{ minWidth: 350 }} aria-label="simple table">
                                <TableHead className="tablehead">
                                    <TableRow>
                                        <TableCell style={{ fontSize: "12px", color: "var(--textColor)" }} align="center">
                                            SI
                                        </TableCell>
                                        <TableCell style={{ fontSize: "12px", color: "var(--textColor)" }} align="left">
                                            Name
                                        </TableCell>
                                        <TableCell style={{ fontSize: "12px", color: "var(--textColor)" }} align="center">
                                            Email
                                        </TableCell>
                                        <TableCell style={{ fontSize: "12px", color: "var(--textColor)" }} align="center">
                                            ID
                                        </TableCell>
                                        <TableCell style={{ fontSize: "12px", color: "var(--textColor)" }} align="center">
                                            Phone
                                        </TableCell>
                                        <TableCell style={{ fontSize: "12px", color: "var(--textColor)" }} align="center">
                                            Actions
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredUsers.map((user, index) => (
                                        <TableRow key={user.isbn} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                            <TableCell style={{ fontSize: "12px", color: "var(--textColor)" }} align="center">
                                                {index + 1}
                                            </TableCell>
                                            <TableCell component="th" scope="row" align="center" style={{ fontSize: "12px", color: "var(--textColor)" }}>
                                                <div className="user">
                                                    <img src={user.photoURL} alt="" />
                                                    <span>{user.displayName}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell style={{ fontSize: "12px", color: "var(--textColor)" }} align="center">
                                                {user.email}
                                            </TableCell>
                                            <TableCell style={{ fontSize: "12px", color: "var(--textColor)" }} align="center">
                                                {user.lid}
                                            </TableCell>
                                            <TableCell style={{ fontSize: "12px", color: "var(--textColor)" }} align="center">
                                                {user.phone}
                                            </TableCell>
                                            <TableCell style={{ fontSize: "12px", color: "var(--textColor)" }} align="center">
                                                ---
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <div className="button">
                                <Button
                                    variant="contained"
                                    component={Link}
                                    size="small"
                                    onClick={handleClickOpen}
                                    style={{
                                        background: "var(--mainColor)", margin: "5px", color: "var(--whiteColor)", fontSize: "10px"
                                    }}
                                >
                                    Add User
                                </Button>
                                <AddUserForm open={open} handleClose={handleClose} />
                                <Button
                                    variant="contained"
                                    component={Link}
                                    size="small"
                                    to={"/users"}
                                    style={{ background: "var(--bg2)", margin: "5px", color: "var(--textColor)", fontSize: "10px" }}
                                >
                                    See All
                                </Button>
                            </div>
                        </TableContainer>
                    </div>
                </>
            ) : (
                <Typography variant="h6">No Users found!</Typography>
            )}
        </div>
    );
};
