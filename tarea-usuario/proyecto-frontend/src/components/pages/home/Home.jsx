import React from 'react';
import { Typography, Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const Home = () => {
  // Verifica si el usuario ha iniciado sesión consultando localStorage
  const navigate = useNavigate();

  const usuarioGuardado = JSON.parse(localStorage.getItem('usuario'));
  console.log(usuarioGuardado)

  // Función para cerrar sesión
  const handleLogout = () => {
    // Actualiza el estado de 'registered' a falso
    if (usuarioGuardado) {
      usuarioGuardado.registered = false;
      localStorage.setItem('usuario', JSON.stringify(usuarioGuardado));
      navigate('/'); // Activar la redirección a '/home'

    }
    // Redirecciona a la página de inicio de sesión u otra página después de cerrar sesión
    // Aquí puedes usar useHistory de react-router-dom para redirigir a la página deseada
    // Ejemplo: history.push('/login');
  };

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center" // Centra horizontalmente
      spacing={2}
      sx={{ height: "100vh" }} // Ajusta la altura para centrar verticalmente
    >
      <Grid item xs={12} md={9} textAlign="center">
        {usuarioGuardado && usuarioGuardado.registered ? (
          <Typography
            variant="h3"
            color="#1976d2"
            fontFamily="Helvetica"
            mb={2} // Ajusta el margen inferior
          >
            ¡Bienvenido, {usuarioGuardado.nombre}!
          </Typography>
        ) : (
          <Typography
            variant="h4"
            color="error"
            fontFamily="Helvetica"
            mb={2} // Ajusta el margen inferior
          >
            Aún no has iniciado sesión
          </Typography>
        )}
        
        <Button
          type="submit"
          variant="contained"
          sx={{ marginTop: "10px" }} // Ajusta el margen superior
          onClick={usuarioGuardado && usuarioGuardado.registered ? handleLogout : () => navigate('/')} // Maneja el clic del botón "Cerrar sesión" o "Iniciar sesión"
        >
          {usuarioGuardado && usuarioGuardado.registered ? "Cerrar sesión" : "Iniciar sesión"}
        </Button>
      </Grid>
    </Grid>
  );
};

export default Home;
