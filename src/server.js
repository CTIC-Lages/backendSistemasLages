import setupApp from './app';


// app.listen(port,()=>{
//     console.log(`running on port ${port}...`)
// })

( async()=>{
    try{
        // const port = 5000
        console.log("Dentro do asyn")
        const port = process.env.PORT_SERVICE
        console.log("porta: "+port)
        const app = await setupApp()
        const server = app.listen(port,'localhost', ()=>{
            console.info(`running on port ${port}...`)
        })
        const exitSignals = ["SIGINT", "SIGTERM", "SIGQUIT"]

        exitSignals.map(sig =>
            process.on(sig , ()=>
            server.close(err =>{
                if(err){
                    console.error(err)
                    process.exit1()
                }
                app.database.connection.close(function(){
                    console.info("Database connection closed!")
                    process.exit(0)
                })
            })
          ))
    }
    catch(error){

    }
})()