const executeTests = async (testIds: number[]) => {
  try {
    const response = await fetch('http://127.0.0.1:5000/execute', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ test_ids: testIds }),
    });
    const data = await response.json();
    console.log('Execution started:', data);
  } catch (error) {
    console.error('Execution failed:', error);
  }
};