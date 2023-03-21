
export interface Error {
  status: number
  errorContent: any
  message: string
}

export interface PaginatorQueryData {
  offset: number
  limit: number
}

export interface ResultSetPage<T> {
  count: number
  limit: number
  nextOffset: number
  previousOffset: number
  results: T[]
}
