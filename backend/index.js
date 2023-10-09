const connectToMongo = require("./db");
const express = require('express');
const app = express();
const { query, validationResult } = require('express-validator');
const port = 5000;
var cors = require('cors')

app.use(cors())

app.use(express.json());
connectToMongo();
app.get('/', query('person').notEmpty(), (req, res) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    return res.send(`Hello, ${req.query.person}!`);
  }

  res.send({ errors: result.array() });
});
// available routes
app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));
app.listen(port, () => {
    console.log(`Example app listening on port https://localhost:${port}`)
  })