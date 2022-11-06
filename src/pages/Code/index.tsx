import React, { useState } from 'react';

import QRCodeCanvas from '#/components/QRCodeCanvas';
import { Avatar, Box, createTheme, CssBaseline, Grid, Paper, TextField, ThemeProvider, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Copyright from '#/components/Copyright';

const theme = createTheme();
const Code: React.FC = () => {
  const [state, setState] = useState('');

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>

            <Typography component="h1" variant="h5">
              Texto a ser convertido em QRCode
            </Typography>

            <TextField
              margin="normal"
              fullWidth
              id="field"
              label="Insira algo"
              name="field"
              variant="filled"
              autoFocus
              onChange={(value) => setState(value.target.value)}
            />

            <Copyright sx={{ mt: 5 }} />

            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <QRCodeCanvas text={state || ''} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Code;
