import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import FavoriteButton from '../components/favorite-button/FavoriteButton';
import { Box, CardMedia, Grid } from '@mui/material';
export const endpoint = "https://api.github.com/users";

const toLower = (str) => {
  console.log(str)
  return str.toLowerCase();
}

const Home = () => {
  const [data] = useFetch(endpoint);

  return (
    <Grid container spacing={2}>
      {
        data?.map((item) => (
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
                  width: "70%",
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

export default Home