import mongoose from 'mongoose';
//import config from 'config'
require('dotenv/config')

const mongodbUrl = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
//const mongodbUrl = config.get('database.mongoUrl');
const connect = () => {
  // console.log("Entrando no connect")
  // console.log(mongodbUrl)
  console.log(mongoose.connect(mongodbUrl,{
    useNewUrlParser: true, useUnifiedTopology: true 
  }))
  return  mongoose.connect(mongodbUrl,{
    useNewUrlParser: true, useUnifiedTopology: true 
  })
}

const close = () =>{
    return mongoose.connection.close()
} 

export default {
    connect,
    connection: mongoose.connection
}