import express from 'express'
const bodyParser=require('body-parser');
import routes from './routes'
import passport from './config/passport'
import database from './database';
var session = require("express-session")
const cookieParser = require('cookie-parser');
require('dotenv/config')
console.log(`iniciando ambiente de ${process.env.NODE_ENV }`)
const path = require("path");
const cors = require('cors');



const app = express()

app.use( cors({
    origin: "http://localhost:5000", // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // allow session cookie from browser to pass through
}))



const configExpress = () =>{
    
   
    
    app.use(session({secret: 'ifscProduction'}));
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(cookieParser())
    app.use('/files', express.static(path.resolve(__dirname,  "tmp", "uploads")));
    app.use('/', routes)
    app.database = database
    return app
}

export default async () =>{
    const app = configExpress()
    await app.database.connect()
  
    return app
}

