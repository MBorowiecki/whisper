const express = require('express');

const app = express()
const port = 3000;

app.use(express.json())
app.use(function(req, res, next) {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  
    next();
  
  });

app.listen(port, () => {
    console.log('App has successfully started. Now you can do magic!')
})