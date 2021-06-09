import express from 'express'
import AuthController from '../controllers/auth'
import Usuario from '../models/usuario'
import passport from '../config/passport'
const router = express.Router()
const authController = new AuthController(Usuario)



router.get('/usuario',(req,res)=>{
    authController.user_date(req,res)
})

//chama o IDP
router.get('/',passport.authenticate('saml', {  failureRedirect: '/', failureFlash: true }),
  function(req, res) {
    res.redirect('/');
})
router.get('/token',async(req,res)=>{


  if(req.isAuthenticated()){
    // res.status(200).json({usuario:"edoardo"})
    
    const resultado =   await authController.verificar(req, res)
   
   
    res.status(200).json(resultado)
  }else{
    res.status(401).json({message:"Não está logado"})
  }
  
})
// IDP chama esse url
router.post('/callback',passport.authenticate("saml", {successRedirect:"/", failureRedirect: "/", failureFlash: true }),
function (req, res) {
  // authController.verificar(req, res)
  console.log("Chamando api callback")
  // res.redirect('https://sistemas2.lages.ifsc.edu.br/');
  

})
module.exports = router