import request from 'supertest'
import app from '../../src/app'
import { PostgresDataSource } from '../../src/data-source'
import { initializeDB } from '../../src/initializer'

describe('Product.route', () => {
  beforeAll(async () => {
    if (!PostgresDataSource.isInitialized) {
      await PostgresDataSource.initialize()
      await PostgresDataSource.synchronize(true)
      await initializeDB()
    }
  })

  test('[GET]/api/product/', async () => {
    await request(app)
      .get('/api/product')
      .expect('Content-Type', /json/)
      .expect(200)
  })
  test('[GET]/api/product/1 : found category 200', async () => {
    await request(app)
      .get('/api/product/1')
      .expect('Content-Type', /json/)
      .expect(200)
  })
  test('[GET]/api/product/9999 : Not Found 404', async () => {
    await request(app)
      .get('/api/product/9999')
      .expect('Content-Type', /json/)
      .expect(404)
  })

  test('[GET]/api/product/ : 20 row each page', async () => {
    const page = await request(app).get('/api/product')
    expect(page.body.results.length).toBe(20)
  })

  test('[POST]/api/product/ : Data complete 200', async () => {
    await request(app)
      .post('/api/product/')
      .send({
        name: 'category test',
        description: 'description',
        brand: 'jmtp test',
        stock: 100
      })
      .expect('Content-Type', /json/)
      .expect(200)
  })

  test('[POST]/api/product/ : Name empty 403 Forbidden', async () => {
    await request(app)
      .post('/api/product/')
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
