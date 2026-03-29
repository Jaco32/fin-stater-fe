import { mapCategories } from './parse'

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

const colorPalette = [
  'rgb(75, 192, 192)',
  'rgb(255, 99, 132)',
  'rgb(53, 162, 235)',
  'red',
  'blue',
  'yellow',
  'green',
  'brown',
  'black'
]

export function getCategorizedStatBarChartData(stats) {
  let categorizedStatBarChartData = {}
  if (stats.statCategorized.length != 0) {
    const categorizedBarLabels = stats.statCategorized.map(categoryItem => categoryItem.category).map(category => mapCategories(category));
    let categorizedBarDataSet = []
    for(let i = 0; i < categorizedBarLabels.length; i++) {
      categorizedBarDataSet.push({
        label: categorizedBarLabels[i],
        data: [stats.statCategorized[i].expense.toFixed(2)*-1],
        backgroundColor: colorPalette[i]
      })
    }
    categorizedStatBarChartData = {
      labels: [''],
      datasets: categorizedBarDataSet
    }
  }

  return categorizedStatBarChartData
}

export function getMonthlyStatBarChartData(stats) {
  let monthlyStatsBarChartData = {}
  if (stats.statMonth.length != 0) {
    const labels = stats.statMonth.map(monthItem => monthItem.monthName);
    monthlyStatsBarChartData = {
      labels,
      datasets: [
        {
          label: 'Income',
          data: stats.statMonth.map(monthItem => monthItem.income.toFixed(2)),
          backgroundColor: 'rgb(75, 192, 192)',
          stack: 'Stack 0',
        },
        {
          label: 'Expenses',
          data: stats.statMonth.map(monthItem => -1*monthItem.expenses.toFixed(2)),
          backgroundColor: 'rgb(255, 99, 132)',
          stack: 'Stack 1',
        },
        {
          label: 'Savings',
          data: stats.statMonth.map(monthItem => monthItem.balance.toFixed(2)),
          backgroundColor: 'rgb(53, 162, 235)',
          stack: 'Stack 2',
        },
      ],
    };
  }

  return monthlyStatsBarChartData;
}

export function getMonthlyStatLineChartData(stats) {
  let monthlyStatsBarChartData = {}
  if (stats.statMonth.length != 0) {
    const labels = stats.statMonth.map(monthItem => monthItem.monthName);
    monthlyStatsBarChartData = {
      labels,
      datasets: [
        {
          label: 'Income',
          data: stats.statMonth.map(monthItem => monthItem.income.toFixed(2)),
          borderColor: 'rgb(75, 192, 192)'
        },
        {
          label: 'Expenses',
          data: stats.statMonth.map(monthItem => -1*monthItem.expenses.toFixed(2)),
          borderColor: 'rgb(255, 99, 132)'
        },
        {
          label: 'Savings',
          data: stats.statMonth.map(monthItem => monthItem.balance.toFixed(2)),
          borderColor: 'rgb(53, 162, 235)'
        },        
      ],
    };
  }

  return monthlyStatsBarChartData;
}