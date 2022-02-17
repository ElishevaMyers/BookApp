const express = require("express");

const app = Express();

const port = 3000;
app.get("/", (req, res) => {
  res.send("hello world");
  //   res.json(Books);
});

app.listen(port, () =>
  console.log(`Hello world app listening on port ${port}!`)
);
