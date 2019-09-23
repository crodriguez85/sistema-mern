import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

const app = express();
app.use(morgan('dev'));
app.use(cors());

// Use formato json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('port', process.env.PORT || 4000);

app.listen(app.get('port'), () => {
    console.log(`Server listening on localhost:${app.get('port')}`)
})