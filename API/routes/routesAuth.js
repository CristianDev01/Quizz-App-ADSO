import Usuarios from '../database/databaseConexion.js';  // Importo el modelo de db.
import bcrypt from 'bcrypt';  // Libreria para cifrar las contraseñas antes de almacenarlas.
import jwt from 'jsonwebtoken';  // Biblioteca para crear tokens Jwt firmados.
import expressJwt from "express-jwt";  // Middleware para facilitar la implementación de Jsonwebtoken.

const validarJwt = expressJwt({ secret: "mi-secreto-jwt", algorithms: ['HS256'] }); // Middleware para proteger las rutas mediante autorización del Jwt.
const firmaToken = _id => jwt.sign({ _id }, "mi-secreto-jwt");  // Función que toma el id del "usuario" para firmar un token utilizando la clave secreta.

const auth = {  // Objeto para la logica de los endpoints.

  listarUsuario: async (req, res) => {  // Lista un usuario completo por id, (debe estar logeado).
    const { id } = req.params;
    
    try {
    const usuario = await Usuarios.findOne({ _id: id })
    res.status(200).send(usuario);

    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  registro: async (req, res) => {  // Registro de usuario, busca en db si el correo y nickname ingresados existen, sino existen procede a crearlo.
    const { edad, nickname, correo_electronico, contrasena } = req.body;

    try {
      const isUser = await Usuarios.findOne({ correo_electronico })
      const isNickname = await Usuarios.findOne({ nickname })
      if (isUser) { 
        return res.status(403).send('El usuario ya existe!');

      } else if (isNickname) {
        return res.status(409).send('Este nickname ya existe!')

      } else {  // En la creación, añade un salt al hash el cual encripta la contraseña ingresada en el formulario.
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(contrasena, salt);
      const usuario = await Usuarios.create({ edad, nickname, correo_electronico, contrasena: hashed});
      const firma = firmaToken(usuario._id)
      res.status(201).send(firma);
    }

    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  login: async (req, res) => {  // Login de usuario, valida en db si el correo ingresado existe, luego compara el hash de la contraseña.
    const { correo_electronico, contrasena } = req.body;
    
    try {
      const usuario = await Usuarios.findOne({ correo_electronico })
      if (!usuario) {
      return res.status(401).send('Usuario y/o contraseña inválida');

      } else {
        const contrasenaCorrecta = await bcrypt.compare(contrasena, usuario.contrasena);
        if (contrasenaCorrecta) {
          const firma = firmaToken(usuario._id)
          res.status(200).send(firma)  // Devuelve el token firmado despues de inciar sesión.
        } else {
          res.status(403).send('Ingresa una contraseña válida!')
        }
    }

    } catch (err) {
      res.status(500).send(err.message);
    }
  },
  
  restablecerContrasena: async (req, res) => {  // Ruta para restablecer la contraseña, valída si el correo ingresado existe para proceder (envio de email, "pronta implementación"), sino existe muestra un mensaje de error.
    const { correo_electronico } = req.body;

    try {
      const isUser = await Usuarios.findOne({ correo_electronico })
      if (!isUser) {
      return res.status(401).send('Ingresa un correo electrónico válido.');

      } else {
        res.status(200).send('Restablecimiento de contraseña exitoso!')
      }
        
      } catch (err) {
        res.status(500).send(err.message);
      } 
  }, 
    
  updateData: async (req, res) => {  // Endpoint para actualizar cualquier dato del usuario, (debe estar logeado).
    const { id } = req.params;
    const { contrasena } = req.body
    
    try {
    const dataUser = await Usuarios.findOne({ _id: id })
    
    if (!contrasena) {  // Para actualizar cualquier dato, omite el campo de contraseña en caso que no se quiera actualizarla.
      await Object.assign(dataUser, req.body)
      await dataUser.save()
      res.sendStatus(204);
      return;

    } else {  // Actualiza la contraseña añadiendo un nuevo salt y un nuevo hash para ecriptarla, tambien permite actualizar contraseña junto a otros campos.
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(contrasena, salt);
    dataUser.contrasena = hash;
    delete req.body.contrasena;  // Metodo para no sobrescribir la contraseña ingresado en texto plano por el hash encriptado.
      
    await Object.assign(dataUser, req.body)
    await dataUser.save()
    res.sendStatus(204);
    }

    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  eliminarUsuario: async (req, res) => {  // Permite eliminar un usuario en db, (debe estar logeado).
    const { id } =  req.params;
    
    try {
    const deleteUser = await Usuarios.findOne({ _id: id })
    if (deleteUser) {
    await deleteUser.deleteOne()
    }
    res.sendStatus(204);

    } catch (err) {
      res.status(500).send(err.message);
    }
  }
}
  
export { auth, validarJwt };  // Exportación del objeto con las rutas y el middleware para la autorización.