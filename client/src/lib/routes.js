import axios from 'axios';

// gets all Qs for one product
const reqProductQs = (id, cb) => {
  // const id = Math.floor(Math.random() * 1000);
  axios.get(`http://localhost:3001/qa/${id}`, {params: {count: 100}})
      .then((data) => cb(null, data))
      .catch((err) => cb(err, null));
};
// ::REFACTORED CODE FOR REFERENCE::
// getProductQs() {
// axios.get(`http://52.26.193.201:3000/qa/${id}`)
// .then((res) => {
//   this.setState({
//     qList: res.data.results,
//   }, () => console.log('getProductQs qList:', this.state.qList));
// })
// .catch((err) => console.error(err));
// }

// getAnswers(answerID) {
//   axios.get(`http://52.26.193.201:3000/qa/${answerID}/answers`)
//       .then((res) => {
//         this.setState(aList: []);
//       })
//       .catch((err) => console.error(err));
// }

// // mark a question as helpful
const reqIsHelpfulQ = (questID, cb) => {
  axios.put(`http://localhost:3001/qa/question/${questID}/helpful`)
      .then((data) => cb(null, data))
      .catch((err) => cb(err, null));
};
// isHelpfulQ(questID) {
//   axios.put(`http://52.26.193.201:3000/qa/question/${questID}/helpful`)
//       .then((res) => {
//         this.setState({});
//       })
//       .catch((err) => console.error(err));
//   console.log('questionID:', questID);
// }


const reqIsHelpfulA = (answerID, cb) => {
  axios.put(`http://localhost:3001/qa/answer/${answerID}/helpful`)
      .then((data) => cb(null, data))
      .catch((err) => cb(err, null));
};
// isHelpfulA(answerID) {
//   axios.put(`http://52.26.193.201:3000/qa/answer/${answerID}/helpful`)
//       .then((res) => {
//         this.setState({});
//       })
//       .catch((err) => console.error(err));
//   console.log('answerID:', answerID);
//   }

// add a question for one product
// const addOneQ = (cb, id) => {
//   axios.post(`http://52.26.193.201:3000/qa/${id}`)
//       .then((data) => cb(null, data))
//       .catch((err) => cb(err, null));
// };

// add an answer for one product
// const addOneA = (cb, id) => {
//   axios.post(`http://52.26.193.201:3000/qa/${id}/answers`)
//       .then((data) => cb(null, data))
//       .catch((err) => cb(err, null));
// };

// // mark an answer as helpful
// const aIsHelful = (cb) => {
//   axios.put(`http://52.26.193.201:3000/qa/answer/${id}/helpful`)
//   .then(data => cb(null, data))
//   .catch(err => cb(err, null))
// }

// // report an answer
// const reportAnswer = (id, cb) => {
//   let id = 5;
//   axios.put(`http://52.26.193.201:3000/qa/question/${id}/report`)
//   .then(data => cb(null, data))
//   .catch(err => cb(err, null))
// }

export default {reqProductQs, reqIsHelpfulQ, reqIsHelpfulA};
