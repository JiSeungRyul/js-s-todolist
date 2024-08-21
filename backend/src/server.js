const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/test', (req, res) => {
    res.json({ message: 'API is working!!! plz...!!!' });
  });

app.post('/api/tasks', (req,res) => {
  const { title, completed } = req.body;
  console.log('req data: ', { title, completed });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});