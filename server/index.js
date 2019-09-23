const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));


app.set('port', process.env.PORT || 4000);


app.listen(app.get('port'), () => {
    console.log(`Server listening on localhost:${app.get('port')}`)
})