import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { auth, validacionToken } from './routesAuth.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(validacionToken)

const allowedOrigins = ['http://localhost:3001', 'http://localhost:4321'];

app.use(cors({
    origin: allowedOrigins,
    credentials: true
  }));

app.post('/login', auth.login);
app.post('/registro', auth.registro);
app.post('/admin', validacionToken, auth.admin);
app.post('/logout', auth.cerrarSesion);
app.post('/restablecer-contrasena', auth.restablecerContrasena);
app.put('/perfil/:id', auth.updateData);
app.delete('/perfil/:id', auth.eliminarUsuario);

app.get('*', (req, res) => {
    res.status(404).send('Esta pagina no existe');
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Servidor listo http://localhost:${PORT}`)
});