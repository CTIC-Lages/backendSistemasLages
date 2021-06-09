import mongoose from 'mongoose'
const usuarioSchema = new mongoose.Schema({
    nome:String,
    login:String,
    email:String,
    tipo:String,
    matricula:String
    
    
})


//Criando um model pessoa
const Usuario = mongoose.model("Usuario",usuarioSchema)
export default Usuario