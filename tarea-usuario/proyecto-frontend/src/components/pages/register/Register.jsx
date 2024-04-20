import React from 'react'
import { TextField, Grid, Typography, Button } from '@mui/material'
import { Formik, ErrorMessage, useFormik } from 'formik'
import "./Register.css"
import * as Yup from "yup"
import { basicSchema } from '../../../schemas'

const registerForm = async (values, actions) =>{
    values.registered=true
    console.log(values)
    console.log(actions)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    actions.resetForm()
}

const Register = () => {
    

    // funcion para visualizar la data del registro por consola
    

    
    const { handleChange, values, handleBlur, handleSubmit, errors, touched, isSubmitting, actions } = useFormik({
        // valores inciales de los inputs para el registro
        initialValues:{
            nombre: "",
            email: "",
            contraseña: "",
            contraseñaRepetida: "",
            registered: false
        },
        // uso de la libreria Yup para validar el ingreso de los inputs del registro
        validationSchema: basicSchema,
        onSubmit: registerForm
        })
        // funcion que se activa cuando se clickea el boton de registrarse
    console.log(errors);
    return (
        <div>
            
            <Typography 
                color="primary" 
                variant="h2" 
                align="center">  Registro </Typography>
                
                <form className="form-container" onSubmit={ handleSubmit }>
                    <Grid 
                        container
                        alignItems={"center"} 
                        justifyContent={'space-evenly'} 
                        spacing={2}
                        sx={{width:"100%"}}>
                        <Grid item xs={12} md={7}>
                            <TextField 
                                type='text' 
                                label="Ingrese su nombre de usuario" 
                                name="nombre"
                                variant="outlined"
                                fullWidth
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.nombre}
                                //className={errors.nombre ? "input-error" : ""}
                                error={touched.nombre && !!errors.nombre ? errors.nombre : ""}
                                helperText={touched.nombre && !!errors.nombre ? errors.nombre : ""}
                                />
                                
                        </Grid>

                        <Grid item xs={12} md={7}>
                            <TextField 
                                type='email' 
                                label="Ingrese su email" 
                                name="email"
                                variant="outlined" 
                                fullWidth 
                                onChange={handleChange}
                                onBlur={handleBlur}

                                value={values.email}
                                error={touched.email && !!errors.email ? errors.email : ""}
                                helperText={touched.email && !!errors.email ? errors.email : ""}
                                />
                        </Grid>
                        <Grid item xs={12} md={7}>
                            <TextField 
                                type='password' 
                                label="Ingrese su contraseña" 
                                name="contraseña"
                                variant="outlined"
                                fullWidth 
                                onChange={handleChange}
                                onBlur={handleBlur}

                                value={values.contraseña}
                                error={touched.contraseña && !!errors.contraseña ? errors.contraseña : ""}
                                helperText={touched.contraseña && !!errors.contraseña ? errors.contraseña : ""}
                                />
                        </Grid>
                        <Grid item xs={12} md={7}>
                            <TextField 
                                type='password' 
                                label="Repita su contraseña" 
                                variant="outlined"
                                name="contraseñaRepetida"
                                fullWidth 
                                onChange={handleChange}
                                onBlur={handleBlur}

                                value={values.contraseñaRepetida}
                                error={touched.contraseñaRepetida && !!errors.contraseñaRepetida? errors.contraseñaRepetida : ""}
                                helperText={touched.contraseñaRepetida && !!errors.contraseñaRepetida ? errors.contraseñaRepetida : ""}
                                />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={isSubmitting}
                        >Registrarse</Button>
                </form>
                
        </div>
    )
}

export default Register