import styles from "./CircleStages.module.scss"

import React, {FC} from "react"

import cn from "classnames"

interface ICircleStages {
  countItems: number
  selectedItem: number
}

export const CircleStages: FC<ICircleStages> = ({countItems, selectedItem}) => {
  const mappedItems = Array.from({length: countItems}, (_, index) => (
    <div
      key={index}
      className={cn(styles.circle, {[styles.active]: selectedItem === index})}
    />
  ))
  return (
    <div className={styles.main}>
      <div className={styles.items}>{mappedItems}</div>
      <span className={styles.title}>
        Вопрос {selectedItem + 1} из {countItems}
      </span>
    </div>
  )
}
