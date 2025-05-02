<Table
  headers={headers}
  rows={rows}
  actions={['Log', 'Graph']}
  onRowTap={(index, action) => {
    if (action === 'Log') {
      // handle log view
    } else if (action === 'Graph') {
      // handle graph view
    }
  }}
/>