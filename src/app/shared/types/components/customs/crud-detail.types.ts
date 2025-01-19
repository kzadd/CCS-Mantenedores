export interface DetailConfig<T> {
  key: DetailConfigKey<T>
  label: string
  value: T[keyof T]
}

export type DetailConfigKey<T> = Extract<keyof T, string>
