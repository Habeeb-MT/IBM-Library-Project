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
import "../css/mui.scss"
import { DarkLightContext } from "../Contexts/DarkLightContext";

export const ViewUser = ({ openView, handleCloseView }) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
    const { isAdmin } = useContext(UserContext);
    const { currUser } = useContext(UserContext);
    const { darkMode } = useContext(DarkLightContext)
    const location = useLocation();
    const [user, setUser] = useState({});
    useEffect(() => {
        setUser(location.state);
    }, [location.state]);

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
                    <div className="bookContainer">
                        <div className="bookHead">
                            <img src={user?.photoURL} alt="" />
                            <div className="bookTitle">
                                <h2>{user?.displayName}</h2>
                                <span><pre>Email         :   {user?.email}</pre></span>
                                <span><pre>Library ID   :   {user?.lid}</pre></span>
                                <span><pre>Phone        :   {user?.phone}</pre></span>
                                <span><pre>College      :   {user?.college}</pre></span>
                                <span><pre>Year           :   {user?.year}</pre></span>
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

