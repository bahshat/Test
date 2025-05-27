describe('Simple API test without React Native', () => {
  it('should return expected suites from API', async () => {
    const response = await fetch('http://127.0.0.1:5000/suites');
    expect(response.status).toBe(200);

    const data = await response.json();
    console.log('Received data:', data);

    // Very basic check
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);

    // Optional: check shape of first item
    expect(data[0]).toHaveProperty('id');
    expect(data[0]).toHaveProperty('name');
  });
});