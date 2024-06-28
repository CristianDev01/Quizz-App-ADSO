import mongoose from "mongoose";

mongoose.connect('mongodb+srv://adso2024:ADSOsena@cluster0.aotpxlk.mongodb.net/auth?retryWrites=true&w=majority&appName=Cluster0');

const Usuarios = mongoose.model('usuarios', {
  edad: { type: Number, required: true, maxLength: 2 },
  nickname: { type: String, required: true },
  correo_electronico: { type: String, required: true, minLength: 5 },
  contrasena: { type: String, required: true },
})

export default Usuarios;