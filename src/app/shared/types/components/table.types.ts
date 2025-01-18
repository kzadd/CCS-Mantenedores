import { Colors } from '../palette.types'

export interface TableAction<T> {
  color?: Colors
  icon?: string
  label: string
  onAction: (row: T) => void
}

export interface TableColumn<T> {
  sortable?: boolean
  key: TableDataKey<T>
  label: string
  width?: string
}

export type TableData<T> = {
  [Property in keyof T]: T[Property]
}

export type TableDataKey<T> = Extract<keyof T, string>
export type TableDataValue<T> = TableData<T>[TableDataKey<T>]
export type TableOrder = 'asc' | 'desc' | 'none'
