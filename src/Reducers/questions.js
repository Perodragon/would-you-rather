import { 
  RECEIVE_QUESTIONS, 
  ANSWER_QUESTION, 
  NEW_QUESTION 
} from '../Actions/questions'

export default function questions (state = {}, action) {
  switch(action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      }  
    case ANSWER_QUESTION:
      return {
          ...state,
          [action.qid]: {
              ...state[action.qid],
              [action.answer]: {
                  ...state[action.qid][action.answer],
                  votes: [
                      ...state[action.qid][action.answer].votes.concat([action.userId])
                  ]
              }
          }
      }
    case NEW_QUESTION:
      return {
        ...state,
        [action.question.id]: action.question,
      }
    default:
      return state
  }
}