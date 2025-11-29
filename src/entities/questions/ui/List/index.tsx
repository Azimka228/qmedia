import styles from "./QuestionsList.module.scss"

import React, {FC, useEffect, useState} from "react"

import cn from "classnames"

import {QuestionAnswerOption, QuestionAnswerState} from "../../model/types"

import {CircleStages} from "@shared/ui"
import {RadioSelect} from "@shared/ui/RadioSelect"

interface IQuestionsListProps {
  data: QuestionAnswerOption[]
  onSubmit: () => void
}

const getInitialAnswers = (data: QuestionAnswerOption[]): QuestionAnswerState[] =>
  data.map(el => ({id: el.id, title: el.title, answer: null}))

export const QuestionsList: FC<IQuestionsListProps> = ({data, onSubmit}) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [answers, setAnswers] = useState<QuestionAnswerState[]>(() =>
    getInitialAnswers(data)
  )
  const [error, setError] = useState(false)

  useEffect(() => {
    setAnswers(getInitialAnswers(data))
    setSelectedIndex(0)
    setError(false)
  }, [data])

  const currentQuestion = data[selectedIndex]
  const currentAnswer = answers[selectedIndex]?.answer ?? null

  const handleSetAnswer = (value: string) => {
    setAnswers(prevState =>
      prevState.map((answer, index) =>
        index === selectedIndex ? {...answer, answer: value} : answer
      )
    )
  }

  const ensureAnswerSelected = () => {
    const isValid = currentAnswer !== null
    setError(!isValid)
    return isValid
  }

  const handleSetNextIndex = () => {
    if (!ensureAnswerSelected()) return

    setSelectedIndex(prevState => Math.min(prevState + 1, data.length - 1))
  }

  const handleSetPrevIndex = () => {
    setError(false)
    setSelectedIndex(prevState => Math.max(prevState - 1, 0))
  }

  const handleSubmit = () => {
    if (!ensureAnswerSelected()) return

    onSubmit()
  }

  const radioSelectDefaultValue = currentAnswer ?? ""

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
