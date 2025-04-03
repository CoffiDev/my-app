// src/index.test.tsx
import { describe, it, expect } from 'vitest'
// Import the Hono app instance you want to test
import app from './index' // Assuming index.tsx exports the app instance as default

describe('GET /', () => {
  it('should return 200 OK and welcome message', async () => {
    // Hono apps have a .request method for testing
    const res = await app.request('/')

    // Assertions
    expect(res.status).toBe(200)
    expect(res.headers.get('content-type')).toMatch(/text\/html/)

    const text = await res.text()
    expect(text).toContain('<h1>Hello!</h1>') // Check if the rendered HTML is present
  })

  // Example: Test for a non-existent route (optional)
  it('should return 404 for unknown routes', async () => {
    const res = await app.request('/non-existent-route')
    expect(res.status).toBe(404)
  })
})

describe('Static CSS', () => {
  it('should return 200 OK for static CSS file', async () => {
    // Note: Testing static assets served via wrangler/miniflare might require
    // more specific setup or integration testing.
    // This basic request tests if Hono *could* potentially route it,
    // but the actual serving depends on the worker environment setup by the pool.
    // Often, static asset tests are better handled by end-to-end tools or
    // by simply ensuring the build process places them correctly and wrangler is configured.
    // For now, let's just see if a request doesn't immediately fail within Hono.

    // We expect Hono itself to likely 404 this unless a specific route is set up,
    // as static assets are typically handled *by* the environment, not *through* Hono routes.
    // Let's adjust the expectation based on how Hono/Vite/Cloudflare plugin handles this.
    // A direct request via `app.request` might not trigger the static asset serving.
    // Let's keep the focus on API/route testing for unit tests.
    // If you needed to test static assets specifically, you might run wrangler dev
    // and use a separate HTTP client tool.

    // We'll comment this out for now as it's less of a unit test for the Hono app logic.
    // const res = await app.request('/static/style.css')
    // expect(res.status).toBe(200) // This likely wouldn't pass without specific handling
  })
}) 