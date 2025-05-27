// __tests__/api-call.test.js

const fetch = require('node-fetch');

describe('API Test', () => {
  it('should return suites from Flask', async () => {
    const res = await fetch('http://127.0.0.1:5000/suites');
    expect(res.status).toBe(200);

    const data = await res.json();
    console.log('DATA:', data);

    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);
    expect(data[0]).toHaveProperty('id');
  });
});