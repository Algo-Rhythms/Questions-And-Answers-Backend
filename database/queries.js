const  { connection } = require('./db.js');

const seed = () => {
  // seed method 
};


const getOne = () => {
  connection.connect();
  console.time("total");

  connection.query("SELECT * FROM questions WHERE id = $1", [1], (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log(res);
    }
    connection.end();
  });

  console.timeEnd("total");
};

module.exports = { getOne }