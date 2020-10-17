const faker = require('faker');
const fs = require('fs');

// generate photos
const writeAnswers = fs.createWriteStream('photos.csv');
writeAnswers.write('id, body, date, answerer_name, helpfulness, email, question_id, reported\n', 'utf8');

// generate 10,000,000 answers
const generateAnswers = (writer, encoding, cb) => {
  let i = 10000000;
  let id = 0;
  function write() {
    let ok = true;
    do {
      id += 1;
      i -= 1;
      const question_id = Math.floor(Math.random() * 10000000) + 1;
      const body = faker.random.word() + ' ' + faker.random.word() + ' ' + faker.random.word() + ' ' + faker.random.word() + ' ' + faker.random.word() + ' ' + faker.random.word() + ' ' + faker.random.word()+ ' ' + faker.random.word();
      const date = faker.date.recent();
      const answerer_name = faker.random.word();
      const helpfulness = getRandomInt(30);
      const email = faker.random.word() + faker.random.word() + '@email.com';
      const reported = getRandomInt(4);
      const data = `${id},${body},${date},${answerer_name},${helpfulness},${email},${question_id},${reported}\n`;
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
