const express = require("express");
const routes = require('./routes');
const cors = require('cors');
const port = 3000;
const app = express();

//Enable cors
app.use(cors());
//Enable body parsing
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(__dirname+'/public'));
app.use('/images', express.static(__dirname+'/images'));

//Handle all routes in routes/index.js
app.use('/', routes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
