const express = require('express');
const bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.json());
const PORT= 7007;
require("./src/route/employee.route")(app);
const connectDB= require('./src/config/db.config');

connectDB().then(()=>
  console.log("Sucessfully connected DB")).
  catch(err=>
    console.log('failed to connect DB '+err));

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})