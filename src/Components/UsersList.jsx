import React, { useContext } from 'react'
import { UserContext } from '../Contexts/UserContext'
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
import { AddUserForm } from './UsersListMini';

export const UsersList = () => {
    const { isAdmin } = useContext(UserContext)

    const { usersList } = useContext(UserContext);
    const [rowPerPage, setRowsPerPage] = useState(10)
    const [page, setPage] = useState(0)

    return (
        <div>
            <div className="heading" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Typography variant='h5' style={{ textAlign: "center", margin: "20px 40px" }}>Users Lists</Typography>
                {isAdmin ? (
                    <Typography style={{ textAlign: "center", margin: "20px 40px" }}>
                        <AddUserForm />
                    </Typography>
                ) : ("")}
            </div>
            {usersList.length >= 1 ? (
                <>
                    <div className='table' style={{ padding: "20px" }}>
                        <TableContainer component={Paper} style={{ background: "#434141" }} >

                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead className='tablehead'>
                                    <TableRow>
                                        <TableCell style={{ fontSize: "16px", color: "white" }} align="center">SI</TableCell>
                                        <TableCell style={{ fontSize: "16px", color: "white" }} align="left">Name</TableCell>
                                        <TableCell style={{ fontSize: "16px", color: "white" }} align="center">ID</TableCell>
                                        <TableCell style={{ fontSize: "16px", color: "white" }} align="center">email</TableCell>
                                        <TableCell style={{ fontSize: "16px", color: "white" }} align="center">Phone</TableCell>
                                        <TableCell style={{ fontSize: "16px", color: "white" }} align="center">College</TableCell>
                                        <TableCell style={{ fontSize: "16px", color: "white" }} align="center">Year</TableCell>
                                        <TableCell style={{ fontSize: "16px", color: "white" }} align="center">Issued</TableCell>
                                        <TableCell style={{ fontSize: "16px", color: "white" }} align="center">Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {(rowPerPage > 0
                                        ? usersList.slice(page * rowPerPage, page * rowPerPage + rowPerPage)
                                        : usersList
                                    ).map((user, index) => (
                                        <TableRow
                                            key={user?.lid}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell style={{ fontSize: "12px", color: "white" }} align='center'>{index + 1}</TableCell>
                                            <TableCell component="th" scope="row" align='center' style={{ fontSize: "12px", color: "white" }}>
                                                {<div className='user'>
                                                    <img src={user.photoURL} alt="" />
                                                    <span>{user.displayName}</span></div>}
                                            </TableCell>
                                            <TableCell style={{ fontSize: "12px", color: "white" }} align="center">{user.lid}</TableCell>
                                            <TableCell style={{ fontSize: "12px", color: "white" }} align="center">{user.email}</TableCell>
                                            <TableCell style={{ fontSize: "12px", color: "white" }} align="center">{user.phone}</TableCell>
                                            <TableCell style={{ fontSize: "12px", color: "white" }} align="center">{user.college}</TableCell>
                                            <TableCell style={{ fontSize: "12px", color: "white" }} align="center">{user.year}</TableCell>
                                            <TableCell style={{ fontSize: "12px", color: "white" }} align="center">{user.issued}</TableCell>
                                            <TableCell align="center">
                                                <Button
                                                    variant="contained"
                                                    component={Link}
                                                    size="small"

                                                    style={{ background: "#2a9942", margin: "1px", fontSize: "10px" }}
                                                // state={book}
                                                >View</Button>
                                                {isAdmin && <>
                                                    <Button
                                                        variant="contained"
                                                        component={Link}
                                                        size="small"

                                                        style={{ background: "#2a9942", margin: "1px", fontSize: "10px" }}
                                                    // state={book}
                                                    >Edit</Button>
                                                    <Button
                                                        variant="contained"
                                                        component={Link}
                                                        size="small"
                                                        // onClick={() => deleteBook(book?.id)}
                                                        style={{ background: "red", margin: "1px", fontSize: "10px" }}
                                                    // state={book}
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
                            count={usersList.length}
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
