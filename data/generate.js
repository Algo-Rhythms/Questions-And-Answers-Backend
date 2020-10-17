const faker = reqiure('faker');
const fs = require('fs');

// generate products
const writeUsers = fs.createWriteStream('products.csv');
writeUsers.write('id, product_name', 'utf8');
// generate questions
// generate answers
// generate photos

// start with 100,000 products

// generate 1 million questions with random product-id between 1 - 100,000

// generate 1 million answers with random question-id 1 - 1,000,000

// generate 1 million answers-photos with random answer-id 1 - 1,000,000


