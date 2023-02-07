import { env } from 'process'

export const getCheckedEnvParams = (paramName: string): string => {
  if (paramName.length === 0) {
    throw new Error('Parameter must be different from empty string')
  }
  const paramVal: string = env[paramName] ?? ''
  if (paramVal !== undefined && paramVal !== null && paramVal.length > 0) {
    return paramVal
  } else {
    throw new Error(`${paramName} must not be undefined or null or empty string`)
  }
}
