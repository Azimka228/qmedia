import styles from "./Container.module.scss"

import React, {FC, ReactNode} from "react"

import cn from "classnames"

interface IContainerProps {
  children: ReactNode
  className?: string
}

export const Container: FC<IContainerProps> = ({className, children}) => (
  <div className={cn(className, styles.main)}>{children}</div>
)
