export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ANSWER_QUESTION = 'ANSWER_QUESTION'
export const NEW_QUESTION = 'NEW_QUESTION'

export function receiveQuestions (questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  }
} 

export function answerQuestion(qid, userId, answer) {
  return {
      type: ANSWER_QUESTION,
      qid,
      answer,
      userId
  }
}

export function newQuestion (question) {
  return {
    type: NEW_QUESTION,
    question,
  }
}