const express = require ('express');
const app = express() ;
const dbRoutes =  require("./routes/db") ;

app.use(express.json()) ;
app.use('api' , dbRoutes)                
app.listen(5000,  ()=>{
    console.log('Server is running on port  3000')

})

