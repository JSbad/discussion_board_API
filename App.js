const express = require("express");
const routes = require('./routes');
const port = 3000;
const app = express();

app.use(
  express.urlencoded({
    extended: false,
  })
);

//Handle all routes in routes/index.js
app.use('/', routes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
