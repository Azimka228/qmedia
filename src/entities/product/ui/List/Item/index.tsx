import styles from "./Item.module.scss"

import React, {FC} from "react"

import {HeartIcon} from "@entities/product/ui/List/Item/icons"

interface IProductListItemProps {
  title: string
  image: string
  price: number
  oldPrice: number | null
  isFavourite?: boolean
  onClickFavourite?: () => void
}

export const ProductListItem: FC<IProductListItemProps> = ({
  title,
  image,
  price,
  oldPrice,
  isFavourite = false,
  onClickFavourite,
}) => (
  <div className={styles.main}>
    <div className={styles.imgWrapper}>
      <div className={styles.favourite} onClick={onClickFavourite}>
        <HeartIcon isActive={isFavourite} />
      </div>

      <img src={image} alt="" className={styles.img} />
    </div>
    <div className={styles.description}>
      <span className={styles.title}>{title}</span>
      <div className={styles.priceBlock}>
        {oldPrice && <span className={styles.oldPrice}>{oldPrice}</span>}
        <span className={styles.price}>
          {price} <span className={styles.wallet}> руб.</span>
        </span>
      </div>
    </div>
  </div>
)