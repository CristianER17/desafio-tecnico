import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, TextField, Grid, Button, Link as MuiLink } from '@mui/material';
import { useFormik } from 'formik';
import { basicSchemaLogin } from '../../../schemas';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import LockIcon from '@mui/icons-material/Lock';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import "./Login.css";

// Se importan componentes, schemas, iconos de MUI y el Login.css

const Login = () => {
    const navigate = useNavigate();

    const handleSubmit = async (values, actions) => { // Funcion llamada al enviar formulario de login
        values.registered = true // Cambia el estado de registrado a verdadero
        localStorage.setItem('usuario', JSON.stringify(values)); // se setea del localStorage el usuario
        const usuariosRegistrados = JSON.parse(localStorage.getItem('cuentas-registradas')) || []; // se obtiene las cuentas registradas del localStorage
        const usuario = usuariosRegistrados.find(user => (user.nombre === values.nombre || user.email === values.email) && user.contraseña === values.contraseña); // si se encuentra el usuario dentro del localStorage de cuentas registradas

        if (usuario) { // Se verifica si el usuario existe registrado
            actions.resetForm(); // resetear formulario
            navigate('/home'); // navegar a ruta home
        } else {
            setError('Usuario o contraseña incorrectos'); // mostrar error del login
        }

        await new Promise((resolve) => setTimeout(resolve, 1000)); // temporizador breve despues del login
    };

    // Se separa el uso de formik en las funcionalidades necesarias
    const { 
        handleChange, // cuando existe un cambio
        handleBlur, // cuando un campo de texto es tocado
        handleSubmit: handleFormSubmit, // envio de formulario para login
        values, // guarda los datos del login
        errors, // guarda en caso de haber los errores (se utiliza la libreria de Yup para validar errores)
        touched, // Si un campo de texto es editado
        isSubmitting // cuando el formulario esta en estado de envio de formulario
    } = useFormik({ // valores iniciales
        initialValues: {
            nombre: "",
            email: "",
            contraseña: "",
            contraseñaRepetida: "",
            registered: false
        },
        validationSchema: basicSchemaLogin, // nombre del schema para validaciones con Yup
        onSubmit: handleSubmit // submit para validar los datos enviados
    });

    // Contenedor que es visualizado en el front-end para el login
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
                                margin: { xs: '2.5px 0', md: '2.5px 0' },
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
                                    }}
                                /> 
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
                                margin: { xs: '2.5px 0', md: '2.5px 0' },
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
                                    }}
                                /> 
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
                    disabled={isSubmitting}
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
