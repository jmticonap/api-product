import app from './app'
import { env } from 'process'

const PORT = (env.PORT !== undefined && env.PORT !== null)
  ? +env.PORT
  : 3000
const HOSTNAME = (env.HOTNAME !== undefined && env.HOTNAME !== null)
  ? env.HOTNAME
  : 'localhost'

const server = app.listen(PORT, HOSTNAME, () => {
  console.log(`Server is running at\nhttp://${HOSTNAME}:${PORT}`)
})

export default server
