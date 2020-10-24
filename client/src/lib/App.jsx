/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import React from 'react';
import axios from 'axios';
import query from './routes';
import Container from 'react-bootstrap/Container';
import QuestionList from '../components/QuestionList.jsx';
import SearchBar from '../components/SearchBar.jsx';
import SubmitButton from '../components/SubmitButton.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      qList: [],
      searchInput: '',
      productName: '',
      // getId: Math.floor(Math.random() * 100),
      getId: 99,
      // 8, 32, 20, 1300
    };
    this.isHelpfulQ = this.isHelpfulQ.bind(this);
    this.isHelpfulA = this.isHelpfulA.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.productName = this.productName.bind(this);
    this.getProductQs = this.getProductQs.bind(this);
  }
  componentDidMount() {
    this.getProductQs();
    this.productName();
  };

  getProductQs() {
    const getId = this.state.getId;
    query.reqProductQs(getId, (err, data) => {
      if (err) {
        throw err;
      } else {
        this.setState({qList: data.data.results});
      }
    });
  }

  productName() {
    const getId = this.state.getId;
    axios.get(`http://52.26.193.201:3000/products/${getId}`)
        .then((res) => {
          this.setState({productName: res.data.name});
        })
        .catch((err) => console.error(err));
  }

  isHelpfulQ(questID) {
    axios.put(`http://52.26.193.201:3000/qa/question/${questID}/helpful`)
        .then((res) => {
          console.log(res);
          this.setState();
        })
        .catch((err) => console.error(err));
  }

  isHelpfulA(answerID) {
    axios.put(`http://52.26.193.201:3000/qa/answer/${answerID}/helpful`)
        .then((res) => {
          this.setState({});
        })
        .catch((err) => console.error(err));
  }

  handleSearchChange(e) {
    this.setState({searchInput: e.target.value.toLowerCase()});
  }

  render() {
    const {qList, searchInput, productName, getId} = this.state;
    let filteredQuestions;
    searchInput.length >= 3 ?
       filteredQuestions = qList.filter((q) => q.question_body.toLowerCase().includes(searchInput.toLowerCase())) : filteredQuestions = qList;
    return (
      <div>
        <Container className="qa-container">
          <br></br>
          <div className="q-a-jumbotron">
            <h1 className="q-a-h1">Questions and Answers / Queries</h1>
            <br></br>
            <SearchBar
              searchInput={searchInput}
              handleSearchChange={this.handleSearchChange}
            />
            <div>
            </div>
            <br></br>
            {qList.length ? <QuestionList
              qList={filteredQuestions}
              isHelpfulQ={this.isHelpfulQ}
              isHelpfulA={this.isHelpfulA}
              getProductQs={this.getProductQs}
              productName={productName}
              getId={getId}
            /> : ''}
            <br></br>
            <SubmitButton className="addq-btn-solo"
              productName={productName}
              getId={getId}
              getProductQs={this.getProductQs}
            />
          </div>
        </Container>
        <br></br><br></br>
      </div>
    );
  };
};

export default App;
