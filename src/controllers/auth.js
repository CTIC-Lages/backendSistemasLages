
const {criptografar, compararSenha, assinar, verificarToken,  verificarUsuario} = require('../utils/helpers')
// const generateToken =require('../config/generateToken')
class AuthController{
    constructor(Usuario){
        this.Usuario = Usuario
    }

  async   verificar(req, res) {
      try{
          let usuario = {
              nome:'',
              matricula:'',
              tipo:'',
              email:''
            }
          usuario.email = req.session.passport.user.email
          usuario.matricula = req.session.passport.user.o
          usuario.nome = req.session.passport.user.nameID
          usuario.tipo = req.session.passport.user.title
         
          let u = await this.Usuario.findOne({email:usuario.email})
          console.log("tentando criar usuario")
        
          console.log(u ===null)
          if(u===null){
            console.log("usuario nao cadastrado")
            const user = new this.Usuario(usuario)
           
          
            await user.save()
            const usuarioRetorno = await this.login(usuario)
            // await generateToken(res, usuario.matricula, usuario);
            // res.redirect('https://sistemas2.lages.ifsc.edu.br/');
            // res.status(200).json(usuarioRetorno)
            return usuarioRetorno
          }  else{
           
              // res.redirect('https://sistemas2.lages.ifsc.edu.br/');
              
              const usuarioRetorno = await this.login(usuario)
              return usuarioRetorno
              // res.status(200).json(usuarioRetorno)
            
          }
       



      }catch(err){
        console.log("Aconteceu algum erro")
        console.log(err)
        return null
        // res.status(422).send(err.message)
      }
     
     
    }

    async login(usuario){
     
      let token = assinar(usuario.matricula)
      return {...usuario,token:token}
    
      
  }







    // async create(req, res) {
    //     try{
    //         let u = await this.Usuario.findOne({email:req.body.email})
    //         console.log("tentando criar usuario")
    //         console.log(u)
    //         console.log(u ===null)
    //         if(u===null){
    //           console.log("usuario nao cadastrado")
    //           const user = new this.Usuario(req.body)
    //           user.password = criptografar(req.body.password)
            
    //           await user.save()
    //           delete user.password
    //           res.status(200).json(user)
    //             // this.Usuario.create(req.body,(err, usuario)=>{
    //             // if (err) return handleError(err);
		// 	    // 	console.log(i)

    //             // res.status(200).send(usuario)
    //             // })
    //         }  else{
    //             console.log("entrei no falso")
    //             res.status(403).json({message:'email j?? cadastrado'})
    //         }
         



    //     }catch(err){
    //       console.log(err)
    //       res.status(422).send(err.message)
    //     }
       
       
    //   }

    // async login(req, res){
       
    //     const password = req.body.password
    //     const email = req.body.email
    //     try{
    //     this.Usuario.findOne({email:email}).lean().exec(
    //         (err, user)=>{
    //             if(err || user==null){
    //                 return res.status(500).json({
    //                     message:"server error" , error:err
    //                 })

    //             }
                
    //             const auth_err = (password =='' || password== null)
               
    //             if(!auth_err){
              
                   
    //                if(compararSenha(password,user.password)){
                  
    //                 let token = assinar(user._id)
    //                 delete user.password
    //                 return  res.status(200).json({...user,token:token})
    //                }
    //                else{
    //                 return res.status(500).json({
    //                     message:"senha n??o confere" , error:err
    //                 })
    //                }
    //             }else{
    //                 return res.status(500).json({
    //                     message:"senha nula ou vazia" , error:err
    //                 })
    //             }
    //         }
    //     )
    //     }catch(err){
    //         return res.status(500).json({
    //             message:"Erro interno" , error:err
    //         }) 
    //     }
        
    // }


  //   async login(req, res){
       
  //     const password = req.body.password
  //     const email = req.body.email
  //     try{
  //     this.Usuario.findOne({email:email}).lean().exec(
  //         (err, user)=>{
  //             if(err || user==null){
  //                 return res.status(500).json({
  //                     message:"server error" , error:err
  //                 })

  //             }
              
  //             const auth_err = (password =='' || password== null)
             
  //             if(!auth_err){
            
                 
  //                if(compararSenha(password,user.password)){
                
  //                 let token = assinar(user._id)
  //                 delete user.password
  //                 return  res.status(200).json({...user,token:token})
  //                }
  //                else{
  //                 return res.status(500).json({
  //                     message:"senha n??o confere" , error:err
  //                 })
  //                }
  //             }else{
  //                 return res.status(500).json({
  //                     message:"senha nula ou vazia" , error:err
  //                 })
  //             }
  //         }
  //     )
  //     }catch(err){
  //         return res.status(500).json({
  //             message:"Erro interno" , error:err
  //         }) 
  //     }
      
  // }
    check_token(req, res, next){
       verificarToken(req, res, next)
        
    }
    user_date(req, res){
      verificarUsuario(req,res,  this.Usuario)
    }




    // async delete(req,res){
    //   try{
    //     const item = await this.Item.findById(req.params.id)
    //     await this.Item.deleteOne(item);
    //     return res.send({}); 
    // } catch(err){
    //     res.status(422).send(err.message)
    //  }
    // }

    // async update(req,res){
    
    //    this.Item.findById( req.params.id , (err,item)=>{
    //     if(err){
    //       console.log("erros")
    //     }else{      
    //       item.titulo = req.body.titulo
    //       item.linkResource = req.body.linkResource
    //       item.imagem = req.body.imagem
    //       item.item = req.body.item
    //       item.save().then(
    //         (i)=>{
              
    //           res.send(i)
    //         }
    //       ).catch(
            
    //         (e)=>{
           
    //           res.status(500).send(e)
    //         }

    //       )
    //     }
    //    })
     
  
    
     
    // }

}

export default AuthController