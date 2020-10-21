const express = require('express');
const app = express();
const PORT = 3001;
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const queries = require('../database/queries.js');

app.use(express.static('../client/dist'));
app.use(jsonParser);

const questionsObject = () => {
  
  return {
    "product_id": req.params.id,
    "results": [{
          "question_id": 37,
          "question_body": "Why is this product cheaper here than other sites?",
          "question_date": "2018-10-18T00:00:00.000Z",
          "asker_name": "williamsmith",
          "question_helpfulness": 4,
          "reported": 0,
          "answers": {
            68: {
              "id": 68,
              "body": "We are selling it here without any markup from the middleman!",
              "date": "2018-08-18T00:00:00.000Z",
              "answerer_name": "Seller",
              "helpfulness": 4,
              "photos": []
              // ...
            }
          }
        }]
      };
    };

// GET product by ID
app.get('/products/:id', (req, res) => {
  console.log('Product -server- : ', req.params.id);
  const id = req.params.id;
  queries.getAllProducts(id, (err, data) => {
    if (err) {
      console.log('Could not fetch products.');
      res.status(404);
    } else {
      console.log('data: ', data);
      res.status(201).send(data);
      console.log('Database query successful: ', data);
    };
  });
});

// GET all questions by product_id
app.get('/qa/:product_id', (req, res) => {
  console.log('Product_id -server- : ', req.params.product_id);
  const productId = req.params.product_id;
   queries.getQuestionsByProduct(productId, (err, data) => {
    if (err) {
      console.log('Could not fetch questions.');
      res.status(404);
    } else {
      res.status(201).send(data);
      console.log('Database query successful: ', data);
    };
  });
});
// GET /qa/:question_id/answers
app.get('/qa/:question_id/answers', (req, res) => {

});
// POST /qa/:product_id
app.post('qa/:product_id', (req, res) => {
});
// POST /qa/:question_id/answers
app.post('qa/:question_id/answers', (req, res) => {
});
// PUT /qa/question/:question_id/helpful
app.put('qa/question/:product_id/helpful', (req, res) => {
});
// PUT /qa/question/:question_id/report
app.put('qa/question/:question_id/report', (req, res) => {
});
// PUT /qa/answer/:answer_id/helpful
app.put('qa/answer/:answer_id/helpful', (req, res) => {
});
// PUT /qa/answer/:answer_id/report
app.put('qa/answer/:answer_id/report', (req, res) => {
});
// DELETE /qa/question_id


app.listen(PORT, () => {
  console.log(`Server running and listening on port: ${PORT}`);
});
