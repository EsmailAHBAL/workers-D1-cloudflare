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
app.put("/update/:id", async c => {
  const body = await c.req.json()
  const id = c.req.param("id")
  console.log(id)
  const resp = await c.env.DB.prepare("update city set name=?1 where id=?2 RETURNING *")
    .bind(body.name, id)
    .run()
  if (resp.success) {
    return c.json(resp.results)
  }
})

export default app
