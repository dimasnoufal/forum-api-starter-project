import request from 'supertest';
import createServer from '../createServer.js';
import container from '../../container.js';

describe('Rate limiter pada /threads', () => {
  it('menolak setelah 90 request per menit', async () => {
    const app = await createServer(container);

    // 90 request pertama harus lolos
    for (let i = 0; i < 90; i += 1) {
      const res = await request(app).get('/threads');
      expect(res.statusCode).not.toBe(429);
    }

    // request ke‑91 wajib error 429
    const res = await request(app).get('/threads');
    expect(res.statusCode).toBe(429);
    expect(res.body.status).toBe('fail');
    expect(res.body.message).toMatch(/Too many requests/);
  });
});
