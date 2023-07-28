import React, { useContext, useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@mui/material";
import { UserContext } from "../Contexts/UserContext";
import { arrayUnion, doc, updateDoc, getDoc, arrayRemove } from "firebase/firestore";
import { db } from "../firebase/firebase";
import "../css/mui.scss"
import { DarkLightContext } from "../Contexts/DarkLightContext";

export const ViewProfile = ({ openView, handleCloseView }) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
    const { actUser } = useContext(UserContext);
    const { darkMode } = useContext(DarkLightContext)

    return (
        <div >
            <Dialog
                className={`${darkMode ? "dark-mode" : "light-mode"}`}
                fullScreen={fullScreen}
                open={openView}
                onClose={handleCloseView}
                aria-labelledby="responsive-dialog-title"
                fullWidth
            >
                <DialogTitle id="responsive-dialog-title">
                    {/* {book?.title} */}
                </DialogTitle>
                <DialogContent style={{ minHeight: "300px" }}>
                    <div className="userContainer">
                        <div className="userHead">
                            <img src={actUser?.photoURL} alt="" />
                            <div className="userTitle">
                                <h2>{actUser?.displayName}</h2>
                                {/* <h3>{actUser?.email}</h3> */}
                                <span><pre>Email         :   {actUser?.email}</pre></span>
                                <span><pre>Library ID   :   {actUser?.lid}</pre></span>
                                <span><pre>Phone        :   {actUser?.phone}</pre></span>
                                <span><pre>College      :   {actUser?.college}</pre></span>
                                <span><pre>Year           :   {actUser?.year}</pre></span>
                            </div>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    {
                        <Button
                            variant="contained"
                            component={Link}
                            size="small"
                            style={{
                                background: "var(--mainColor)",
                                color: "white",
                                fontSize: "10px",
                            }}
                        // onClick={() => handleReturn(book)}
                        >
                            Edit
                        </Button>
                    }
                    <Button
                        variant="contained"
                        component={Link}
                        size="small"
                        style={{ background: "red", color: "white", fontSize: "10px" }}
                        onClick={handleCloseView}
                    >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

