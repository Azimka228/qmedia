import styles from "./Wrapper.module.scss"

import React, {FC, ReactNode} from "react"

interface IQuestionsListWrapperProps {
  title: ReactNode
  description: ReactNode
  children: ReactNode
}

export const QuestionsListWrapper: FC<IQuestionsListWrapperProps> = ({
  title,
  description,
  children,
}) => (
  <div className={styles.main}>
    <span className={styles.title}>{title}</span>
    <span className={styles.description}>{description}</span>
    <div>{children}</div>
  </div>
)
