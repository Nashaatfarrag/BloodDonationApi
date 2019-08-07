const express = require('express');
var bodyParser = require('body-parser')
const Donor = require('./routes/donor');
const app = express();

app.use(express.json());
// to make request body as json object
// app.use(express.urlencoded({ extended: true })); //to understand url parameters
app.use(express.static("public"));

app.get('/', (req, res) => {
    // const sortBy = req.query.sortBy;
    res.send("hello world");}
);

app.use("/donor/", Donor);

let port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`listening on port ${port} ... `)
});
