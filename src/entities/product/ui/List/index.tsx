import styles from "./ProductList.module.scss"

import React, {useCallback, useState} from "react"

import {ProductListItem} from "./Item"
import data from "./products.json"

import {usePagination} from "@shared/hooks"
import {Pagination} from "@shared/ui"

const PAGE_SIZE = 10
const SIBLING_COUNT = 1

export const ProductList = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [favouriteItems, setFavouriteItems] = useState<number[]>([])
  const paginationRange = usePagination({
    currentPage,
    totalCount: data.length,
    siblingCount: SIBLING_COUNT,
    pageSize: PAGE_SIZE,
  })

  const handleChangePage = useCallback(
    (value: number) => setCurrentPage(value),
    []
  )

  const lastIndex = currentPage * PAGE_SIZE
  const firstIndex = lastIndex - PAGE_SIZE

  const currentItems = data.slice(firstIndex, lastIndex)

  const mappedItems = currentItems.map(product => {
    const isFavouriteItem = favouriteItems.includes(product.id)

    const handleToggleFavourite = () =>
      setFavouriteItems(prevState =>
        prevState.includes(product.id)
          ? prevState.filter(id => id !== product.id)
          : [...prevState, product.id]
      )

    return (
      <ProductListItem
        key={product.id}
        price={product.price}
        title={product.title}
        image={product.image}
        isFavourite={isFavouriteItem}
        oldPrice={product.oldPrice}
        onClickFavourite={handleToggleFavourite}
      />
    )
  })

  return (
    <div className={styles.main}>
      <div className={styles.content}>{mappedItems}</div>
      <Pagination
        currentPage={currentPage}
        data={paginationRange}
        onChange={handleChangePage}
      />
    </div>
  )
}
