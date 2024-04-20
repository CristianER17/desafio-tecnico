import * as Yup from 'yup'

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// minimo 5 caracteres, 1 letra mayuscula, 1 letra minuscula, 1 numero
export const basicSchema = Yup.object().shape({
    nombre: Yup.string().required("Debes ingresar un nombre de usuario"),
    email: Yup.string().email("Ingrese un email válido").required("Debes ingresar un email"),
    contraseña: Yup.string().min(6,"La contraseña debe contener mínimo 6 caracteres").matches(passwordRules, {message: "Porfavor crea una contraseña más segura (Debe contener una letra mayúscula y una letra minúscula)"}).required("Debes ingresar una contraseña"),
    contraseñaRepetida: Yup.string().oneOf([Yup.ref('contraseña'), null], "Las contraseñas deben coincidir").required("Debes ingresar la confirmación de la contraseña")
})