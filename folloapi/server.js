const express = require ('express');
const routes = require(__dirname+'/routes/routes.js');
const bodyParser = require('body-parser');
var cors = require('cors');
let app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/', routes);

app.listen(3000, err => {
    if (err){
        console.log(err);
    }
    console.log('app started on 3000');
})

