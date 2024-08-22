require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.SERVER_PORT;

const todoRoute = require('./routes/todoRoute');

app.use(cors());
app.use(express.json());

//test
app.get('/', (req, res) => {
  res.send('Hello!!! Welcome to my apps!!!')
});

//test
app.get('/api', (req, res) => {
  res.send('Hello!!! Welcome to my apps!!! 222')
});

//to-do
app.use('/api',todoRoute);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});