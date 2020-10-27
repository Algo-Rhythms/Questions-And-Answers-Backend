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
  ORDER BY q_id ASC LIMIT 10;
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
  });
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

const postQuestion = (id, body, cb) => {
  console.log('id: ', id);
  console.log('body: ', body);
  console.time("Post Question");
  const query = `
  INSERT INTO questions (product_id, body, date_written, asker_name, asker_email, reported, helpful) 
  VALUES (${id}, '${body.body}', '${new Date().toUTCString()}', '${body.name}', '${body.email}', 0, 0);
  `;
  connection.query(query, (err, results) => {
    if (err) {
      console.log(err);
      cb(err, null);
    } else {
      cb(null, results);
    }
    console.timeEnd("Post Question");
  });
};

const postAnswer = (id, body, cb) => {
  console.time("Post Answer");
  console.log('id: ', id);
  console.log('body: ', body);
  const query = `
  INSERT INTO answers (answer_body, date, answerer_name, helpfulness, reported, question_id, email) 
  VALUES ('${body.body}', '${new Date().toUTCString()}', '${body.name}', 0, 0, ${id}, '${body.email}');
  `;
  connection.query(query, (err, results) => {
    if (err) {
      console.log(err);
      cb(err, null);
    } else {
      cb(null, results);
      console.timeEnd("Post Answer");
    }
  });
};

const updateHelpfulness = (id, cb) => {
  console.time("Update Helpful");
  const query = `UPDATE questions SET helpful = helpful + 1 WHERE q_id = ${id};`;
  connection.query(query, (err, results) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, results);
      console.timeEnd("Update Helpful");
    }
  });
};

const updateHelpfulAnswer = (id, cb) => {
  console.time("Answer Helpfulness");
  const query = `UPDATE answers SET helpfulness = helpfulness + 1 WHERE a_id = ${id};`;
  connection.query(query, (err, results) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, results);
      console.timeEnd("Answer Helpfulness");
    }
  });
};

const updateQuestionReported = (id, cb) => {
  console.time("Reported Question");
  const query = `UPDATE questions SET reported = reported + 1 WHERE q_id = ${id};`;
  connection.query(query, (err, results) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, results);
      console.timeEnd("Reported Question");
    }
  });
};

module.exports = { 
  getQuestionsByProduct, 
  getAllProducts, 
  postQuestion, 
  postAnswer,
  updateHelpfulness,
  updateHelpfulAnswer,
  updateQuestionReported
};
