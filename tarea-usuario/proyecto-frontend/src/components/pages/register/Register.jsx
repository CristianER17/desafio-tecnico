import React from 'react'
import { Link } from 'react-router-dom'
import { TextField, Grid, Button, Dialog, DialogActions, DialogTitle, Checkbox, FormControlLabel, Typography, Link as MuiLink } from '@mui/material'
import { useFormik } from 'formik'
import "./Register.css"
import { basicSchemaRegister } from '../../../schemas'
import { v4 as uuidv4 } from 'uuid';
import Box from '@mui/material/Box';
import LockIcon from '@mui/icons-material/Lock';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import EmailIcon from '@mui/icons-material/Email';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import MenuItem from '@mui/material/MenuItem';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import QuestionMarkOutlinedIcon from '@mui/icons-material/QuestionMarkOutlined';



const registerForm = async (values, actions) => {
    console.log("registrado");
    console.log(values.nombre);
    const userId = uuidv4();

    // Obtener los datos de usuario almacenados en el localStorage
    const usuariosRegistrados = JSON.parse(localStorage.getItem('cuentas-registradas')) || [];

    // Verificar si algún usuario registrado tiene el mismo nombre que el usuario que está tratando de registrarse
    const usuarioExistente = usuariosRegistrados.find(usuario => usuario.nombre === values.nombre);

    if (usuarioExistente) {
        console.log("usuario existe");
        setError('Usuario ya existe'); // Mostrar un mensaje de error si el nombre de usuario ya está registrado
    } else {
        // Si el nombre de usuario no está registrado, agregar el nuevo usuario al almacenamiento local
        values.id = userId;
        
        //console.log(values.id)
        const nuevoUsuario = { ...values };
        usuariosRegistrados.push(nuevoUsuario);
        console.log(usuariosRegistrados);
        localStorage.setItem('cuentas-registradas', JSON.stringify(usuariosRegistrados));
        actions.resetForm();
        // setUser(newUser);
        // setError('');
    }

    

};
const Register = ( ) => {
    
    // funcion para visualizar la data del registro por consola
    
    
    const [open, setOpen] = React.useState(false)

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

        
    const { 
            handleChange, 
            handleBlur, 
            handleSubmit, 
            values, 
            errors, 
            touched, 
            isSubmitting, 
            isValid 
        } = useFormik({
        // valores inciales de los inputs para el registro
        initialValues:{
            id: "",
            nombre: "",
            email: "",
            contraseña: "",
            contraseñaRepetida: "",
            preguntaSeguridad: "",
            respuestaSeguridad: "",
            terminosYCondiciones: false,
            registered: false
        },
        // uso de la libreria Yup para validar el ingreso de los inputs del registro
        validationSchema: basicSchemaRegister,
        onSubmit: registerForm
        })
        // funcion que se activa cuando se clickea el boton de registrarse
    return (
        <div>
            <form 
                className="form-container-register" 
                onSubmit={ handleSubmit } > 
                <Grid 
                    container
                    alignItems={"center"} 
                    justifyContent={'space-evenly'} 
                    spacing={2}
                    
                    sx={{width:"100%"}}>
                    
                    <Grid 
                        item 
                        xs={12} 
                        md={9} 
                        textAlign={"center"} 
                        color={"#1976d2"} 
                        fontFamily={"Helvetica"} 
                        marginTop={"20px"}
                        fontSize={"28px"}>
                        
                        Registro de cuenta
                    </Grid>

                    <Grid 
                        item 
                        xs={11}
                        md={9} 
                        fontFamily={"Helvetica"} 
                        fontSize={"20px"} 
                        marginTop={"2%"}>
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
                        xs={11}
                        md={9} 
                        fontFamily={"Helvetica"} 
                        fontSize={"20px"}>
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
                                <EmailIcon 
                                    sx={{ 
                                        mr: 2, 
                                        fontSize:"30px",
                                        marginBottom:"9px" 
                                    }} // Agrega margen a la derecha para separar el icono del texto
                                /> 
                                {/* Agrega el nombre de usuario */}
                                Email
                            </Box>
                        </Typography>

                        <TextField 
                            type='email' 
                            placeholder="Ingrese su email" 
                            name="email"
                            variant="outlined"
                            margin='dense'
                            fullWidth 
                            onChange={handleChange}
                            onBlur={handleBlur}

                            value={values.email}
                            error={touched.email && !!errors.email ? errors.email : ""}
                            helperText={touched.email && !!errors.email ? errors.email : ""}
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
                            margin: { xs: '2.5px 0', md: '2.5px 0' }, // Margen vertical ajustado para dispositivos móviles y escritorio
                            fontSize: { xs: '1.5rem', md: '2rem' } 
                        }}
                    >
                        <Box 
                            display="flex" 
                            alignItems="center"
                            fontSize={"20px"}
                        >
                            <LockOutlinedIcon 
                                sx={{ 
                                    mr: 2, 
                                    fontSize:"30px",
                                    marginBottom:"9px" 
                                }} // Agrega margen a la derecha para separar el icono del texto
                            /> 
                            {/* Agrega el nombre de usuario */}
                            Confirmar contraseña
                        </Box>
                    </Typography>

                        <TextField 
                            type='password' 
                            placeholder="Repita su contraseña" 
                            variant="outlined"
                            name="contraseñaRepetida"
                            margin='dense'
                            fullWidth 
                            onChange={handleChange}
                            onBlur={handleBlur}

                            value={values.contraseñaRepetida}
                            error={touched.contraseñaRepetida && !!errors.contraseñaRepetida? errors.contraseñaRepetida : ""}
                            helperText={touched.contraseñaRepetida && !!errors.contraseñaRepetida ? errors.contraseñaRepetida : ""}
                            />
                    </Grid>
                    <Grid item xs={11} md={9} fontFamily={"Helvetica"} fontSize={"20px"}>
                        <Typography variant="body1" component="div" sx={{ flexGrow: 1, margin: { xs: '2.5px 0', md: '2.5px 0' }, fontSize: { xs: '1.5rem', md: '2rem' } }}>
                            <Box display="flex" alignItems="center" fontSize={"20px"}>
                                <QuestionMarkOutlinedIcon sx={{ mr: 2, fontSize: "30px", marginBottom: "9px" }} /> 
                                Pregunta de seguridad
                            </Box>
                        </Typography>
                        <TextField
                            select
                            fullWidth
                            variant="outlined"
                            margin="dense"
                            name="preguntaSeguridad"
                            value={values.preguntaSeguridad}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.preguntaSeguridad && !!errors.preguntaSeguridad}
                            helperText={touched.preguntaSeguridad && !!errors.preguntaSeguridad ? errors.preguntaSeguridad : ""}
                        >
                            <MenuItem value="" disabled>
                                Seleccione una pregunta
                            </MenuItem>
                            <MenuItem value="¿Cuál es el nombre de tu mascota?">¿Cuál es el nombre de tu mascota?</MenuItem>
                            <MenuItem value="¿En qué ciudad naciste?">¿En qué ciudad naciste?</MenuItem>
                            <MenuItem value="¿Cuál es tu comida favorita?">¿Cuál es tu comida favorita?</MenuItem>
                        </TextField>
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
                                <QuestionAnswerOutlinedIcon 
                                    sx={{ 
                                        mr: 2, 
                                        fontSize:"30px",
                                        marginBottom:"9px" 
                                    }} />
                                Respuesta
                            </Box>
                        </Typography>
                        <TextField 
                            type='text' 
                            placeholder="Ingrese su respuesta" 
                            name="respuestaSeguridad"
                            variant="outlined"
                            margin='dense'
                            fullWidth 
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.respuestaSeguridad}
                            error={touched.respuestaSeguridad && !!errors.respuestaSeguridad ? errors.respuestaSeguridad : ""}
                            helperText={touched.respuestaSeguridad && !!errors.respuestaSeguridad ? errors.respuestaSeguridad : ""}
                        />
                
                    </Grid>

                   
                </Grid>
                



                    
                
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={values.terminosYCondiciones}
                            onChange={handleChange}
                            name="terminosYCondiciones"
                        />
                    }
                    label="Acepto los términos y condiciones"
                />

                {/* Mensaje de error para el checkbox */}
                {touched.terminosYCondiciones && errors.terminosYCondiciones && (
                    <div style={{ 
                        color: 'red', 
                        fontFamily: 'Helvetica', 
                        fontSize: '14px', 
                        marginTop: '8px' }}
                        >{errors.terminosYCondiciones}
                    </div>
                )}
                <Button
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting}
                    sx={{marginTop:"30px", marginBottom:"30px"}}
                    onClick={handleClickOpen}
                    >Registrarse
                </Button>
                <Grid 
                    item 
                    xs={12} 
                    md={9}>
                    <Typography variant="body2">
                        ¿Ya tienes una cuenta?{' '}
                        <MuiLink 
                            component={Link} 
                            to="/">
                            Inicia sesión aquí
                        </MuiLink>
                    </Typography>
                </Grid>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    fontFamily={"Helvetica"}
                > 
                    <DialogTitle 
                        id="alert-dialog-title"
                        sx={{marginTop: "5px"}}
                        >
                            {isValid ? 'Registro completado con éxito' : 'Fallo en el registro de la cuenta'}
                    </DialogTitle>
                    
                    <DialogActions>
                        <Button 
                            onClick={handleClose} 
                            sx={{color:"white",backgroundColor:"#1976d2 !important"}}
                            href={isValid ? "./" : null}
                        >Confirmar
                        </Button>
                    </DialogActions>
                </Dialog>
                    
            </form>
        </div>
    )
}
export default Register