import { mapCategories } from './parse'

export function getOverallStatBarChartData(overallStats) {
    console.log('getOverallStatBarChartData - entered');

    let overallStatBarChartData = {}
    if (overallStats.length != 0) {
      overallStatBarChartData = {
        labels: [''],
        datasets: [
          {
            label: 'Przychód',
            data: [overallStats[0].income.toFixed(2)],
            backgroundColor: 'rgba(75, 192, 192, 0.65)',
            borderColor: 'gray',
            borderWidth: 1
          },
          {
            label: 'Wydatki',
            data: [-1*overallStats[0].expenses.toFixed(2)],
            backgroundColor: 'rgba(255, 99, 132, 0.65)',
            borderColor: 'gray',
            borderWidth: 1
          },
          {
            label: 'Dochód',
            data: [overallStats[0].periodBalance.toFixed(2)],
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

export function getCategorizedStatBarChartData(categorizedStats) {
  let categorizedStatBarChartData = {}
  if (categorizedStats.length != 0) {
    const categorizedBarLabels = categorizedStats.map(categoryItem => categoryItem.category).map(category => mapCategories(category));
    let categorizedBarDataSet = []
    for(let i = 0; i < categorizedBarLabels.length; i++) {
      categorizedBarDataSet.push({
        label: categorizedBarLabels[i],
        data: [categorizedStats[i].expense.toFixed(2)*-1],
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

export function getMonthlyStatBarChartData(monthlyStats) {
  let monthlyStatsBarChartData = {}
  if (monthlyStats.length != 0) {
    const labels = monthlyStats.map(monthItem => monthItem.monthName);
    monthlyStatsBarChartData = {
      labels,
      datasets: [
        {
          label: 'Przychód',
          data: monthlyStats.map(monthItem => monthItem.income.toFixed(2)),
          backgroundColor: 'rgba(75, 192, 192, 0.65)',
          borderColor: 'gray',
          borderWidth: 1,
          stack: 'Stack 0',
        },
        {
          label: 'Wydatki',
          data: monthlyStats.map(monthItem => -1*monthItem.expenses.toFixed(2)),
          backgroundColor: 'rgba(255, 99, 132, 0.65)',
          borderColor: 'gray',
          borderWidth: 1,
          stack: 'Stack 1',
        },
        {
          label: 'Dochód',
          data: monthlyStats.map(monthItem => monthItem.balance.toFixed(2)),
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