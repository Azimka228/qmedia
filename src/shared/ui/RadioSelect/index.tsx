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
  const [selectedValue, setSelectedValue] = useState<string>(defaultValue ?? "")

  useEffect(() => {
    setSelectedValue(defaultValue ?? "")
  }, [defaultValue])

  const mappedItems = data.map(value => {
    const handleSetSelectedValue = () => {
      if (value === selectedValue) {
        return
      }

      setSelectedValue(value)
      if (onChange) {
        onChange(value)
      }
    }

    return (
      <div
        key={value}
        className={cn(styles.item, {[styles.active]: value === selectedValue})}
        onClick={handleSetSelectedValue}
      >
        <div className={styles.circle}>
          <div className={styles.smallCircle} />
        </div>
        <span className={styles.text}>{value}</span>
      </div>
    )
  })

  return <div className={styles.main}>{mappedItems}</div>
}
