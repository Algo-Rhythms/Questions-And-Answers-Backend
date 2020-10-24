const express = require('express');
const app = express();
const PORT = 3001;
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const queries = require('../database/queries.js');

app.use(express.static('../client/dist'));
app.use(jsonParser);

const dataParser = (data) => {
  console.log('data: ', data);
  var rows = data.rows;
  // create a results array
  var resultsArray = [];
  // create a photos array
  var photos = [];
  // pull data out of each row and assign it to its appropriate location
  var answersObj = {};
  var answer = {}
  var questionObj = {}

  for (var i = 0; i < rows.length; i++) {
    const row = rows[i];

    if (data.rows[i - 1] && row.q_id === data.rows[i - 1].q_id) {

      if (data.rows[i - 1].a_id && row.a_id === data.rows[i - 1].a_id) {

        photo = {};
        photo.id = row.p_id;
        photo.url = row.url;
        photos.push(photo);

      } else {
        // question IDs match but answer IDs do not match
        if (row.a_id) {
          answer = {};
          photo = {};
          photos = [];
   
          photo.id = row.p_id || null;
          photo.url = row.url || "";
          photos.push(photo);
  
          answer.id = row.a_id || null;
          answer.body = row.answer_body || "";
          answer.date = row.date || "";
          answer.answerer_name = row.answerer_name || "";
          answer.helpfulness = row.helpfulness || null;
          answer.reported = row.reported || null;
          answer.question_id = row.question_id || null;
          answer.photos = photos;
          // add the answers array AND the photos to the photos array 
          questionObj.answers[row.a_id] = answer;
        } 
      }
    } else {
        // if the next question does not have the same q_id, CREATE a new question object (everything is new here starting at the question)
        if (Object.keys(questionObj).length) {
          resultsArray.push(questionObj);
        }
        // redefine
        questionObj = {};
        answersObj = {};
        answer = {};
        photos = [];
        photo = {};

        // define photo object and push to photos array
        photo.id = row.p_id || null;
        photo.url = row.url || "";
        photos.push(photo);

        // define answer object and add to answersObj
        answer.id = row.a_id || null;
        answer.body = row.answer_body || "";
        answer.date = row.date || null;
        answer.answerer_name = row.answerer_name || "";
        answer.helpfulness = row.helpfulness || null;
        answer.reported = row.reported || null;
        answer.question_id = row.question_id || null;
        answer.photos = photos;
        answersObj[row.a_id] = answer;

        // define question object
        questionObj.question_id = row.q_id;
        questionObj.question_body = row.body || "";
        questionObj.question_date = row.question_date || "";
        questionObj.asker_name = row.asker_name || "";
        questionObj.question_helpfulness = row.reported || null;
        questionObj.reported = row.reported || null;
        questionObj.product_id = row.product_id || null;
        questionObj.answers = answersObj;
    }
  }

  const returnObject = {
    product_id: data.rows[0].product_id,
    results: resultsArray
  }
  
  return returnObject;
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
      const results = dataParser(data);
      console.log('parsed data: ', results);
      res.status(200).send(results);
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
