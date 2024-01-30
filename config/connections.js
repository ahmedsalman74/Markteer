const mongoose = require('mongoose')

const uri = process.env.MONGO_URL;
const dbConnection = ()=>{
mongoose
.connect(uri)
    .then((conn) => {
        console.log(`DB connection established successfully ${conn.connection.host}`)

    })
    
}
module.exports = dbConnection