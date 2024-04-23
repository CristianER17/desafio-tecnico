import * as Yup from 'yup'; // Se importa Yup para las validaciones de datos, en conjunto con Formik

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/; // Se crean la regla de contraseña: minimo 1 mayuscula, 1 minuscula y 1 numero

// Se añade un metodo para verificar que un nombre de usuario sea unico al momento de registrarse
Yup.addMethod(Yup.array, 'unique', function(message, mapper = a => a) {
    return this.test('unique', message, function(list) {
        return list.length === new Set(list.map(mapper)).size;
    });
});

// schema para registro y validacion con yup
export const basicSchemaRegister = Yup.object().shape({
    nombre: Yup.string().required("Debes ingresar un nombre de usuario").test('unique-username', 'El nombre de usuario ya está en uso', async function(value) {
        const usuariosRegistrados = JSON.parse(localStorage.getItem('cuentas-registradas')) || [];
        return !usuariosRegistrados.some(usuario => usuario.nombre === value);
    }),
    email: Yup.string().email("Ingrese un email válido").required("Debes ingresar un email"),
    contraseña: Yup.string().min(6,"La contraseña debe contener mínimo 6 caracteres").matches(passwordRules, {message: "Porfavor crea una contraseña más segura (Debe contener una letra mayúscula y una letra minúscula)"}).required("Debes ingresar una contraseña"),
    contraseñaRepetida: Yup.string().oneOf([Yup.ref('contraseña'), null], "Las contraseñas deben coincidir").required("Debes ingresar la confirmación de la contraseña"),
    preguntaSeguridad: Yup.string().required("Debes seleccionar una pregunta de seguridad"),
    respuestaSeguridad: Yup.string().required("Debes ingresar la respuesta a la pregunta de seguridad"),
    terminosYCondiciones: Yup.boolean().oneOf([true], 'Debe aceptar los términos y condiciones')
});

// schema para login y validacion con yup
export const basicSchemaLogin = Yup.object().shape({
    nombre: Yup.string().required("Debes ingresar un nombre de usuario"),
    contraseña: Yup.string().min(6,"La contraseña debe contener mínimo 6 caracteres").matches(passwordRules, {message: "Porfavor crea una contraseña más segura (Debe contener una letra mayúscula y una letra minúscula)"}).required("Debes ingresar una contraseña").test('user-exists', 'Usuario o contraseña incorrectos', async function(value) {
        const usuariosRegistrados = JSON.parse(localStorage.getItem('cuentas-registradas')) || [];
        return usuariosRegistrados.some(usuario => usuario.nombre === this.parent.nombre && usuario.contraseña === this.parent.contraseña);
    })
});

// schema para verificar usuario para cambio de contraseña y validacion con yup
export const basicSchemaUserVerify = Yup.object().shape({
    nombre: Yup.string().required("Debes ingresar un nombre de usuario").test('user-exists', 'Usuario no registrado', async function(value) {
        const usuariosRegistrados = JSON.parse(localStorage.getItem('cuentas-registradas')) || [];
        return usuariosRegistrados.some(usuario => usuario.nombre === this.parent.nombre );
    })
});

// schema para nueva contraseña y validacion con yup
export const basicSchemaNewPassword = Yup.object().shape({
    contraseña: Yup.string().min(6,"La contraseña debe contener mínimo 6 caracteres").matches(passwordRules, {message: "Porfavor crea una contraseña más segura (Debe contener una letra mayúscula y una letra minúscula)"}).required("Debes ingresar una contraseña"),
    contraseñaRepetida: Yup.string().oneOf([Yup.ref('contraseña'), null], "Las contraseñas deben coincidir").required("Debes ingresar la confirmación de la contraseña")
});
