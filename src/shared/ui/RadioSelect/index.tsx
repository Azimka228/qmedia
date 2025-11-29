"use client"

import styles from "./RadioSelect.module.scss"

import React, {FC, useEffect, useState} from "react"

import cn from "classnames"

interface IRadioSelect {
  data: string[]
  defaultValue?: string
  onChange?: (value: string) => void
}

export const RadioSelect: FC<IRadioSelect> = ({
  data,
  defaultValue,
  onChange,
}) => {
  const [selectedValue, setSelectedValue] = useState<string>(
    defaultValue ?? ""
  )

  useEffect(() => {
    setSelectedValue(defaultValue ?? "")
  }, [defaultValue])

  const mappedItems = data.map(el => {
    const handleSetSelectedValue = () => {
      if (el === selectedValue) return

      setSelectedValue(el)
      if (onChange) {
        onChange(el)
      }
    }

    return (
      <div
        key={el}
        className={cn(styles.item, {[styles.active]: el === selectedValue})}
        onClick={handleSetSelectedValue}
      >
        <div className={styles.circle}>
          <div className={styles.smallCircle} />
        </div>
        <span className={styles.text}>{el}</span>
      </div>
    )
  })

  return <div className={styles.main}>{mappedItems}</div>
}
