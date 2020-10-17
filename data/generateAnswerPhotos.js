const faker = require('faker');
const fs = require('fs');

// generate photos
const writePhotos = fs.createWriteStream('photos.csv');
writePhotos.write('id, url, answer_id\n', 'utf8');

// generate 10,000,000 photo urls
const generateAnswerPhotos = (writer, encoding, cb) => {
  let i = 10000000;
  let id = 0;
  function write() {
    let ok = true;
    do {
      id += 1;
      i -= 1;
      const answer_id = Math.floor(Math.random() * 10000000) + 1;
      const url = 'https://www.' + faker.random.word() + faker.random.word() + '.com';
      const data = `${id},${url},${answer_id}\n`;
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
generateAnswerPhotos(writePhotos, 'utf-8', () => {
  writePhotos.end();
});
