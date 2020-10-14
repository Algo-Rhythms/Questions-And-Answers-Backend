-- All pathways routed using Express.js
-- Please build this project using the following scripts: 
        "npm run build" will start Webpack
        "npm start" will boot up the server

////////////////////////
///  CRUD API PATHS  ///
////////////////////////

* GET /qa/:product_id
  
  - This will return a list of all questions and all answers for a single product. The product is sorted by a product_id number.   
  
* GET /qa/:question_id/answers

  - Returns a particular set of answers that correspond to a single question.  The answers are sorted by a question_id number. Each answer has an answer_id. 

* POST /qa/:product_id

  - Posts a question about the currently selected product_id.

* POST /qa/:question_id/answers

  - Posts an answer to a question that is related to the currently selected product_id. 

* PUT /qa/question/:question_id/helpful
  
  - Adds a marker that allows the user to determine the helpfulness of a question. 

* PUT /qa/question/:question_id/report

  - Adds a marker that allows the user to report an obsolete or inappropriate question. 

* PUT /qa/answer/:answer_id/helpful

  - Adds a marker that allows the user to determine the helpfulness of an answer. 

* PUT /qa/answer/:answer_id/report

  - Adds a marker that allows the user to report an obsolete or inappropriate answer. 
