import app from './app'
import { env } from 'process'
import { PostgresDataSource } from './data-source'
import { getCheckedEnvParams } from './helpers'
import { initializeDB } from './initializer'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function main () {
  const PORT = (env.PORT !== undefined && env.PORT !== null)
    ? +env.PORT
    : 3000
  const HOSTNAME = (env.HOTNAME !== undefined && env.HOTNAME !== null)
    ? env.HOTNAME
    : 'localhost'

  try {
    if (!PostgresDataSource.isInitialized && getCheckedEnvParams('NODE_ENV') !== 'TEST') {
      await PostgresDataSource.initialize()
    }

    if (getCheckedEnvParams('NODE_ENV') === 'DEV') {
      await initializeDB() // some data for pagination
    }

    app.listen(PORT, HOSTNAME, () => {
      console.log(`Server is running at\nhttp://${HOSTNAME}:${PORT}`)
    })
  } catch (error: any) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    throw new Error(`DB not initialized\n${error}`)
  }
}

void main()
