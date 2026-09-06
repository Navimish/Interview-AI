const dns = require("node:dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

require('dotenv').config();


const app = require('./src/app')
const ConnectDB = require('./src/config/db.connection')






ConnectDB();


const PORT = process.env.PORT || 5000;



app.listen(PORT,()=>{
    console.log(`Server Started at Port ${PORT}`);
    
})