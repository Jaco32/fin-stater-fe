import { useState } from 'react';
import {
  mapCategories
} from '../../utils/parse';

function Monthly({stPerMonth}) {

    const [toogle, setToggle] = useState([]);

    function toogleMonthlyCategorized(event) {
      const toogleCopy = toogle.slice(0)
      toogleCopy[event.target.parentNode.rowIndex-1] = !toogle[event.target.parentNode.rowIndex-1]
      setToggle(toogleCopy)
    }

    function parseMonthlyStats(monthlyStats)
    {
      const monthlyStatsTBody = []
      if (monthlyStats !== undefined)
      {
          const plnFormatter = new Intl.NumberFormat("pl-PL", { style: "currency", currency: "PLN" });

          if (toogle.length === 0) {
              const initialToogle = [];
              for(let i = 0; i < monthlyStats.length; i++) {
                  initialToogle[i] = false;
              }
              setToggle(initialToogle);
          }

          for (let i = 0; i < monthlyStats.length; i++) {
              var categorizedMonthly = []
              for (let j = 0; j < monthlyStats[i].categorizedMonthly.length; j++) {
                  const mappedCategories = monthlyStats[i].categorizedMonthly.map(categoryItem => categoryItem.category).map(category => mapCategories(category))
                  categorizedMonthly.push(
                      <tr key={j}>
                          <td>{mappedCategories[j]}</td>
                          <td>{plnFormatter.format(-1*monthlyStats[i].categorizedMonthly[j].expense.toFixed(2))}</td>
                      </tr>
                  )
              }

              console.log("monthly stats - inputting - rateOfReturn: " + monthlyStats[i].rateOfReturn)

              let rateOfReturn = ""
              if (monthlyStats[i].rateOfReturn === "-Infinity") rateOfReturn = "N/A"
              else rateOfReturn = monthlyStats[i].rateOfReturn.toFixed(0) + " %"
              monthlyStatsTBody.push(
              <>
                  <tr id={i} key={i} onClick={(event) => toogleMonthlyCategorized(event)}>
                      <td>{monthlyStats[i].monthName}</td>
                      <td>{plnFormatter.format(monthlyStats[i].income.toFixed(2))}</td>
                      <td>{plnFormatter.format(-1*monthlyStats[i].expenses.toFixed(2))}</td>
                      <td>{plnFormatter.format(monthlyStats[i].balance.toFixed(2))}</td>
                      <td>{rateOfReturn}</td>
                  </tr>
                  {toogle[i] &&
                  (<tr>
                      <td colSpan={5} style={{ padding: "0px"}}>
                          <table className="table table-sm fs-6">
                              <thead className='table-info'>
                                  <tr>
                                      <th>Category</th>
                                      <th>Expenses</th>
                                  </tr>
                              </thead>
                              <tbody>{categorizedMonthly}</tbody>
                          </table>
                      </td>
                  </tr>)
                  }
              </>
              )
          }

          return monthlyStatsTBody;
      }
    }

    const statsPerMonth = parseMonthlyStats(stPerMonth)

    return (
        <table className="table table-striped table-bordered table-hover table-sm">
            <thead className="table-primary">
                <tr>
                    <th>Month</th>
                    <th>Income</th>
                    <th>Expenses</th>
                    <th>Balance</th>
                    <th>Stopa zwrotu</th>
                </tr>
            </thead>
            <tbody>{statsPerMonth}</tbody>
        </table>
    )
}

export default Monthly;