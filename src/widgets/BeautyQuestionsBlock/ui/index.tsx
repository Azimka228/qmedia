"use client"

import React, {useState} from "react"

import {ProductList} from "@entities/product"
import {QuestionsList, QuestionsListWrapper} from "@entities/questions"

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
    <QuestionsList data={[]} onSubmit={handleSubmit} />
  )

  return (
    <QuestionsListWrapper title={title} description={description}>
      {content}
    </QuestionsListWrapper>
  )
}
