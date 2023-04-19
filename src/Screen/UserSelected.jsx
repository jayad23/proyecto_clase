import React, { useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import { endpoint } from "./Home";
import { useFetch } from "../hooks/useFetch";
import { Box, Button, CardMedia, IconButton, TextareaAutosize, Typography } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import SendIcon from '@mui/icons-material/Send';
import EditIcon from '@mui/icons-material/Edit';
import { addNewUser } from "../api/firebaseMethods";
import { useHandleComments } from "../hooks/useHandleComents";

const UserSelected = () => {
    const { login } = useParams();
    const [data] = useFetch(`${endpoint}/${login}`);
    const [isAddedIn, setIsAddedIn] = useState(false);

    const handleAddInFavorites = (title, values) => {
        try {
            addNewUser(title, values);
            setIsAddedIn(true);
        } catch (error) {
            console.log(error);
            setIsAddedIn(false);
        }
    };

    return (
        <Fragment>
            {
                data && (
                    <Box component="div"
                        sx={{
                            width: "fit-content",
                            border: "1px solid grey",
                            p: 2,
                            borderRadius: "5px",
                            position: "absolute",
                            left: "50%",
                            top: "50%",
                            transform: "translate(-50%, -50%)"
                        }}
                    >
                        <Typography variant="h5">Selected User: {login}</Typography>
                        <CardMedia
                            component="img"
                            image={data?.avatar_url}
                        />
                        <Box component="div"
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between"
                            }}
                        >
                            <Typography variant="body1">Likes: {data.followers}</Typography>
                            <Box component="div">
                                <IconButton onClick={() => handleAddInFavorites(data.login, data)}>
                                    {isAddedIn ? <FavoriteRoundedIcon /> : <FavoriteBorderIcon />}
                                </IconButton>
                            </Box>
                        </Box>
                    </Box>
                )
            }
        </Fragment>
    )
};

export default UserSelected;