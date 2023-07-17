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

export const AddUserForm = ({ open, handleClose }) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <div>
            <Dialog maxWidth="md" fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
                <DialogTitle id="responsive-dialog-title">Add User</DialogTitle>
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
                        style={{ background: "green", margin: "5px", color: "white", fontSize: "10px" }}
                    >
                        Add
                    </Button>
                    <Button
                        variant="contained"
                        component={Link}
                        size="small"
                        onClick={handleClose}
                        style={{ background: "red", margin: "5px", color: "white", fontSize: "10px" }}
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

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            {usersList.length >= 1 ? (
                <>
                    <div className="List">
                        <TableContainer component={Paper} style={{ background: "#434141" }}>
                            <Typography variant="h6" style={{ textAlign: "center", color: "white" }}>
                                Users List
                            </Typography>
                            <Table sx={{ minWidth: 350 }} aria-label="simple table">
                                <TableHead className="tablehead">
                                    <TableRow>
                                        <TableCell style={{ fontSize: "12px", color: "white" }} align="center">
                                            SI
                                        </TableCell>
                                        <TableCell style={{ fontSize: "12px", color: "white" }} align="left">
                                            Name
                                        </TableCell>
                                        <TableCell style={{ fontSize: "12px", color: "white" }} align="center">
                                            Email
                                        </TableCell>
                                        <TableCell style={{ fontSize: "12px", color: "white" }} align="center">
                                            ID
                                        </TableCell>
                                        <TableCell style={{ fontSize: "12px", color: "white" }} align="center">
                                            Phone
                                        </TableCell>
                                        <TableCell style={{ fontSize: "12px", color: "white" }} align="center">
                                            Actions
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {usersList.map((user, index) => (
                                        user.role !== "admin" && (
                                            <TableRow key={user.isbn} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                                <TableCell style={{ fontSize: "12px", color: "white" }} align="center">
                                                    {index + 1}
                                                </TableCell>
                                                <TableCell component="th" scope="row" align="center" style={{ fontSize: "12px", color: "white" }}>
                                                    <div className="user">
                                                        <img src={user.photoURL} alt="" />
                                                        <span>{user.displayName}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell style={{ fontSize: "12px", color: "white" }} align="center">
                                                    {user.email}
                                                </TableCell>
                                                <TableCell style={{ fontSize: "12px", color: "white" }} align="center">
                                                    {user.lid}
                                                </TableCell>
                                                <TableCell style={{ fontSize: "12px", color: "white" }} align="center">
                                                    {user.phone}
                                                </TableCell>
                                                <TableCell style={{ fontSize: "12px", color: "white" }} align="center">
                                                    ---
                                                </TableCell>
                                            </TableRow>
                                        )
                                    ))}
                                </TableBody>
                            </Table>
                            <div className="button">
                                <Button
                                    variant="contained"
                                    component={Link}
                                    size="small"
                                    onClick={handleClickOpen}
                                    style={{ background: "white", margin: "5px", color: "black", fontSize: "10px" }}
                                >
                                    Add User
                                </Button>
                                <AddUserForm open={open} handleClose={handleClose} />
                                <Button
                                    variant="contained"
                                    component={Link}
                                    size="small"
                                    to={"/users"}
                                    style={{ background: "transparent", margin: "5px", color: "white", fontSize: "10px" }}
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
