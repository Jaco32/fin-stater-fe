import { mapCategories } from './parse'

export function getOverallStatBarChartData(stats) {
    let overallStatBarChartData = {}
    if (stats.stat.length != 0) {
      overallStatBarChartData = {
        labels: [''],
        datasets: [
          {
            label: 'Przychód',
            data: [stats.stat[0].income.toFixed(2)],
            backgroundColor: 'rgba(75, 192, 192, 0.65)',
            borderColor: 'gray',
            borderWidth: 1
          },
          {
            label: 'Wydatki',
            data: [-1*stats.stat[0].expenses.toFixed(2)],
            backgroundColor: 'rgba(255, 99, 132, 0.65)',
            borderColor: 'gray',
            borderWidth: 1
          },
          {
            label: 'Dochód',
            data: [stats.stat[0].periodBalance.toFixed(2)],
            backgroundColor: 'rgba(53, 162, 235, 0.65)',
            borderColor: 'gray',
            borderWidth: 1
          },
        ],
      };
    }

    return overallStatBarChartData;
}

const colorPalette = [
  'rgba(75, 192, 192, 0.65)',
  'rgba(255, 99, 132, 0.65)',
  'rgba(53, 162, 235, 0.65)',
  'rgba(255, 205, 86, 0.65)',
  'rgba(255, 255, 0, 0.65)',
  'rgba(138, 43, 226, 0.65)',
  'rgba(211, 211, 211, 0.65)',
  'rgba(139, 69, 19, 0.65)',
  'rgba(32, 178, 170, 0.65)',
  'rgba(240, 128, 128, 0.65)'
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
        backgroundColor: colorPalette[i],
        borderColor: 'gray',
        borderWidth: 1
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
          backgroundColor: 'rgba(75, 192, 192, 0.65)',
          borderColor: 'gray',
          borderWidth: 1,
          stack: 'Stack 0',
        },
        {
          label: 'Expenses',
          data: stats.statMonth.map(monthItem => -1*monthItem.expenses.toFixed(2)),
          backgroundColor: 'rgba(255, 99, 132, 0.65)',
          borderColor: 'gray',
          borderWidth: 1,
          stack: 'Stack 1',
        },
        {
          label: 'Savings',
          data: stats.statMonth.map(monthItem => monthItem.balance.toFixed(2)),
          backgroundColor: 'rgba(53, 162, 235, 0.65)',
          borderColor: 'gray',
          borderWidth: 1,          
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