const pollingInterval = useRef<ReturnType<typeof setInterval> | null>(null)

const startPolling = () => {
  if (!pollingInterval.current) {
    pollingInterval.current = setInterval(() => {
      fetchStatus()
    }, 5000)
  }
}

const stopPolling = () => {
  if (pollingInterval.current) {
    clearInterval(pollingInterval.current)
    pollingInterval.current = null
  }
}

useEffect(() => {
  startPolling()
  return () => {
    stopPolling()
  }
}, [])