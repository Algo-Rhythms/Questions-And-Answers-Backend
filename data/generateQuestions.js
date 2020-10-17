const faker = require('faker');
const fs = require('fs');

// generate questions
const writeQuestions = fs.createWriteStream('questions.csv');
writeQuestions.write('id, product_id, body, date_written, asker_name, asker_email, reported, helpful\n', 'utf8');

// start with 100,000 products
const generateQuestions = (writer, encoding, cb) => {
  let i = 10000000;
  let id = 0;
  function write() {
    let ok = true;
    do {
      id += 1;
      i -= 1;
      const product_id = Math.floor(Math.random() * 100000) + 1;;
      const body= '"' + faker.lorem.paragraph() + '?"';
      const date_written = faker.date.recent();
      const asker_name = '"' + faker.random.word() + '"';
      const asker_email = '"' + faker.random.word() + faker.random.word() + '@email.com"';
      const reported = Math.floor(Math.random() * Math.floor(4));
      const helpful = Math.floor(Math.random() * Math.floor(30));
      const data = `${id},${product_id},${body},${date_written},${asker_name},${asker_email},${reported},${helpful}\n`;
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
generateQuestions(writeQuestions, 'utf-8', () => {
  writeQuestions.end();
});


