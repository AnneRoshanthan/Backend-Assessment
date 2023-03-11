const cors = require('cors');
const express = require('express');
const mongoose = require('./mongoose');
const cookieParser = require('cookie-parser');
const PORT = require('./config/config.development.json').PORT;
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./path/swagger.json');

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());


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