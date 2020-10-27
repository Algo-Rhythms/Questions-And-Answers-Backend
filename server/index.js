require('newrelic');
const express = require('express');
const app = express();
const PORT = 3001;
const queries = require('../database/queries.js');
var cluster = require('cluster');
var numCPUs = require('os').cpus().length;

app.use(express.static('../client/dist'));
app.use(express.json());

const dataParser = (data) => {
  var rows = data.rows;
  // create a results array
  var resultsArray = [];
  // create a photos array
  var photos = [];
  // pull data out of each row and assign it to its appropriate location
  var answersObj = {};
  var answer = {}
  var questionObj = {}
  // loops over the rows returned and maps each row to the following format: 
  for (var i = 0; i < rows.length; i++) {
    const row = rows[i];
    // consider if the consecutive rows have the same q_id > 
    if (data.rows[i - 1] && row.q_id === data.rows[i - 1].q_id) {
      // consider if the consecutive rows (with the same q_id) have the same a_id > 
      if (data.rows[i - 1].a_id && row.a_id === data.rows[i - 1].a_id) {
        photo = {};
        photo.id = row.p_id;
        photo.url = row.url;
        photos.push(photo);
      } else {
        // if question IDs match but answer IDs do not match
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
        // if the next row contains a new question, push the previous question Obj and define an entirely new question Obj
        if (Object.keys(questionObj).length) {
          resultsArray.push(questionObj);
        }
        // redefine everything in the case of a new question > 
        questionObj = {};
        answersObj = {};
        answer = {};
        photos = [];
        photo = {};
        // define photo object and push to photos array >
        photo.id = row.p_id || null;
        photo.url = row.url || "";
        photos.push(photo);
        // define answer object and add to answersObj >
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
  // adds all data above to a final return object
  const returnObject = {
    product_id: data.rows[0].product_id,
    results: resultsArray
  }
  // returns this object formatted correctly 
  return returnObject;
};

// CREATE CLUSTER: 
if (cluster.isMaster) {
  for (var i = 0; i < numCPUs; i++) {
      cluster.fork();
  }
} else {
  // GET product by ID
  app.get('/products/:id', (req, res) => {
    console.log('Product -server- : ', req.params.id);
    const id = req.params.id;
    queries.getAllProducts(id, (err, data) => {
      if (err) {
        console.log('Could not fetch products.');
        res.status(404);
      } else {
        res.status(200).send(data.rows[0]);
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

  // POST /qa/:product_id
  app.post('/qa/:product_id', (req, res) => {
    const id = req.params.product_id;
    const body = req.body;
    queries.postQuestion(id, body, (err, data) => {
      if (err) {
        console.log('Question not posted.');
        res.status(404).send(err);
      } else {
        console.log('Database post successful.');
        res.status(201).send(data);
      }
    });
  });

  // POST /qa/:question_id/answers
  app.post('/qa/:question_id/answers', (req, res) => {
    const id = req.params.question_id;
    const body = req.body;
    queries.postAnswer(id, body, (err, data) => {
      if (err) {
        console.log('Answer not posted.');
        res.status(404).send(err);
      } else {
        console.log('Answer posted.');
        res.status(201).send(data);
      }
    });
  });

  // PUT /qa/question/:question_id/helpful
  app.put('/qa/question/:question_id/helpful', (req, res) => {
    const id = req.params.question_id;
    queries.updateHelpfulness(id, (err, data) => {
      if (err) {
        console.log('Helpfulness not updated.');
        res.status(404);
      } else {
        console.log('Helpfulness updated')
        res.status(204).send(data);
      }
    });
  });

  // PUT /qa/question/:question_id/report
  app.put('/qa/question/:question_id/report', (req, res) => {
    const id = req.params.question_id;
    queries.updateQuestionReported(id, (err, data) => {
      if (err) {
        console.log('Report not updated.');
        res.status(404);
      } else {
        console.log('Report updated')
        res.status(204).send(data);
      }
    });
  });

  // PUT /qa/answer/:answer_id/helpful
  app.put('/qa/answer/:answer_id/helpful', (req, res) => {
    const id = req.params.answer_id;
    queries.updateHelpfulAnswer(id, (err, data) => {
      if (err) {
        console.log('Helpfulness not updated.');
        res.status(404);
      } else {
        console.log('Helpfulness updated')
        res.status(204).send(data);
      }
    });
  });

  app.listen(PORT, () => {
    console.log(`Server running and listening on port: ${PORT}`);
  });

}