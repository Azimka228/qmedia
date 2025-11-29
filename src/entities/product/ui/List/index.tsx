import styles from "./ProductList.module.scss"

import React, {useCallback, useMemo, useState} from "react"

import {ProductListItem} from "./Item"
import data from "./products.json"

import {usePagination} from "@shared/hooks"
import {Pagination} from "@shared/ui"

const PAGE_SIZE = 10
const SIBLING_COUNT = 1
const normalizeImagePath = (image: string) => image.replace(/^\.\//, "/")

export const ProductList = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [favouriteItems, setFavouriteItems] = useState<number[]>([])
  const paginationRang = usePagination({
    currentPage,
    totalCount: data.length,
    siblingCount: SIBLING_COUNT,
    pageSize: PAGE_SIZE,
  })

  const handleChangePage = useCallback((value: number) => setCurrentPage(value), [])

  const lastIndex = currentPage * PAGE_SIZE
  const firstIndex = lastIndex - PAGE_SIZE

  const pagedItems = useMemo(
    () => data.slice(firstIndex, lastIndex),
    [firstIndex, lastIndex]
  )

  const toggleFavouriteItem = useCallback((id: number) => {
    setFavouriteItems(prevState =>
      prevState.includes(id)
        ? prevState.filter(item => item !== id)
        : [...prevState, id]
    )
  }, [])

  const mappedItems = pagedItems.map(item => {
    const isFavouriteItem = favouriteItems.includes(item.id)
    const handleFavouriteClick = () => toggleFavouriteItem(item.id)

    return (
      <ProductListItem
        price={item.price}
        title={item.title}
        image={normalizeImagePath(item.image)}
        key={item.id}
        isFavourite={isFavouriteItem}
        oldPrice={item.oldPrice}
        onClickFavourite={handleFavouriteClick}
      />
    )
  })

  return (
    <div className={styles.main}>
      <div className={styles.content}>{mappedItems}</div>
      <Pagination
        currentPage={currentPage}
        data={paginationRang}
        onChange={handleChangePage}
      />
    </div>
  )
}
