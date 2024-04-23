import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importa Link de React Router
import { Typography, TextField, Grid, Button, Link as MuiLink } from '@mui/material';
import { useFormik } from 'formik';
import { basicSchemaLogin } from '../../../schemas';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import LockIcon from '@mui/icons-material/Lock';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import "./Login.css";

/*const loginAccount = async (values, actions) => {
    values.registered = true;
    localStorage.setItem('usuario', JSON.stringify(values));
    console.log(values);
    console.log(JSON.parse(localStorage.getItem('usuario')));
    actions.resetForm(); // Reiniciar el formulario después del envío si es necesario
};*/

const Login = ( ) => {

    const usuariosRegistrados = JSON.parse(localStorage.getItem('cuentas-registradas')) || [];
    console.log(usuariosRegistrados)

    const navigate = useNavigate();

    const handleSubmit = async (values, actions) => {
        values.registered = true;
        localStorage.setItem('usuario', JSON.stringify(values));
        console.log(values);

        const usuariosRegistrados = JSON.parse(localStorage.getItem('cuentas-registradas')) || [];
        const usuario = usuariosRegistrados.find(user => (user.nombre === values.nombre || user.email === values.email) && user.contraseña === values.contraseña);

        if (usuario) {
            console.log(JSON.parse(localStorage.getItem('usuario')));

            // Usuario válido, haz lo que necesites aquí (por ejemplo, redirigir a la página de inicio)
            actions.resetForm(); // Reiniciar el formulario después del envío si es necesario
            navigate('/home'); // Activar la redirección a '/home'
        } else {
            console.log(usuario)
            setError('Usuario o contraseña incorrectos');
        }

        await new Promise((resolve) => setTimeout(resolve, 1000));
        
    };
    const {
        handleChange,
        handleBlur,
        handleSubmit: handleFormSubmit,
        values,
        errors,
        touched,
        isSubmitting
    } = useFormik({
        initialValues: {
            nombre: "",
            email: "",
            contraseña: "",
            contraseñaRepetida: "",
            registered: false
        },
        validationSchema: basicSchemaLogin,
        onSubmit: handleSubmit
    });

    
    return (
        <div>
            <form
                className="form-container-login"
                onSubmit={handleFormSubmit}
            >
                <Grid
                    container
                    alignItems={"center"}
                    justifyContent={'space-evenly'}
                    spacing={2}
                    sx={{ width: "100%" }}
                >
                    <Grid
                        item
                        xs={12}
                        md={9}
                        textAlign={"center"}
                        color={"#1976d2"}
                        fontFamily={"Helvetica"}
                        marginTop={"50px"}
                        fontSize={"28px"}
                    >
                        Iniciar sesión
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        md={9}
                        fontFamily={"Helvetica"}
                        fontSize={"20px"}
                        
                        
                    >
                       <Typography 
                            variant="body1" 
                            component="div" 
                            sx={{ 
                                flexGrow: 1, 
                                margin: { xs: '2.5px 0', md: '2.5px 0' }, // Margen vertical ajustado para dispositivos móviles y escritorio
                                fontSize: { xs: '1.5rem', md: '2rem' } 
                            }}
                        >
                            <Box 
                                display="flex" 
                                alignItems="center"
                                fontSize={"20px"}
                            >
                                <AccountBoxIcon 
                                    sx={{ 
                                        mr: 2, 
                                        fontSize:"30px",
                                        marginBottom:"9px" 
                                    }} // Agrega margen a la derecha para separar el icono del texto
                                /> 
                                {/* Agrega el nombre de usuario */}
                                Nombre de usuario
                            </Box>
                        </Typography>
                        <TextField
                            type='text'
                            placeholder="Ingrese su nombre de usuario"
                            name="nombre"
                            variant="outlined"
                            margin='dense'
                            fullWidth
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.nombre}
                            error={touched.nombre && !!errors.nombre ? errors.nombre : ""}
                            helperText={touched.nombre && !!errors.nombre ? errors.nombre : ""}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        md={9}
                        fontFamily={"Helvetica"}
                        fontSize={"20px"}
                        marginTop={"2%"}
                    >
                        <Typography 
                            variant="body1" 
                            component="div" 
                            sx={{ 
                                flexGrow: 1, 
                                margin: { xs: '2.5px 0', md: '2.5px 0' }, // Margen vertical ajustado para dispositivos móviles y escritorio
                                fontSize: { xs: '1.5rem', md: '2rem' } 
                            }}
                        >
                            <Box 
                                display="flex" 
                                alignItems="center"
                                fontSize={"20px"}
                            >
                                <LockIcon 
                                    sx={{ 
                                        mr: 2, 
                                        fontSize:"30px",
                                        marginBottom:"9px" 
                                    }} // Agrega margen a la derecha para separar el icono del texto
                                /> 
                                {/* Agrega el nombre de usuario */}
                                Contraseña
                            </Box>
                        </Typography>
                        <TextField
                            type='password'
                            placeholder="Ingrese su contraseña"
                            name="contraseña"
                            variant="outlined"
                            margin='dense'
                            fullWidth
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.contraseña}
                            error={touched.contraseña && !!errors.contraseña ? errors.contraseña : ""}
                            helperText={touched.contraseña && !!errors.contraseña ? errors.contraseña : ""}
                        />
                    </Grid>
                    
                </Grid>
                <Grid 
                    item 
                    xs={12} 
                    md={9}
                    marginBottom={"20px"}
                    marginTop={"15px"}
                    >    
                    <Typography 
                        variant="body2">
                        ¿Olvidaste tu contraseña?{' '}
                        <MuiLink 
                            component={Link} 
                            to="/recoverPass">
                            Recuperar contraseña
                        </MuiLink>
                    </Typography>
                    
                </Grid>
                
                <Button
                    type="submit"
                    variant="contained"
                    sx={{ marginTop: "30px", marginBottom: "30px" }}
                    disabled={isSubmitting} // Deshabilitar el botón durante el envío del formulario
                >
                    Confirmar
                </Button>
                <Grid 
                    item 
                    xs={12} 
                    md={9}
                    marginBottom={"20px"}
                    >    
                    <Typography 
                        variant="body2">
                        ¿Eres nuevo en el sitio web?{' '}
                        <MuiLink 
                            component={Link} 
                            to="/register">
                            Regístrate aquí
                        </MuiLink>
                    </Typography>
                    
                </Grid>
            </form>
        </div>
    );
};

export default Login;
