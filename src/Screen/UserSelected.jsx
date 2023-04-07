import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { endpoint } from "./Home";
import { useGetData } from "../hooks/UseGetData";
import { Button } from "@mui/material";

const UserSelected = () => {
    const { login } = useParams();
    const { values } = useGetData(`${endpoint}/${login}`)
    const navigate = useNavigate();

    return (
        <div>
            <h1>UserSelected</h1>
            <div>
                <p>{values?.login}</p>
                <p>{values?.followers}</p>
                <p>{values?.following}</p>
                <img src={values?.avatar_url} />
                <Button sx={{ mb: 3.5 }} onClick={() => navigate(-1)}>Volver</Button>
            </div>
        </div>
    )
};

export default UserSelected;