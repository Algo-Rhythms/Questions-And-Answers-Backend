const express = require('express');
const app = express();
const PORT = 3001;
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

app.use(express.static('../client/dist'));
app.use(jsonParser);

// GET /qa/:product_id
app.get('/qa/:product_id', (req, res) => {
});
// GET /qa/:question_id/answers
app.get('/qa/:question_id', (req, res) => {
});
// POST /qa/:product_id
app.post('qa/:product_id', (req, res) => {
});
// POST /qa/:question_id/answers
app.post('qa/:question_id', (req, res) => {
});
// PUT /qa/question/:question_id/helpful
app.put('qa/:product_id', (req, res) => {
});
// PUT /qa/question/:question_id/report
app.put('qa/:product_id', (req, res) => {
});
// PUT /qa/answer/:answer_id/helpful
app.put('qa/:product_id', (req, res) => {
});
// PUT /qa/answer/:answer_id/report
app.put('qa/:product_id', (req, res) => {
});

app.listen(PORT, () => {
  console.log(`Server running and listening on port: ${PORT}`);
});
