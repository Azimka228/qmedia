import styles from "./ProductList.module.scss"

import React, {useState} from "react"

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

  const handleChangePage = (value: number) => setCurrentPage(value)

  const lastIndex = currentPage * PAGE_SIZE
  const firstIndex = lastIndex - PAGE_SIZE

  const mappedItems = data.map((el, index) => {
    if (index >= firstIndex && index < lastIndex) {
      const isFavouriteItem = favouriteItems.includes(el.id)

      const handleAddFavouriteItem = () => {
        if (!favouriteItems.includes(el.id)) {
          setFavouriteItems(prevState => [...prevState, el.id])
        }
        if (favouriteItems.includes(el.id)) {
          setFavouriteItems(prevState =>
            prevState.filter(item => item !== el.id)
          )
        }
      }
      return (
        <ProductListItem
          price={el.price}
          title={el.title}
          image={el.image}
          key={el.id}
          isFavourite={isFavouriteItem}
          oldPrice={el.oldPrice}
          onClickFavourite={handleAddFavouriteItem}
        />
      )
    }
    return null
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
