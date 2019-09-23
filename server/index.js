import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import router from './routes/index';
require('dotenv').config();

// Conexion MongoDB
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
.then(mongoose => console.log('Conectado a Mongo'))
.catch(error => console.error(error))
const app = express();
app.use(morgan('dev'));
app.use(cors());

// Use formato json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api', router);

app.set('port', process.env.PORT || 4000);

app.listen(app.get('port'), () => {
    console.log(`Server listening on localhost:${app.get('port')}`)
})