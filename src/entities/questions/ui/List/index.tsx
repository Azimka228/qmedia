import styles from "./QuestionsList.module.scss"

import React, {FC, useEffect, useMemo, useState} from "react"

import cn from "classnames"

import {CircleStages} from "@shared/ui"
import {RadioSelect} from "@shared/ui/RadioSelect"

export interface QuestionListItem {
  id: number
  title: string
  answers: string[]
}

interface AnswerItem {
  id: number
  title: string
  answer: string | null
}

interface QuestionsListProps {
  data: QuestionListItem[]
  onSubmit: () => void
}

const createEmptyAnswers = (questions: QuestionListItem[]): AnswerItem[] =>
  questions.map(question => ({
    id: question.id,
    title: question.title,
    answer: null,
  }))

export const QuestionsList: FC<QuestionsListProps> = ({data, onSubmit}) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [answers, setAnswers] = useState<AnswerItem[]>(
    createEmptyAnswers(data)
  )
  const [error, setError] = useState(false)

  useEffect(() => {
    setAnswers(createEmptyAnswers(data))
    setSelectedIndex(0)
  }, [data])

  const currentQuestion = useMemo(
    () => data[selectedIndex] ?? data[0],
    [data, selectedIndex]
  )
  const currentAnswer = answers[selectedIndex]?.answer ?? ""

  if (!currentQuestion) return null

  const validateCurrentAnswer = () => {
    const hasAnswer = currentAnswer !== ""
    setError(!hasAnswer)
    return hasAnswer
  }

  const handleSetNextIndex = () => {
    if (!validateCurrentAnswer()) return

    setSelectedIndex(prevState => Math.min(prevState + 1, data.length - 1))
  }

  const handleSetPrevIndex = () => {
    if (selectedIndex === 0) return

    setError(false)
    setSelectedIndex(prevState => prevState - 1)
  }

  const handleSetAnswer = (value: string) => {
    setAnswers(prevState =>
      prevState.map((answerItem, index) =>
        index === selectedIndex ? {...answerItem, answer: value} : answerItem
      )
    )
    setError(false)
  }

  const handleSubmit = () => {
    if (!validateCurrentAnswer()) return

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
            defaultValue={currentAnswer}
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
