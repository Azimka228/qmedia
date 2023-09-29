import styles from "./QuestionsList.module.scss"

import React, {FC} from "react"

interface IQuestionsList {
  title: string
  answers: string[]
}

interface IQuestionsListProps {
  data: IQuestionsList[]
  onSubmit: () => void
}

export const QuestionsList: FC<IQuestionsListProps> = ({data, onSubmit}) => {
  console.log(data)
  return (
    <div className={styles.main}>
      <div className={styles.btns}>
        <button type="button" onClick={onSubmit}>
          Узнать результат
        </button>
      </div>
    </div>
  )
}
