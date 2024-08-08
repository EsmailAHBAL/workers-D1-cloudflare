import { Hono } from 'hono'
type Bindings = {
  DB: D1Database
}
const app = new Hono<{ Bindings: Bindings }>()

app.get('/cities', async c => {
  const resp = await c.env?.DB.prepare('select * from city').all()
  const cities = resp.results
  return c.json(cities)
})

export default app
