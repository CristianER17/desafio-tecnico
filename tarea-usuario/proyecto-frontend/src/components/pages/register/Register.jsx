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
// importan componentes, hooks, iconos, schemas y css


const registerForm = async (values, actions) => {
    const userId = uuidv4();     // se utiliza uuid para creacion de identificadores aleatorios unicos para los registros de usuarios
    const usuariosRegistrados = JSON.parse(localStorage.getItem('cuentas-registradas')) || [];
    const usuarioExistente = usuariosRegistrados.find(usuario => usuario.nombre === values.nombre);

    if (usuarioExistente) { // si existe una cuenta con el nombre de usuario ya registrado lanza un error
        setError('Usuario ya existe');
    } else { // caso contrario se crea el nuevo usuario
        values.id = userId;
        const nuevoUsuario = { ...values };
        usuariosRegistrados.push(nuevoUsuario);
        localStorage.setItem('cuentas-registradas', JSON.stringify(usuariosRegistrados));
        actions.resetForm();
    }
};

const Register = () => {
    // para abrir y cerrar un dialogo de informacion al momento de registrarse correctamente o incorrectamente
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
        initialValues:{ // valores inciales de un registro de un usuario
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
        validationSchema: basicSchemaRegister,
        onSubmit: registerForm
    })
    // Los TextFields tienen el atributo de error para verificar con Yup el correcto ingreso de los datos
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
                                margin: { xs: '2.5px 0', md: '2.5px 0' }, 
                                fontSize: { xs: '1.5rem', md: '2rem' } 
                            }}>
                            <Box 
                                display="flex" 
                                alignItems="center"
                                fontSize={"20px"}>
                                <AccountBoxIcon 
                                    sx={{ 
                                        mr: 2, 
                                        fontSize:"30px",
                                        marginBottom:"9px" 
                                    }} /> 
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
                                margin: { xs: '2.5px 0', md: '2.5px 0' }, 
                                fontSize: { xs: '1.5rem', md: '2rem' } 
                            }}>
                            <Box 
                                display="flex" 
                                alignItems="center"
                                fontSize={"20px"}>
                                <EmailIcon 
                                    sx={{ 
                                        mr: 2, 
                                        fontSize:"30px",
                                        marginBottom:"9px" 
                                    }} />
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

                {touched.terminosYCondiciones && errors.terminosYCondiciones && (
                    <div style={{ 
                        color: 'red', 
                        fontFamily: 'Helvetica', 
                        fontSize: '14px', 
                        marginTop: '8px' }}>
                        {errors.terminosYCondiciones}
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
                    <DialogTitle // si es valido el registro muestra mensaje de exito caso contrario de error
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
