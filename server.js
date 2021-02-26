const path = require("path");
const express = require("express");
const app = express(); // create express app
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('matt/public'));
}
// Define API routes here
// Send every other request to the React app
// Define any API routes before this runs
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './matt/public/index.html'));
});
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "./client/public", "index.html"));
// });

// start express server on port 5000
app.listen(5000, () => {
  console.log("server started on port 5000");
});