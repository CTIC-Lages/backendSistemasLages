const fs = require("fs")

const passport = require('passport');
const passportSaml = require('passport-saml');
require('dotenv/config')


passport.serializeUser((user, done) => {
 
  done(null, user);
});


passport.deserializeUser((user, done) => {
 
  done(null, user);
});


const strategy = new passportSaml.Strategy(
  {
   
    
    callbackUrl: process.env.CALLBACK,
 
    entryPoint:process.env.ENTRYPOINT ,
   
    issuer: process.env.ISSUER,
    
    privateKey:fs.readFileSync(process.env.PRIVATEKEY, "utf-8"),
 
    cert:fs.readFileSync(process.env.CERTIFICATE, "utf-8"),
 
  },
  (profile, done) => {
    console.log("Dentro da config")
    done(null, profile)
  },
  )

// console.log("tentando mostarar")
// console.log(strategy.issuer)
passport.use(strategy);

module.exports = passport;