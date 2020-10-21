const faker = require('faker');
const fs = require('fs');

// generate photos
const writeAnswers = fs.createWriteStream('answers.csv');
writeAnswers.write('answer_body, date, answerer_name, helpfulness, email, question_id, reported\n', 'utf8');

// generate 10,000,000 answers
const generateAnswers = (writer, encoding, cb) => {
  let i = 1000000;
  function write() {
    let ok = true;
    do {
      i -= 1;
      const question_id = Math.floor(Math.random() * 1000000) + 1;
      const body= '"' + faker.lorem.paragraph() + '."';
      const date = JSON.stringify(faker.date.between('2019-01-01', '2020-09-01?'));
      const answerer_name = '"' + faker.random.word() + '"';
      const email = '"' + faker.random.word() + faker.random.word() + '@email.com"';
      const reported = Math.floor(Math.random() * Math.floor(4));
      const helpfulness = Math.floor(Math.random() * Math.floor(30));
      const data = `${body},${date},${answerer_name},${helpfulness},${email},${question_id},${reported}\n`;
      if (i === 0) {
        writer.write(data, encoding, cb);
      } else {
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  };

  write();
};

// invoke with a callback telling the write to end
generateAnswers(writeAnswers, 'utf-8', () => {
  writeAnswers.end();
});
