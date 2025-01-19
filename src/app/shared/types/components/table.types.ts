import { Color } from '../palette.types'

export interface TableAction<T> {
  color?: Color
  icon?: string
  label: string
  onAction: (data: T) => void
}

export interface TableColumn<T> {
  key: TableDataKey<T>
  label: string
  width?: string
}

export type TableData<T> = {
  [Property in keyof T]: T[Property]
}

export type TableDataKey<T> = Extract<keyof T, string>
