const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Donor = require("./routes/donor");
const app = express();

var corsOptions = {
    origin: 'https://gracious-visvesvaraya-237cb1.netlify.com',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
//app.use(morgan("tiny"));
app.use(express.json());
app.use(cors());

// to make request body as json object
// app.use(express.urlencoded({ extended: true })); //to understand url parameters
app.use(express.static("public"));

app.use("/donor/", Donor);
app.get("/", (req, res) => {
  // const sortBy = req.query.sortBy;
  res.send("hello world");
});

let port = process.env.PORT || 20123;

app.listen(port, () => {
  console.log(`listening on port ${port} ... `);
});
