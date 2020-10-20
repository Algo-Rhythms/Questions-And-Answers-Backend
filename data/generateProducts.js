const faker = require('faker');
const fs = require('fs');

// generate products
const writeProducts = fs.createWriteStream('products.csv');
writeProducts.write('product_name\n', 'utf8');

// start with 100,000 products
const generateProducts = (writer, encoding, cb) => {
  let i = 100000;
  let id = 0;
  function write() {
    let ok = true;
    do {
      id += 1;
      i -= 1;
      const product_name = '"' + faker.random.word() + ' ' + faker.random.word() + '"';
      const data = `${product_name}\n`;
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
generateProducts(writeProducts, 'utf-8', () => {
  writeProducts.end();
});

