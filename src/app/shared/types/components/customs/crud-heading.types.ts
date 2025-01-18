import { Breadcrumb } from '../breadscrumb.types'
import { ButtonColors, ButtonVariants } from '../button.types'

export interface HeadingAction {
  color?: ButtonColors
  disabled?: boolean
  icon?: string
  label: string
  onAction: () => void
  variant?: ButtonVariants
}

export type HeadingConfig<T extends string> = Record<T, HeadingConfigItem>

export interface HeadingConfigItem {
  actions?: HeadingAction[]
  breadcrumbs: Breadcrumb[]
  title: string
}
