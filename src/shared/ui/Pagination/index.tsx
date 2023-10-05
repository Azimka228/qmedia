import styles from "./Pagination.module.scss"

import React, {FC} from "react"

import cn from "classnames"

interface IPaginationProps {
  currentPage: number
  data: (string | number)[]
  onChange?: (value: number) => void
}

export const Pagination: FC<IPaginationProps> = React.memo(
  ({data, currentPage, onChange}) => {
    const mappedItems = data.map((el, index) => {
      const handleChangePage = () => {
        if (el !== "..." && onChange) {
          onChange(el as number)
        }
      }

      const itemClasses = cn(styles.item, {
        [styles.active]: el === currentPage,
        [styles.dots]: el === "...",
      })
      return (
        <div key={index} onClick={handleChangePage} className={itemClasses}>
          {el}
        </div>
      )
    })

    return <div className={styles.main}>{mappedItems}</div>
  }
)

Pagination.displayName = "Pagination"
