"use client"

import React, {useState} from "react"

import {ProductList} from "@entities/product"
import {QuestionsList, QuestionsListWrapper} from "@entities/questions"

const QuestionsListData = [
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

  const handleSubmit = () => {
    setIsSubmitted(true)
  }

  const title = isSubmitted ? "Результат" : "Онлайн-подбор средств для лица"
  const description = isSubmitted
    ? "Мы подобрали для вас наиболее подходящие средства"
    : "Пройдите короткий тест и получите список наиболее подходящих для вас косметических продуктов"

  const content = isSubmitted ? (
    <ProductList />
  ) : (
    <QuestionsList data={QuestionsListData} onSubmit={handleSubmit} />
  )

  return (
    <QuestionsListWrapper title={title} description={description}>
      {content}
    </QuestionsListWrapper>
  )
}
