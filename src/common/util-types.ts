export type NonNullableVariables<T> = {
  [K in keyof T]-?: NonNullable<T[K]>
}

export const INVALID_ID = -1
