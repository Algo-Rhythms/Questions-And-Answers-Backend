const  { connection } = require('./db.js');

connection.connect();

const getQuestionsByProduct = (req, cb) => {
  console.time("AllQuestionsTimer");
  const productId = req;

  const query = `
  SELECT questions.*, answers.*, photos.*
  FROM questions
  FULL OUTER JOIN answers
  ON questions.q_id = answers.question_id
  FULL OUTER JOIN photos
  ON answers.a_id = photos.answer_id
  WHERE questions.product_id = ${productId}
  ORDER BY q_id ASC; 
  `;

  connection.query(query, (err, results) => {
    if (err) {
      console.log(err, ' -- Problem with querying database.');
      cb(err, null);
    } else {
      console.log('Successful query: ', results);
      cb(null, results);
      console.timeEnd("AllQuestionsTimer");
    }
  })
};

const getAllProducts = (req, cb) => {
  console.time("Product Timer");
  const id = req;
  const query = `SELECT * FROM products WHERE id = ${id}`;
  connection.query(query, (err, results) => {
    if (err) {
      console.log(err, ' -- Problem with querying database.');
      cb(err, null);
    } else {
      console.log('Successful query: ', results);
      cb(null, results);
      console.timeEnd("Product Timer");
    }
  });
};

module.exports = { getQuestionsByProduct, getAllProducts };
