import React, { useState, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import { NewContext } from '../context/Context';
import { Box, Button, CardMedia, IconButton, TextField, Tooltip, Typography } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { onSignIn, onSingInGmail } from '../api/firebaseMethods';
import { blue } from '@mui/material/colors';

const Login = () => {
    const [values, setValues] = useState({ email: "", password: "" });
    const [isLoggin, setIsLoggin] = useState("Ingresar");
    const { dispatch } = useContext(NewContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        setIsLoggin("Consultando...")
        e.preventDefault();
        if (values.email) {
            try {
                const result = await onSignIn(values);
                dispatch({ type: "LOGGIN", payload: { email: values.email, token: result?.user?.accessToken } });
                navigate("/home");
                setIsLoggin("Ingresar");
            } catch (error) {
                console.error("Kike Error", error)
                setIsLoggin("Intentar nuevamente");
            }
        }
    }

    const handleLoginInGmail = async () => {
        setIsLoggin("Consultando...")
        try {
            const result = await onSingInGmail();
            console.log(result);
            dispatch({ type: "LOGGIN", payload: { email: result.user.email, token: result?.user?.accessToken } });
            navigate("/home");
            setIsLoggin("Ingresar");
        } catch (error) {
            console.error(error);
            setIsLoggin("Intentar nuevamente");
        }
    }

    return (
        <Box component="div"
            sx={{
                width: "300px",
                border: "1px solid grey",
                p: 2,
                borderRadius: "5px",
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)"
            }}

        >
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CardMedia
                    component="img"
                    image="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                    sx={{ width: "100px" }}
                />
            </Box>
            <Box
                component="form"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                }}
                onSubmit={handleSubmit}
            >
                <TextField
                    name='email'
                    size='small'
                    type="text"
                    label="E-mail"
                    placeholder='Ingrese su e-mail'
                    value={values.email}
                    onChange={(e) => setValues({ ...values, email: e.target.value })}
                />
                <TextField
                    name='password'
                    size='small'
                    type="password"
                    label="password"
                    placeholder='Ingrese su contraseña'
                    value={values.password}
                    onChange={(e) => setValues({ ...values, password: e.target.value })}
                />
                <Button type='submit' size="small" variant="contained">
                    {isLoggin}
                </Button>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                        justifyContent: "center",
                        gap: "5px"
                    }}
                    onClick={handleLoginInGmail}
                >
                    <GoogleIcon sx={{ fontSize: "18px", color: blue[400] }} />
                    <Typography>
                        Ingresa con tu cuenta Gmail
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default Login;