import styles from "./QuestionsList.module.scss"

import React, {FC, useEffect, useMemo, useState} from "react"

import cn from "classnames"

import {CircleStages} from "@shared/ui"
import {RadioSelect} from "@shared/ui/RadioSelect"

import {AnsweredQuestion, Question} from "../../types"

interface IQuestionsListProps {
  data: Question[]
  onSubmit: () => void
}

export const QuestionsList: FC<IQuestionsListProps> = ({data, onSubmit}) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [answers, setAnswers] = useState<AnsweredQuestion[]>([])
  const [error, setError] = useState(false)

  const initialAnswers = useMemo<AnsweredQuestion[]>(
    () => data.map(({id, title}) => ({id, title, answer: null})),
    [data]
  )

  useEffect(() => {
    setAnswers(initialAnswers)
    setSelectedIndex(0)
    setError(false)
  }, [initialAnswers])

  const handleSetNextIndex = () => {
    const hasAnswer = answers[selectedIndex]?.answer !== null

    if (!hasAnswer) {
      setError(true)
      return
    }

    setSelectedIndex(prevState => Math.min(prevState + 1, data.length - 1))
    setError(false)
  }
  const handleSetPrevIndex = () => {
    if (selectedIndex > 0) {
      setError(false)
      setSelectedIndex(prevState => prevState - 1)
    }
  }

  const handleSetAnswer = (value: string) => {
    setAnswers(prevState =>
      prevState.map((answer, index) =>
        index === selectedIndex ? {...answer, answer: value} : answer
      )
    )
    setError(false)
  }

  const handleSubmit = () => {
    const hasAnswer = answers[selectedIndex]?.answer !== null

    if (!hasAnswer) {
      setError(true)
      return
    }

    onSubmit()
    setError(false)
  }

  const currentQuestion = data[selectedIndex]
  const radioSelectDefaultValue = answers[selectedIndex]?.answer ?? ""

  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <CircleStages countItems={data.length} selectedItem={selectedIndex} />
        <span className={styles.title}>{currentQuestion.title}</span>
        <div className={styles.radioSelect}>
          <RadioSelect
            data={currentQuestion.answers}
            defaultValue={radioSelectDefaultValue}
            onChange={handleSetAnswer}
          />
        </div>
      </div>
      <span className={cn(styles.error, {[styles.hide]: !error})}>
        Выберите хотя бы один из вариантов ответа
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
