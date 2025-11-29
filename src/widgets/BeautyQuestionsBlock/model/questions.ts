import {QuestionAnswerOption} from "@entities/questions"

export const beautyQuestions: QuestionAnswerOption[] = [
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
