const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/index');
const db = require('./models/index');

const {PORT} = require('./config/serverConfig');

const setupAndStartServer=() =>{

    app.use('/api',apiRoutes);
 
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    
    app.listen(PORT, ()=>{
        console.log(`server started at ${PORT}`);
        if(process.env.DB_SYNC){
            db.sequelize.sync({alter: true});
        }
    })
}
setupAndStartServer();