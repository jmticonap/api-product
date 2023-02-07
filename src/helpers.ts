import { env } from 'process'

export const getCheckedEnvParams = (paramName: string): string => {
  const paramVal: string = env[paramName] ?? ''
  if (paramVal !== undefined && paramVal !== null) {
    return paramVal
  } else {
    throw new Error(`${paramName} must not be undefined or null`)
  }
}
