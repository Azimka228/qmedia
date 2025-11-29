import styles from "./ProductList.module.scss"

import React, {useCallback, useMemo, useState} from "react"

import {ProductListItem} from "./Item"
import data from "./products.json"

import {usePagination} from "@shared/hooks"
import {Pagination} from "@shared/ui"

const PAGE_SIZE = 10
const SIBLING_COUNT = 1

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

  const toggleFavouriteItem = useCallback((id: number) => {
    setFavouriteItems(prevState =>
      prevState.includes(id)
        ? prevState.filter(item => item !== id)
        : [...prevState, id]
    )
  }, [])

  const paginatedItems = useMemo(() => {
    const lastIndex = currentPage * PAGE_SIZE
    const firstIndex = lastIndex - PAGE_SIZE

    return data.slice(firstIndex, lastIndex).map(product => (
      <ProductListItem
        price={product.price}
        title={product.title}
        image={product.image}
        key={product.id}
        isFavourite={favouriteItems.includes(product.id)}
        oldPrice={product.oldPrice}
        onClickFavourite={() => toggleFavouriteItem(product.id)}
      />
    ))
  }, [currentPage, favouriteItems, toggleFavouriteItem])

  return (
    <div className={styles.main}>
      <div className={styles.content}>{paginatedItems}</div>
      <Pagination
        currentPage={currentPage}
        data={paginationRang}
        onChange={handleChangePage}
      />
    </div>
  )
}
