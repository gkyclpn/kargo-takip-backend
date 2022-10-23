const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = 4000;
app.use(cors());
app.use(bodyParser.json());
//require("./routes/user.routes")(app);


app.get("/", (req, res) => {
    res.send("Merhaba Dünya");
})

app.listen(PORT, () => {
  console.log("Server is running on Port: " + PORT);
});