import * as Yup from 'yup'


const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// minimo 5 caracteres, 1 letra mayuscula, 1 letra minuscula, 1 numero

Yup.addMethod(Yup.array, 'unique', function(message, mapper = a => a) {
    return this.test('unique', message, function(list) {
        return list.length  === new Set(list.map(mapper)).size;
    });
});

export const basicSchemaRegister = Yup.object().shape({
    nombre: Yup.string().required("Debes ingresar un nombre de usuario").test('unique-username', 'El nombre de usuario ya está en uso', async function(value) {
        // Obtener los datos de usuario almacenados en localStorage
        const usuariosRegistrados = JSON.parse(localStorage.getItem('cuentas-registradas')) || [];
        // Verificar si algún usuario ya tiene el mismo nombre que el valor actual
        return !usuariosRegistrados.some(usuario => usuario.nombre === value);}),
    email: Yup.string().email("Ingrese un email válido").required("Debes ingresar un email"),
    contraseña: Yup.string().min(6,"La contraseña debe contener mínimo 6 caracteres").matches(passwordRules, {message: "Porfavor crea una contraseña más segura (Debe contener una letra mayúscula y una letra minúscula)"}).required("Debes ingresar una contraseña"),
    contraseñaRepetida: Yup.string().oneOf([Yup.ref('contraseña'), null], "Las contraseñas deben coincidir").required("Debes ingresar la confirmación de la contraseña"),
    preguntaSeguridad: Yup.string().required("Debes seleccionar una pregunta de seguridad"),
    respuestaSeguridad: Yup.string().required("Debes ingresar la respuesta a la pregunta de seguridad"),
    terminosYCondiciones: Yup.boolean().oneOf([true], 'Debe aceptar los términos y condiciones')
})

export const basicSchemaLogin = Yup.object().shape({
    nombre: Yup.string().required("Debes ingresar un nombre de usuario"),
    contraseña: Yup.string().min(6,"La contraseña debe contener mínimo 6 caracteres").matches(passwordRules, {message: "Porfavor crea una contraseña más segura (Debe contener una letra mayúscula y una letra minúscula)"}).required("Debes ingresar una contraseña").test('user-exists', 'Usuario o contraseña incorrectos', async function(value) {
        // Obtener los datos de usuario almacenados en localStorage
        const usuariosRegistrados = JSON.parse(localStorage.getItem('cuentas-registradas')) || [];
        // Verificar si algún usuario tiene el mismo nombre y contraseña que los valores proporcionados en el formulario
        return usuariosRegistrados.some(usuario => usuario.nombre === this.parent.nombre && usuario.contraseña === this.parent.contraseña);
      })
})