
import Usuarios from './database.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const validacionToken = (req, res, next) => {
  const token = req.cookies.access_token
  req.session = { usuario: null }

  try {
    const data = jwt.verify(token, "my-secreto-jwt")
    req.session.usuario = data
  } catch {}

  next()
}

const auth = {  

  login: async (req, res) => {
    const { correo_electronico, contrasena } = req.body;
    
    try {
      const usuario = await Usuarios.findOne({ correo_electronico })
      if (!usuario) {
      return res.status(401).send('Correo electrónico invalido!');

      } else {
        const contrasenaCorrecta = await bcrypt.compare(contrasena, usuario.contrasena);
        if (contrasenaCorrecta) {
          const token = jwt.sign({ id: usuario._id, nickname: usuario.nickname },
            "my-secreto-jwt", 
            )
          res
            .cookie('access_token', token, {
              httpOnly : true,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'strict',
              maxAge: 1000 * 60 * 60
            })
            .status(200).send('Iniciando sesión...')

        } else {
        res.status(403).send('Ingresa una contraseña válida!')
        }
    }

    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  registro: async (req, res) => {
    const { edad, nickname, correo_electronico, contrasena } = req.body;

    try {
      const isUser = await Usuarios.findOne({ correo_electronico })
      const isNickname = await Usuarios.findOne({ nickname })
      if (isUser) { 
        return res.status(403).send('El usuario ya existe!');

      } else if (isNickname) {
        return res.status(409).send('Este nickname ya existe!')

      } else {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(contrasena, salt);
      const usuario = await Usuarios.create({ edad, nickname, correo_electronico, contrasena: hashed});
      const token = jwt.sign({ id: usuario._id, nickname: usuario.nickname },
        "my-secreto-jwt", 
        )
        res
            .cookie('access_token', token, {
              httpOnly : true,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'strict',
              maxAge: 1000 * 60 * 60
            })
            .status(201).send('Registro existoso')
          }

    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  admin: async (req, res) => {  
    try {
      const { usuario } = req.session
        
      if(!usuario) {
        return res.status(403).send('No autorizado, inicia sesión!')
      }
      res.status(200).json({ nickname: usuario.nickname })

    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  cerrarSesion: async (req, res) => {
    res.status(204).clearCookie('access_token').send()
    
  },

  
  restablecerContrasena: async (req, res) => {
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
    
  updateData: async (req, res) => {
    const { id } = req.params;
    const { contrasena } = req.body
    
    try {
    const dataUser = await Usuarios.findOne({ _id: id })
    
    if (!contrasena) {
      await Object.assign(dataUser, req.body)
      await dataUser.save()
      res.sendStatus(204);
      return;

    } else { 
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(contrasena, salt);
    dataUser.contrasena = hash;
    delete req.body.contrasena;
      
    await Object.assign(dataUser, req.body)
    await dataUser.save()
    res.sendStatus(204);
    }

    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  eliminarUsuario: async (req, res) => {
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
  
export { auth, validacionToken };