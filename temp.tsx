const fetch = require('node-fetch');

describe('API Test', () => {
  it('should trigger execution with test ids and config file', async () => {
    const response = await fetch('http://localhost:5000/execute', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        test_ids: [101, 102],
        configFileName: 'demo_config.json'
      })
    });

    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toHaveProperty('status');
    expect(data.status).toHaveProperty('code', 200);
    expect(data.status).toHaveProperty('msg');
    expect(data).toHaveProperty('data');
  });
});