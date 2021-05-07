import { receiveQuestions, answerQuestion, newQuestion } from '../Actions/questions'
import { receiveUsers, updateUser } from '../Actions/users'
import { 
  _getUsers, 
  _getQuestions, 
  _saveQuestionAnswer,
  _saveQuestion
} from '../utils/_DATA'
import { showLoading, hideLoading } from 'react-redux-loading'

export function getUsers () {
  return (dispatch) => {
    dispatch(showLoading())
    _getUsers()
    .then(users => {
      dispatch(receiveUsers(users))
      dispatch(hideLoading())
    })
  }
}

export function getQuestions () {
  return (dispatch) => {
    _getQuestions()
    .then(questions =>
      dispatch(receiveQuestions(questions))
    )
  }
}

/* Reference : 
            React [handleChange] Function,
            Async/await Pattern
        Links :
        [https://www.geeksforgeeks.org/how-to-use-handlechange-function-in-react-component/]
        [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function] */

export function handleAnswerQuestion(qid, answer) {
  return async (dispatch, getState) => {
      const { authedUser } = getState()
      try {
          dispatch(showLoading())
          await _saveQuestionAnswer({
              authedUser: authedUser.id,
              qid: qid,
              answer
          })
          await dispatch(answerQuestion(qid, authedUser.id, answer))
          await dispatch(updateUser(authedUser.id, qid, answer))
          dispatch(hideLoading())
      }
      catch (error) {
        alert('There is an error, Please try again!')
      }
  }
}

export function handleSaveQuestion(optionOneText, optionTwoText) {
  return async (dispatch, getState) => {
      const { authedUser } = getState()
      try {
          const question = await _saveQuestion({
              optionOneText,
              optionTwoText,
              author: authedUser.id,
          })
          dispatch(newQuestion(question))
          dispatch(updateUser('questions', question.author, question.id))
      }
      catch (error) {
          alert('There is an error, Please try again!')
      }
  }
}