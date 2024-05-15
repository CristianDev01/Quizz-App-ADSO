import express from 'express';  // Framework para la creación de mi APi.
import cors from 'cors';  // Middleware para el manejo de permisos en la solicitudes HTTP.
import { auth, validarJwt } from './routes/routesAuth.js';  // Importación de las rutas con la logica de los endpoint y el middleware para protegerlas.

const app = express();  // Instacia para la creacion de la APi.
app.use(express.json());  // Middleware para analizar solicitudes en formato Json.
app.use(express.urlencoded({ extended: true }));  // Middleware para asegurarme que analice el cuerpo de las solicitudes entrantes.

app.use(cors({  // Middleware para permitir solicitudes. (* "modo desarrollo" para evitar errores.)
    origin: '*'
}));

// Definición de rutas para mi APi de Auth (Listar usuario, registrar, logear, restablecer contraseña, actualizar datos del perfil y eliminar el usuario).
app.get('/:id', validarJwt, auth.listarUsuario);
app.post('/registro', auth.registro);
app.post('/login', auth.login);
app.post('/restablecer-contrasena', auth.restablecerContrasena);
app.put('/perfil/:id', validarJwt, auth.updateData);
app.delete('/perfil/:id', validarJwt, auth.eliminarUsuario);

app.get('*', (req, res) => {  // Ruta para manejar solicitudes a URLs que no existen en mi APi.
    res.status(404).send('Esta pagina no existe');
})

const PORT = process.env.PORT || 3001  // Levantando en servidor! Primero valida si el puerto esta en una variable de entorno, sino inicia en el puerto 3001.
app.listen(PORT, () => {
    console.log(`Servidor listo http://localhost:${PORT}`)  // Muestra en consola la URL para acceder a la APi.
});