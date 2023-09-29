import styles from "./QuestionsList.module.scss"

import React, {FC, useState} from "react"

import {CircleStages} from "@shared/ui"
import {RadioSelect} from "@shared/ui/RadioSelect"

interface IQuestionsList {
  id: number
  title: string
  answers: string[]
}

interface IQuestionsListProps {
  data: IQuestionsList[]
  onSubmit: () => void
}

export const QuestionsList: FC<IQuestionsListProps> = ({data, onSubmit}) => {
  const [selectedIndex, setSelectedIndex] = useState(0)

  const handleSetNextIndex = () => {
    setSelectedIndex(prevState => prevState + 1)
  }
  const handleSetPrevIndex = () => {
    if (selectedIndex > 0) setSelectedIndex(prevState => prevState - 1)
  }

  return (
    <div className={styles.main}>
      <CircleStages countItems={data.length} selectedItem={selectedIndex} />
      <span className={styles.title}>{data[selectedIndex].title}</span>
      <div className={styles.radioSelect}>
        <RadioSelect data={data[selectedIndex].answers} />
      </div>

      <div className={styles.btns}>
        <button
          type="button"
          onClick={handleSetPrevIndex}
          className={styles.prevButton}
        >
          Назад
        </button>
        {selectedIndex !== data.length - 1 ? (
          <button
            type="button"
            onClick={handleSetNextIndex}
            className={styles.nextStepButton}
          >
            Дальше
          </button>
        ) : (
          <button
            type="button"
            onClick={onSubmit}
            className={styles.nextStepButton}
          >
            Узнать результат
          </button>
        )}
      </div>
    </div>
  )
}
