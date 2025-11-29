export interface QuestionAnswerOption {
  id: number
  title: string
  answers: string[]
}

export interface QuestionAnswerState {
  id: number
  title: string
  answer: string | null
}
