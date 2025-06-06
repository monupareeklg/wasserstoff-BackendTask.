const express = require('express');
const app = express();

app.use(express.json());

app.get('/fast', (req, res) => {
  res.send('Fast response');
});

app.get('/slow', (req, res) => {
  setTimeout(() => {
    res.send('Slow response');
  }, 5000);
});

app.post('/data', (req, res) => {
  res.json({ message: 'Data received', data: req.body });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Mock REST API running on port ${PORT}`);
});
