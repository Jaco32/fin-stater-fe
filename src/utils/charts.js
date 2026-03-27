export function getOverallStatBarChartData(stats) {
    let overallStatBarChartData = {}
    if (stats.stat.length != 0) {
      overallStatBarChartData = {
        labels: [''],
        datasets: [
          {
            label: 'Income',
            data: [stats.stat[0].income.toFixed(2)],
            backgroundColor: 'rgb(75, 192, 192)',
          },
          {
            label: 'Expenses',
            data: [-1*stats.stat[0].expenses.toFixed(2)],
            backgroundColor: 'rgb(255, 99, 132)',
          },
          {
            label: 'Savings',
            data: [stats.stat[0].periodBalance.toFixed(2)],
            backgroundColor: 'rgb(53, 162, 235)',
          },
        ],
      };
    }

    return overallStatBarChartData;
}