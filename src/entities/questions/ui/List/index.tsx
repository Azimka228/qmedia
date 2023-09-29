import styles from "./QuestionsList.module.scss"

import React, {FC, useEffect, useState} from "react"

import cn from "classnames"

import {CircleStages} from "@shared/ui"
import {RadioSelect} from "@shared/ui/RadioSelect"

interface IQuestionList {
  id: number
  title: string
  answers: string[]
}

interface IAnswerList {
  id: number
  title: string
  answer: string | null
}

interface IQuestionsListProps {
  data: IQuestionList[]
  onSubmit: () => void
}

export const QuestionsList: FC<IQuestionsListProps> = ({data, onSubmit}) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [answers, setAnswers] = useState<IAnswerList[]>()
  const [error, setError] = useState(false)

  useEffect(() => {
    setAnswers(data.map(el => ({id: el.id, title: el.title, answer: null})))
  }, [data])

  const handleSetNextIndex = () => {
    if (answers && answers[selectedIndex].answer !== null) {
      setSelectedIndex(prevState => prevState + 1)
      setError(false)
    } else {
      setError(true)
    }
  }
  const handleSetPrevIndex = () => {
    if (selectedIndex > 0) {
      setError(false)
      setSelectedIndex(prevState => prevState - 1)
    }
  }

  const handleSetAnswer = (value: string) => {
    if (answers) {
      const newArray: IAnswerList[] = [...answers]
      newArray[selectedIndex].answer = value
      setAnswers(newArray)
    }
  }

  const handleSubmit = () => {
    if (answers && answers[selectedIndex].answer !== null) {
      onSubmit()
      setError(false)
    } else {
      setError(true)
    }
  }

  const radioSelectDefaultValue =
    (answers && answers[selectedIndex]?.answer) ?? ""

  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <CircleStages countItems={data.length} selectedItem={selectedIndex} />
        <span className={styles.title}>{data[selectedIndex].title}</span>
        <div className={styles.radioSelect}>
          <RadioSelect
            data={data[selectedIndex].answers}
            defaultValue={radioSelectDefaultValue}
            onChange={handleSetAnswer}
          />
        </div>
      </div>
      <span className={cn(styles.error, {[styles.hide]: !error})}>
        Выберите хотя один из вариантов ответа
      </span>
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
            onClick={handleSubmit}
            className={styles.nextStepButton}
          >
            Узнать результат
          </button>
        )}
      </div>
    </div>
  )
}
