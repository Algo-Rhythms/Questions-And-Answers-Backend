const  { connection } = require('./db.js');

connection.connect();

const getQuestionsByProduct = (req, cb) => {
  console.time("AllQuestionsTimer");
  const productId = req;
  const query = `SELECT * FROM questions WHERE product_id = ${productId}`;
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

module.exports = { getQuestionsByProduct };