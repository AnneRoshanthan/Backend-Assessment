const mongoose = require('mongoose');
const URI = require('./config/config.development.json').MONGODB_CONNECTION;
console.log(URI);
mongoose.connect(URI)
.then((res)=>{
    console.log('Database connected');
})
.catch((error)=>{
    console.log(error);
})