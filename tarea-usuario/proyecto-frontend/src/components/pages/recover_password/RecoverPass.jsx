import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Typography, TextField, Grid, Button, Link as MuiLink, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useFormik } from 'formik';
import { basicSchemaLogin } from '../../../schemas';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

import { useNavigate } from 'react-router-dom';
import "./RecoverPass.css";

const verificarUsuario = async (values, actions) => {
    console.log("registrado");
    console.log(values.nombre);
    const dialogRef = useRef(null);


    // Obtener los datos de usuario almacenados en el localStorage
    const usuariosRegistrados = JSON.parse(localStorage.getItem('cuentas-registradas')) || [];

    // Verificar si algún usuario registrado tiene el mismo nombre que el usuario que está tratando de registrarse
    const usuarioExistente = usuariosRegistrados.find(usuario => usuario.nombre === values.nombre);

    if (usuarioExistente) {
        setUsuarioEncontrado(true);
        setSecurityQuestion(usuario.preguntaSeguridad);
        dialogRef.current.open();
    } else {
        // Si el nombre de usuario no está registrado, agregar el nuevo usuario al almacenamiento local
        actions.resetForm();
        setUsuarioEncontrado(false);
    }
};

const RecoverPass = () => {
    const navigate = useNavigate();
    const [securityQuestion, setSecurityQuestion] = useState('');
    const [usuarioEncontrado, setUsuarioEncontrado] = useState(false);

    const dialogRef = useRef(null);


    const {
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        isSubmitting,
        
    } = useFormik({
        initialValues: {
            nombre: "",
        },
        validationSchema: basicSchemaLogin,
        onSubmit: verificarUsuario
    });

    return (
        <div>
            <form
                className="form-container-recoverPass"
                onSubmit={handleSubmit}
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
                        Recuperar contraseña
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
                </Grid>
                
                <Button
                    type="submit"
                    variant="contained"
                    sx={{ marginTop: "30px", marginBottom: "30px" }}
                    disabled={isSubmitting}
                >
                    Verificar usuario
                </Button>
                <Grid 
                    item 
                    xs={12} 
                    md={9}
                    marginBottom={"20px"}
                    >    
                    <Typography 
                        variant="body2">
                        ¿Recuerdas tu contraseña?{' '}
                        <MuiLink 
                            component={Link} 
                            to="/">
                            Inicia sesión aquí
                        </MuiLink>
                    </Typography>
                </Grid>
            </form>
            {/* Diálogo para la pregunta de seguridad */}
            <Dialog ref={dialogRef}>
                <DialogTitle>{securityQuestion}</DialogTitle>
                <DialogContent>
                    {usuarioEncontrado && (
                        <TextField
                            type='text'
                            placeholder="Ingrese su respuesta"
                            name="securityAnswer"
                            variant="outlined"
                            margin='dense'
                            fullWidth
                        />
                    )}
                </DialogContent>
                <DialogActions>
                    <Button>Enviar</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default RecoverPass;
