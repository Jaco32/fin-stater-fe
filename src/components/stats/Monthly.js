import { useState } from 'react';
import { mapCategories } from '../../utils/parse';
import { filterTableByMonth } from '../../utils/filter'

function Monthly({stPerMonth}) {

    const [toogle, setToggle] = useState(new Map());

    function toogleMonthlyCategorized(event) {
      const yearMonthKey = event.target.parentNode.getElementsByTagName("td")[0].textContent
      let yearMonthValue = toogle.get(yearMonthKey)
      setToggle(new Map(toogle.set(yearMonthKey, !yearMonthValue)))
    }

    function parseMonthlyStats(monthlyStats)
    {
        const monthlyStatsTBody = []
        if ((monthlyStats !== undefined) && (monthlyStats.length > 0)) {
            const plnFormatter = new Intl.NumberFormat("pl-PL", { style: "currency", currency: "PLN" });

            if (toogle.size === 0) {
                const initialToogle = new Map();
                for(let i = 0; i < monthlyStats.length; i++) {
                    initialToogle.set(monthlyStats[i], false);
                }
                setToggle(initialToogle);
            }

            for (let i = 0; i < monthlyStats.length; i++) {
                var categorizedMonthly = []
                for (let j = 0; j < monthlyStats[i].categorizedMonthly.length; j++) {
                    const mappedCategories = monthlyStats[i].categorizedMonthly
                                                .map(categoryItem => categoryItem.category)
                                                .map(category => mapCategories(category))
                    categorizedMonthly.push(
                        <tr key={j}>
                            <td>{mappedCategories[j]}</td>
                            <td>{plnFormatter.format(-1*monthlyStats[i].categorizedMonthly[j].expense.toFixed(2))}</td>
                        </tr>
                    )
                }

                let rateOfReturn = ""
                if (monthlyStats[i].rateOfReturn === "-Infinity") rateOfReturn = "N/A"
                else rateOfReturn = monthlyStats[i].rateOfReturn.toFixed(0) + " %"
                monthlyStatsTBody.push(
                <>
                    <tr id={i} key={i} onClick={(event) => filterTableByMonth(event)}>
                        <td>{monthlyStats[i].monthName}</td>
                        <td>{plnFormatter.format(monthlyStats[i].income.toFixed(2))}</td>
                        <td>{plnFormatter.format(-1*monthlyStats[i].expenses.toFixed(2))}</td>
                        <td>{plnFormatter.format(monthlyStats[i].balance.toFixed(2))}</td>
                        <td>{rateOfReturn}</td>
                    </tr>
                    {toogle.get(monthlyStats[i].monthName) &&
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
        }

        return monthlyStatsTBody;
    }

    const statsPerMonth = parseMonthlyStats(stPerMonth)

    return (
        <table className="table table-striped table-hover table-sm">
            <thead className="table-primary">
                <tr style={{ fontSize: '12px'}}>
                    <th>Month</th>
                    <th>Income</th>
                    <th>Expenses</th>
                    <th>Balance</th>
                    <th>Stopa zwrotu</th>
                </tr>
            </thead>
            <tbody style={{ fontSize: '12px'}}>{statsPerMonth}</tbody>
        </table>
    )
}

export default Monthly;