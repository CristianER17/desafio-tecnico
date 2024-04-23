import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Typography, TextField, Grid, Button, Link as MuiLink, Dialog, DialogTitle, DialogContent } from '@mui/material';
import { useFormik } from 'formik';
import { basicSchemaUserVerify, basicSchemaNewPassword } from '../../../schemas';
import Box from '@mui/material/Box';
import LockIcon from '@mui/icons-material/LockOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/ReactToastify.css'
import "./RecoverPass.css";
// Se importan componentes, hooks, iconos y css


const RecoverPass = () => {
    // Se crean diferentes estados para utilizar en el codigo
    const [securityQuestion, setSecurityQuestion] = useState('');
    const [securityAnswer, setSecurityAnswer] = useState('');
    const [username, setUsername] = useState('');
    const [usuarioEncontrado, setUsuarioEncontrado] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [openChangePasswordDialog, setOpenChangePasswordDialog] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    
    const navigate = useNavigate();

    // ventana de alerta para cuando la respuesta de seguridad es incorrecta
    const handleShowAlert = () => {
        setShowAlert(true);
        toast.error("¡La respuesta de seguridad es incorrecta!", {
            bodyClassName: 'custom-toast-body',
            position: "top-center",
            autoClose: 2000,
            onClose: () => setShowAlert(false)
        });
    };

    // Funcion para ver si existe un error en los campos de texto de nueva contraseña y confirmacion de nueva contraseña
    const getErrorText = (field) => {
        if (handleChangePasswordForm.errors[field] && handleChangePasswordForm.touched[field]) {
            return handleChangePasswordForm.errors[field];
        }
        return '';
    };

    
    // Funcion que verifica si existe el usuario registrado
    const handleVerificarUsuario = (values) => {
        const usuariosRegistrados = JSON.parse(localStorage.getItem('cuentas-registradas')) || []; // se obtienen usuarios registrados del localStorge
        const usuarioExistente = usuariosRegistrados.find(usuario => usuario.nombre === values.nombre); // se busca el usuario existente

        if (usuarioExistente) { // en caso de existir registrado
            setUsuarioEncontrado(true); 
            setSecurityQuestion(usuarioExistente.preguntaSeguridad); // se guarda la pregunta de seguridad
            setSecurityAnswer(usuarioExistente.respuestaSeguridad); // se guarda la respuesta a la pregunta de seguridad
            setUsername(values.nombre); // se guarda el nombre del usuario a recuperar contraseña
            setOpenDialog(true);
        } else { // en caso contrario setear mensaje de error
            setUsuarioEncontrado(false);
            setVerificationMessage('Usuario no encontrado');
        }
        // si la respuesta escrita coincide con la guardad en el registro del usuario
        if (values.respuestaSeguridad === securityAnswer) {
            setOpenDialog(true); // abrir dialogo para recuperar contraseña
        } else { // caso contrario mostrar mensaaje de error
            setShowErrorMessage(true);
            setTimeout(() => {
                setShowErrorMessage(false);
            }, 3000);
        }
    };

    // handle para abrir y cerrar los dialogos en la recuperacion de contraseña
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleOpenDialog = () => {
        setOpenDialog(false);
    };

    const handleOpenChangePasswordDialog = () => {
        setOpenChangePasswordDialog(true);
    };

    const handleCloseChangePasswordDialog = () => {
        setOpenChangePasswordDialog(false);
    };
    // cuando se envien los datos correctamente de recuperacion
    const handleConfirmChangePassword = (values) => {
        values.nombre = username; // se guarda el nombre de usuario
        let usuariosRegistrados = JSON.parse(localStorage.getItem('cuentas-registradas')) || [];

        const usuarioIndex = usuariosRegistrados.findIndex(usuario => usuario.nombre === values.nombre);
    
        if (usuarioIndex !== -1) { // si se encuentra el usuario registrado
            usuariosRegistrados[usuarioIndex].contraseña = values.contraseña; // se edita la nueva contraseña
            localStorage.setItem('cuentas-registradas', JSON.stringify(usuariosRegistrados));
            navigate('/'); // se mueve a la ruta de login
            setTimeout(() => {
                setShowErrorMessage(false);
            }, 3000);

        } else { // caso contrario mensaje de error
            console.log("Error: usuario no encontrado");
        }
        
        setOpenChangePasswordDialog(false);
    };
    // efecto para cerrar el mensaje de alerta de error
    useEffect(() => {
        if (showErrorMessage) {
            setTimeout(() => {
                setShowErrorMessage(false);
            }, 3000);
        }
    }, [showErrorMessage]);

    const {
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
    } = useFormik({
        initialValues: {
            nombre: "",
        },
        validationSchema: basicSchemaUserVerify,
        onSubmit: handleVerificarUsuario
    });

    const handleChangePasswordForm = useFormik({
        initialValues: {
            nombre: "",
            contraseña: "",
            contraseñaRepetida: ""
        },
        validationSchema: basicSchemaNewPassword,

        onSubmit: handleConfirmChangePassword
    });


    return (
        <div>
            <form
                className="form-container-recoverPass"
                onSubmit={handleSubmit}
            >
                <Grid
                    container
                    alignItems="center"
                    justifyContent="space-evenly"
                    spacing={2}
                    sx={{ width: "100%" }}
                >
                    <Grid
                        item
                        xs={12}
                        md={9}
                        textAlign="center"
                        color="#1976d2"
                        fontFamily="Helvetica"
                        marginTop="50px"
                        fontSize="28px"
                    >
                        Recuperar contraseña
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        md={9}
                        fontFamily="Helvetica"
                        fontSize="20px"
                        marginTop="2%"
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
                                fontSize="20px"
                            >
                                <AccountBoxIcon
                                    sx={{
                                        mr: 2,
                                        fontSize: "30px",
                                        marginBottom: "9px"
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
                            error={touched.nombre && !!errors.nombre}
                            helperText={touched.nombre && errors.nombre}
                        />
                    </Grid>
                </Grid>

                <Button
                    type="submit"
                    variant="contained"
                    sx={{ marginTop: "30px", marginBottom: "30px" }}
                >
                    Verificar usuario
                </Button>

                <Grid
                    item
                    xs={12}
                    md={9}
                    marginBottom="20px"
                >
                    <Typography
                        variant="body2"
                    >
                        ¿Recuerdas tu contraseña?{' '}
                        <MuiLink
                            component={Link}
                            to="/"
                        >
                            Inicia sesión aquí
                        </MuiLink>
                    </Typography>
                </Grid>
            </form>
            
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
            >
                <DialogTitle sx={{ textAlign: 'center' }}>
                    {securityQuestion}
                </DialogTitle>
                <DialogContent>
                    {usuarioEncontrado && (
                        <div>
                            <TextField
                                type='text'
                                placeholder="Ingrese su respuesta"
                                name="respuestaSeguridad"
                                variant="outlined"
                                margin='dense'
                                fullWidth
                                value={values.respuestaSeguridad}
                                onChange={handleChange}
                            />
                            <Grid
                                container
                                justifyContent="center"
                                alignItems="center"
                                spacing={0}
                                sx={{ marginTop: '20px' }}
                            >
                                <Button sx={{color:"white",backgroundColor:"#1976d2 !important", marginRight:"10px"}}
                                    onClick={() => {
                                    if (values.respuestaSeguridad === securityAnswer) {
                                        handleOpenChangePasswordDialog();
                                        handleCloseDialog();
                                    } else {
                                        handleShowAlert();
                                    }
                                } }>Enviar</Button>
                                <Button sx={{color:"white",backgroundColor:"#1976d2 !important", marginLeft:"10px"}} onClick={handleCloseDialog}>Cancelar</Button>
                            </Grid>
                            <ToastContainer/>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            <Dialog
                open={openChangePasswordDialog}
                onClose={handleCloseChangePasswordDialog}
            >
                <DialogTitle sx={{ textAlign: 'center' }}>
                    Cambiar contraseña
                </DialogTitle>
                <DialogContent>
                    <form onSubmit={handleChangePasswordForm.handleSubmit}>
                    <Grid 
                        item 
                        xs={11} 
                        md={9} 
                        fontFamily={"Helvetica"} 
                        fontSize={"20px"}> 
                        <Typography 
                            variant="body1" 
                            component="div" 
                            sx={{ 
                                flexGrow: 1, 
                                margin: { xs: '2.5px 0', md: '2.5px 0' }, 
                                fontSize: { xs: '1.5rem', md: '2rem' } 
                            }}>
                            <Box 
                                display="flex" 
                                alignItems="center"
                                fontSize={"20px"}>
                                <LockIcon 
                                    sx={{ 
                                        mr: 2, 
                                        fontSize:"30px",
                                        marginBottom:"9px" 
                                    }} /> 
                                Nueva contraseña
                            </Box>
                        </Typography>
                        <TextField
                            type='password'
                            placeholder="Nueva contraseña"
                            name="contraseña"
                            variant="outlined"
                            margin='dense'
                            fullWidth
                            value={handleChangePasswordForm.values.contraseña}
                            onChange={handleChangePasswordForm.handleChange}
                            error={Boolean(getErrorText('contraseña'))}
                            helperText={getErrorText('contraseña')}
                        />
                        </Grid>
                        <Grid 
                        item 
                        xs={11} 
                        md={9} 
                        fontFamily={"Helvetica"} 
                        fontSize={"20px"}> 
                        <Typography 
                            variant="body1" 
                            component="div" 
                            sx={{ 
                                flexGrow: 1, 
                                margin: { xs: '2.5px 0', md: '2.5px 0' }, 
                                fontSize: { xs: '1.5rem', md: '2rem' } 
                            }}>
                            <Box 
                                display="flex" 
                                alignItems="center"
                                fontSize={"20px"}>
                                <LockOutlinedIcon 
                                    sx={{ 
                                        mr: 2, 
                                        fontSize:"30px",
                                        marginBottom:"9px" 
                                    }} /> 
                                Confirmar contraseña
                            </Box>
                        </Typography>
                        <TextField
                            type='password'
                            placeholder="Confirmar contraseña"
                            name="contraseñaRepetida"
                            variant="outlined"
                            margin='dense'
                            fullWidth
                            value={handleChangePasswordForm.values.contraseñaRepetida}
                            onChange={handleChangePasswordForm.handleChange}
                            error={Boolean(getErrorText('contraseñaRepetida'))}
                            helperText={getErrorText('contraseñaRepetida')}
                        />
                        </Grid>
                        <Grid
                            container
                            justifyContent="center"
                            alignItems="center"
                            spacing={0}
                            sx={{ marginTop: '20px' }}
                        >
                            <Button type="submit" sx={{color:"white",backgroundColor:"#1976d2 !important", marginRight:"10px"}}>Confirmar</Button>
                            <Button onClick={handleCloseChangePasswordDialog} sx={{color:"white",backgroundColor:"#1976d2 !important", marginLeft:"10px"}}>Cancelar</Button>
                        </Grid>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default RecoverPass;
