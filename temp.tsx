const pages = ['Logs', 'ExecutionStatus', 'ExecuteTest', 'ReportView', 'DetailView', 'GraphView', 'ViewTest']
  .reduce((acc, name) => {
    acc[name] = require(`./src/pages/${name}`).default;
    return acc;
  }, {} as Record<string, React.FC<any>>);