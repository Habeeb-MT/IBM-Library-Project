
import React, { useContext } from 'react';
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
import { DarkLightContext } from '../Contexts/DarkLightContext';
import { UserContext } from '../Contexts/UserContext';


export const EditProfile = ({ openEdit, handleCloseEdit, data }) => {

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const { darkMode } = useContext(DarkLightContext)


    const [na, setNa] = useState("")
    const [pho, setPho] = useState("")
    const [pass, setPass] = useState("")
    const [coll, setColl] = useState("")
    const [yr, setYr] = useState(0)

    // console.log(li);

    const handleSubmit = async (e) => {

        const upref = doc(db, "Users", data.uid);
        await updateDoc(upref, {
            displayName: na ? na : data.displayName,
            phone: pho ? pho : data.phone,
            password: pass ? pass : data.password,
            college: coll ? coll : data.college,
            year: yr ? yr : data.year,
        })
        handleCloseEdit()

    }

    return (
        <div>
            <Dialog
                className={`${darkMode ? "dark-mode" : "light-mode"}`}
                fullScreen={fullScreen}
                open={openEdit}
                onClose={handleCloseEdit}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Edit Profile"}
                </DialogTitle>
                <DialogContent style={{ minHeight: "300px" }}>
                    <form className='form edit'  >
                        <div className="flex">
                            <div className="inputbox">
                                <label>Name</label>
                                <input required type="text" placeholder="Name..." onChange={e => setNa(e.target.value)} defaultValue={data?.displayName} />
                            </div>
                            <div className="inputbox">
                                <label>Email</label>
                                <input required type="text" placeholder="Email..." value={data?.email} />
                            </div>
                        </div>
                        <div className="flex">
                            <div className="inputbox">
                                <label>Phone</label>
                                <input required type="text" placeholder="Phone..." onChange={e => setPho(e.target.value)} defaultValue={data?.phone} />

                            </div>
                            <div className="inputbox">
                                <label>Password</label>
                                <input required type="password" placeholder="Password..." onChange={e => setPass(e.target.value)} defaultValue={data?.password} />
                            </div>
                        </div>
                        <div className="flex">
                            <div className="inputbox">
                                <label>College</label>
                                <input required type="text" placeholder="College..." onChange={e => setColl(e.target.value)} defaultValue={data?.college} />
                            </div>
                            <div className="inputbox">
                                <label>Library-ID</label>
                                <input required type="number" placeholder="ID..." value={data?.lid} />
                            </div>
                        </div>
                        <div className="inputbox">
                            <label>Year</label>
                            <input required type="number" placeholder="Year..." onChange={e => setYr(e.target.value)} defaultValue={data?.year} />
                        </div>


                        <DialogActions>
                            <Button
                                variant="contained"
                                component={Link}
                                size="small"
                                onClick={handleSubmit}
                                style={{ background: "green", margin: "5px", color: "white", fontSize: "10px" }}
                            >Save</Button>
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
