const cors = require('cors');
const express = require('express');
const mongoose = require('./mongoose');
const cookieParser = require('cookie-parser');
const PORT = require('./config/config.development.json').PORT;
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./path/swagger.json');

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

const swaggerDefinition ={
    openapi:'3.0.0',
    info:{
        title:'API for JSONPlaceholder',
        version:'1.0.0',
        description:'API application'
    }
    // ,
    // servers:[{
    //     url:"http://localhost:5000",
    //     description:'Development'
    // }]
};

const option ={
    swaggerDefinition,
    apis:['./routes/*.js']
}

const swaggerSpec = swaggerJSDoc(option);

//--------------API-start--------------------//
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/user',require('./routes/userRoute'));
app.use('/api',require('./routes/taskRoute'));

//--------------API-end----------------------//


app.listen(
    PORT, ()=>{
        console.log(`Server is live on ${PORT}`);
    }
)