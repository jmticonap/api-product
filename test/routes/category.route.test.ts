import request from 'supertest'
import app from '../../src/app'
import { PostgresDataSource } from '../../src/data-source'
import { initializeDB } from '../../src/initializer'

describe('Category.route', () => {
  beforeAll(async () => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!PostgresDataSource.isInitialized) {
      await PostgresDataSource.initialize()
      await PostgresDataSource.synchronize(true)
      await initializeDB()
    }
  })

  test('[GET]/api/category/', async () => {
    await request(app)
      .get('/api/category')
      .expect('Content-Type', /json/)
      .expect(200)
  })
  test('[GET]/api/category/<ID> : found category 200', async () => {
    const response = await request(app).get('/api/category?offset=0&limit=1')
    const id: string = response.body.results[0].id
    await request(app)
      .get(`/api/category/${id}`)
      .expect('Content-Type', /json/)
      .expect(200)
  })
  test('[GET]/api/category/9999 : Not Found 404', async () => {
    await request(app)
      .get('/api/category/9999')
      .expect('Content-Type', /json/)
      .expect(404)
  })

  test('[POST]/api/category/ : Data complete 200', async () => {
    await request(app)
      .post('/api/category/')
      .send({
        name: 'category test',
        description: 'description'
      })
      .expect('Content-Type', /json/)
      .expect(200)
  })

  test('[POST]/api/category/ : Name empty 403 Forbidden', async () => {
    await request(app)
      .post('/api/category/')
      .send({
        name: '',
        description: 'description'
      })
      .expect('Content-Type', /json/)
      .expect(403)
  })

  afterAll(async () => {
    await PostgresDataSource.destroy()
  })
})
