import styles from "./Item.module.scss"

import React, {FC} from "react"

import Image from "next/image"

import {HeartIcon} from "./icons"

interface IProductListItemProps {
  title: string
  image: string
  price: number
  oldPrice: number | null
  isFavourite?: boolean
  onClickFavourite?: () => void
}

const areEqual = (
  prevProps: IProductListItemProps,
  nextProps: IProductListItemProps
) =>
  prevProps.isFavourite === nextProps.isFavourite &&
  prevProps.price === nextProps.price &&
  prevProps.oldPrice === nextProps.oldPrice &&
  prevProps.title === nextProps.title &&
  prevProps.image === nextProps.image

export const ProductListItem: FC<IProductListItemProps> = React.memo(
  ({title, image, price, oldPrice, isFavourite = false, onClickFavourite}) => {
    const imageSrc = image.startsWith("/") ? image : image.replace("./", "/")

    return (
      <div className={styles.main}>
        <div className={styles.imgWrapper}>
          <button
            type="button"
            className={styles.favourite}
            onClick={onClickFavourite}
          >
            <HeartIcon isActive={isFavourite} />
          </button>
          <Image
            src={imageSrc}
            alt={title}
            className={styles.img}
            width={240}
            height={240}
          />
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
  },
  areEqual
)

ProductListItem.displayName = "ProductListItem"
