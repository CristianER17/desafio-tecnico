import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import LoginIcon from '@mui/icons-material/Login';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PersonIcon from '@mui/icons-material/Person';
import Hidden from '@mui/material/Hidden';
// Se importan varios componentes para crear un Navigation Bar

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, margin: 2, fontSize: { xs: '1.5rem', md: '2rem' } }}>
            <Box display="flex" alignItems="center">
              <Hidden>
                <AccountBoxIcon sx={{ mr: 2, fontSize:"40px", marginBottom:"14px" }} />
              </Hidden>
              Sistema de cuentas
            </Box>
          </Typography>

          <Stack direction="row" spacing={3}>
            <Button 
              variant="inline"
              href='./'
              sx={{ fontSize: { xs: "1rem", md: "1.2rem" }, fontFamily: "Helvetica", mr: { xs: 1, md: 3 } }}
              startIcon={<PersonIcon />}>
              Iniciar sesión
            </Button>
            <Button 
              variant="inline"
              href='/register'
              sx={{ fontSize: { xs: "1rem", md: "1.2rem" }, fontFamily: "Helvetica", mr: { xs: 1, md: 3 } }}
              startIcon={<LoginIcon />}>
              Registro
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
