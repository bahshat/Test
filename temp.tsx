useEffect(() => {
  const interval = setInterval(() => {
    setData((prev) => {
      const newData = [...prev];
      newData[0]['Pass'] = Math.floor(Math.random() * 10);
      return newData;
    });
  }, 3000);

  return () => clearInterval(interval);
}, []);