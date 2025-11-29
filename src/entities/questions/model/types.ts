export interface Question {
  id: number
  title: string
  answers: string[]
}

export interface AnswerState {
  id: number
  title: string
  answer: string | null
}
