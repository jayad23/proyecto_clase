import React, { useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import { endpoint } from "./Home";
import { Box, CardMedia, IconButton, Typography } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import { addNewUser } from "../api/firebaseMethods";
import { useQuery } from "react-query";
import { getElementById } from "../api/api";


const UserSelected = () => {
    const { login } = useParams();
    const { data } = useQuery({ queryKey: `${login}_selected`, queryFn: () => getElementById(login) });
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

    const values = data && data.data;

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
                        <Typography variant="h5">Selected User: {values?.login}</Typography>
                        <CardMedia
                            component="img"
                            image={values?.avatar_url}
                        />
                        <Box component="div"
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between"
                            }}
                        >
                            <Typography variant="body1">Likes: {values.followers}</Typography>
                            <Box component="div">
                                <IconButton onClick={() => handleAddInFavorites(values.login, values)}>
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