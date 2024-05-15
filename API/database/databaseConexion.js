import mongoose from "mongoose"; // Biblioteca de MongoDB para el modelado de DB.

mongoose.connect('mongodb+srv://adso2024:ADSOsena@cluster0.aotpxlk.mongodb.net/auth?retryWrites=true&w=majority&appName=Cluster0');  // Método para establecer la conexion en AtlasDB (servicio en la nube de MongoDB).

const Usuarios = mongoose.model('usuarios', {   // Creación del modelo! Colección "Usuarios" con un documento y sus propiedades tipadas.
  edad: { type: Number, required: true, maxLength: 2 },
  nickname: { type: String, required: true },
  correo_electronico: { type: String, required: true, minLength: 5 },
  contrasena: { type: String, required: true },
})

export default Usuarios;  // Exporto el modelo con la conexión.