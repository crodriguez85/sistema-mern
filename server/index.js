const express = require('express');

const app = express();

app.set('port', process.env.PORT || 4000);

app.listen(3000, () => {
    console.log('Server Listening on port 3000')
})