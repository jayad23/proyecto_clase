import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { endpoint } from "./Home";
import { useFetch } from "../hooks/useFetch";
import { Button } from "@mui/material";

const UserSelected = () => {
    const { login } = useParams();
    const navigate = useNavigate();
    const [data] = useFetch(`${endpoint}/${login}`);

    return (
        <div>
            <h1>UserSelected</h1>
            <div>
                <p>{data?.login}</p>
                <p>{data?.followers}</p>
                <p>{data?.following}</p>
                <img src={data?.avatar_url} />
                <Button sx={{ mb: 3.5 }} onClick={() => navigate(-1)}>Volver</Button>
            </div>
        </div>
    )
};

export default UserSelected;