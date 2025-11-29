export interface Question {
  id: number
  title: string
  answers: string[]
}

export interface AnsweredQuestion {
  id: number
  title: string
  answer: string | null
}
