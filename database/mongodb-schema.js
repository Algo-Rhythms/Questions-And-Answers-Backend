const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/questions-and-answers');

let productSchema = mongoose.Schema({
  product_id: Number,
  product_name: String
});

let Product = mongoose.model('Product', productSchema);

let questionSchema = mongoose.Schema({
  question_id: Number,
  question_body: String,
  question_date: Date,
  asker_name: String,
  question_helpfulness: Number,
  reported: Number,
  answers: [],
});

let Questions = mongoose.model('Questions', questionSchema);

let answerSchema = mongoose.Schema({
  question_id: Number,
  answer_id: Number,
  body: String,
  date: Date,
  answerer_name: String,
  helpfulness: Number,
  photos: [],
});

let Answers = mongoose.model('Answers', answerSchema);

let photosSchema = mongoose.Schema({
  photo_id: Number,
  photo_url: String,
});

let Photos = mongoose.model('Photos', photosSchema);

const getProduct = (id) => {
  return Product.find({ product_id: id })
    .then((data) => { return data })
    .catch((err) => console.log(err));
};

const getQuestions = (id) => {
  getProduct(id)
    .then((data) => {return data})
    .catch((err) => console.log(err));
}

module.exports = {
  getProduct, getQuestions
}