const  { connection } = require('./db.js');

const seedQuestions = () => {
  connection.connect();
  console.time("Total");
  connection.query(`\COPY questions FROM '/Users/kylegraas/documents/work/questions-and-answers-kg/data/questions.csv'`, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log(res);
    }
    connection.end();
  });
  console.timeEnd("Total");
};

seedQuestions();


// const getOne = () => {
//   connection.connect();
//   console.time("total");

//   connection.query("SELECT * FROM questions WHERE id = $1", [1], (err, res) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(res);
//     }
//     connection.end();
//   });

//   console.timeEnd("total");
// };

module.exports = { } // getOne