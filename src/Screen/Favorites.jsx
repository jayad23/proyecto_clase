import React, { useContext } from 'react'
import { NewContext } from '../context/Context'
import { Link } from 'react-router-dom';
import FavoriteButton from '../components/favorite-button/FavoriteButton';
import { Box, CardMedia, Grid } from '@mui/material';

const Favorites = () => {
  const { state } = useContext(NewContext);
  return (
    <Grid container spacing={2}>
      {
        state?.data?.map((item) => (
          <Grid
            key={item.id}
            xs={12}
            sm={6}
            md={4}
            lg={3}
            item
          >
            <Box
              component="div"
              sx={{
                border: "1px solid grey",
                borderRadius: "8px",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center"
              }}
            >
              <p>{item.login}</p>
              <Box>
                <CardMedia
                  component="img"
                  image={item.avatar_url}
                  sx={{ width: { xs: "100%", sm: "200px" } }}
                />
              </Box>
              <Box
                component="section"
                sx={{
                  width: "350px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}>
                <Link
                  to={`/users/${item.login}`}
                  style={{
                    'hover': {
                      backgroundColor: "purple",
                      textDecoderation: "underline"
                    }
                  }}
                >Ver mas.</Link>
                <FavoriteButton item={item} />
              </Box>
            </Box>
          </Grid>
        ))}
    </Grid>
  )
}

export default Favorites