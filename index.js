const express = require('express');
const cors = require('cors');
const axios = require('axios');

const PORT = process.env.PORT || 4000;

const app = express();

app.use(cors());

app.get('/playerData', (req, res) => {
  const id = req.query.id || '464';
  axios
    .get(`https://statdata.pgatour.com/r/${id}/leaderboard-v2mini.json`)
    .then((response) => {
      res.json(response.data);
    });
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('pga-leaderboard/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pga-leaderboard', 'index.html'));
  });
}
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
