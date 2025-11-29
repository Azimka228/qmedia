"use client"

import React, {useMemo, useState} from "react"

import {ProductList} from "@entities/product"
import {
  Question,
  QuestionsList,
  QuestionsListWrapper,
} from "@entities/questions"

const QUESTIONS_LIST_DATA: Question[] = [
  {
    id: 1,
    title: "Сколько вам лет?",
    answers: [
      "Нужны средства для ребёнка младше 10 лет",
      "Мне меньше 25 лет",
      "От 25 до 35 лет",
      "От 35 до 45 лет",
      "Мне больше 45 лет",
    ],
  },
  {
    id: 2,
    title: "Какой у вас тип кожи?",
    answers: ["Сухая", "Нормальная", "Комбинированная", "Жирная"],
  },
  {
    id: 3,
    title: "Беспокоят ли воспаления на лице?",
    answers: ["Да", "Нет", "Иногда"],
  },
]

export const BeautyQuestionsBlock = () => {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const {title, description} = useMemo(() => {
    if (isSubmitted) {
      return {
        title: "Результат",
        description: "Мы подобрали для вас наиболее подходящие средства",
      }
    }

    return {
      title: "Онлайн-подбор средств для лица",
      description:
        "Пройдите короткий тест и получите список наиболее подходящих для вас косметических продуктов",
    }
  }, [isSubmitted])

  const handleSubmit = () => {
    setIsSubmitted(true)
  }

  const content = isSubmitted ? (
    <ProductList />
  ) : (
    <QuestionsList data={QUESTIONS_LIST_DATA} onSubmit={handleSubmit} />
  )

  return (
    <QuestionsListWrapper title={title} description={description}>
      {content}
    </QuestionsListWrapper>
  )
}
