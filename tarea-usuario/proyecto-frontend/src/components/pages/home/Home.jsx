import React from 'react';
import { Typography, Grid, Button } from '@mui/material'; // Se importan los componentes de MUI
import { useNavigate } from 'react-router-dom'; // Se importa el hook useNavigate de react-router-dom

const Home = () => {
  const navigate = useNavigate(); // se prepara el hook en la const navigate

  const usuarioGuardado = JSON.parse(localStorage.getItem('usuario')); // se obtiene el usuario guardado a partir de un login

  // funcion para moverse del home al login cuando se cierre sesion
  const handleLogout = () => {
    if (usuarioGuardado) {
      usuarioGuardado.registered = false; 
      localStorage.setItem('usuario', JSON.stringify(usuarioGuardado));
      navigate('/'); // se mueve a la ruta login especificado por "/"
    }
  };

  return (
    <Grid // grid contenedor padre
      container
      alignItems="center"
      justifyContent="center"
      spacing={2}
      sx={{ height: "100vh" }}
    >
      <Grid // si el usuario guardado existe y esta registrado muestra un mensaje de bienvenida en caso contrario un mensaje de incitar a iniciar sesión
        item 
        xs={12} 
        md={9} 
        textAlign="center">
        {usuarioGuardado && usuarioGuardado.registered ? (
          <Typography
            variant="h3"
            color="#1976d2"
            fontFamily="Helvetica"
            mb={2}
          >
            ¡Bienvenido, {usuarioGuardado.nombre}!
          </Typography>
        ) : (
          <Typography
            variant="h4"
            color="error"
            fontFamily="Helvetica"
            mb={2}
          >
            Aún no has iniciado sesión
          </Typography>
        )}
        
        <Button
          type="submit"
          variant="contained"
          sx={{ marginTop: "10px" }}
          onClick={usuarioGuardado && usuarioGuardado.registered ? handleLogout : () => navigate('/')}
        >
          {usuarioGuardado && usuarioGuardado.registered ? "Cerrar sesión" : "Iniciar sesión"}
        </Button>
      </Grid>
    </Grid>
  );
};

export default Home;
