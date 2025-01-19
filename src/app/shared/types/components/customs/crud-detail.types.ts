export interface DetailConfig<T> {
  key: Extract<keyof T, string>
  label: string
  value: T[keyof T]
}
