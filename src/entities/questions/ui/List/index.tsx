import styles from "./QuestionsList.module.scss"

import React, {FC, useEffect, useMemo, useState} from "react"

import cn from "classnames"

import {type AnswerState, type Question} from "../../model/types"

import {CircleStages} from "@shared/ui"
import {RadioSelect} from "@shared/ui/RadioSelect"

interface IQuestionsListProps {
  data: Question[]
  onSubmit: () => void
}

export const QuestionsList: FC<IQuestionsListProps> = ({data, onSubmit}) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [answers, setAnswers] = useState<AnswerState[]>(() =>
    data.map(question => ({
      id: question.id,
      title: question.title,
      answer: null,
    }))
  )
  const [error, setError] = useState(false)

  useEffect(() => {
    setSelectedIndex(0)
    setError(false)
    setAnswers(
      data.map(question => ({
        id: question.id,
        title: question.title,
        answer: null,
      }))
    )
  }, [data])

  const currentQuestion = data[selectedIndex]
  const currentAnswer = answers[selectedIndex]
  const isLastStep = selectedIndex === data.length - 1
  const hasAnswer = currentAnswer?.answer !== null

  const radioSelectDefaultValue = useMemo(
    () => currentAnswer?.answer ?? "",
    [currentAnswer?.answer]
  )

  if (!currentQuestion) {
    return null
  }

  const handleSetNextIndex = () => {
    if (!hasAnswer) {
      setError(true)
      return
    }

    setError(false)
    setSelectedIndex(prevState => Math.min(prevState + 1, data.length - 1))
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
    if (!hasAnswer) {
      setError(true)
      return
    }

    setError(false)
    onSubmit()
  }

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
        {!isLastStep ? (
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
