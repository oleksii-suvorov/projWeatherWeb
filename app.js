const express = require("express");
app = express();

app.use(express.static(__dirname));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.listen(3001, function () {
  console.log(`Your server has been started on port ${process.env.PORT}`);
});
