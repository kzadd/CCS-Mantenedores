import { Breadcrumb } from '../breadcrumb.types'
import { ButtonColor, ButtonVariant } from '../button.types'

export interface HeadingAction {
  color?: ButtonColor
  disabled?: boolean
  icon?: string
  label: string
  onAction: () => void
  variant?: ButtonVariant
}

export type HeadingConfig<T extends string> = Record<T, HeadingConfigItem>

export interface HeadingConfigItem {
  actions?: HeadingAction[]
  breadcrumbs: Breadcrumb[]
  title: string
}
