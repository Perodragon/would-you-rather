import { RECEIVE_USERS } from '../Actions/users'
import { 
  ANSWER_QUESTION, 
  NEW_QUESTION 
} from '../Actions/questions'

export default function users (state = {}, action) {
  switch(action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users,
      }
    case ANSWER_QUESTION:
      return {
        ...state,
        [action.userId]: {
          ...state[action.userId],
          answers: {
            ...state[action.userId].answers,
            [action.qid]: action.answer
          }
        }
      }      
    case NEW_QUESTION:
      return {
        ...state,
        [action.question.author]: {
          ...state[action.question.author],
          questions: state[action.question.author].questions.concat([action.question]),
        },
      }
    default:
      return state
  }
}