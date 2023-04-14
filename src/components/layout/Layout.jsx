import React, { Fragment, useContext, useState } from 'react'
import { NewContext } from '../../context/Context';
import { Box, IconButton, TextField, Tooltip, Typography } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom'
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import SearchIcon from '@mui/icons-material/Search';
import { DesktopDrawer, MobileDrawer } from './Drawer';
import { onSignOut } from '../../api/firebaseMethods';
import "./style.css";

const Layout = () => {
  const [userName, setUserName] = useState("");
  const { state, dispatch } = useContext(NewContext);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (userName) {
      navigate(`/users/${userName}`);
    }
  };

  const handleLogOut = async () => {
    try {
      await onSignOut();
      dispatch({ type: "LOGOUT" })
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <Box component="header" style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid grey" }}>
        <DesktopDrawer />
        <MobileDrawer />
        <Box component="form" onSubmit={handleSearch}>
          <TextField
            placeholder='Username'
            size="small"
            name="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <IconButton type="submit">
            <SearchIcon />
          </IconButton>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Typography variant="body2">{state.user}</Typography>
          <Box>
            <Tooltip title="Cerrar sesión">
              <IconButton onClick={() => handleLogOut()}>
                <ExitToAppRoundedIcon size={30} />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Box>
      <Box component="main" sx={{ p: 2 }}>
        <Outlet />
      </Box>
    </Fragment>
  )
};

export default Layout;