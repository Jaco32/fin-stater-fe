import { useState } from 'react';
import { mapCategories } from '../../utils/parse';
import { filterTableByMonth } from '../../utils/filter'

function Monthly({stPerMonth}) {

    const [toggle, setToggle] = useState(new Map());

    function toggleMonthlyCategorized(event) {
      const yearMonthKey = event.target.parentNode.getElementsByTagName("td")[1].textContent
      let yearMonthValue = toggle.get(yearMonthKey)
      setToggle(new Map(toggle.set(yearMonthKey, !yearMonthValue)))
    }

    function parseMonthlyStats(monthlyStats)
    {
        const monthlyStatsTBody = []
        if ((monthlyStats !== undefined) && (monthlyStats.length > 0)) {
            const plnFormatter = new Intl.NumberFormat("pl-PL", { style: "currency", currency: "PLN" });

            if (toggle.size === 0) {
                const initialToogle = new Map();
                for(let i = 0; i < monthlyStats.length; i++)
                    initialToogle.set(monthlyStats[i].monthName, false);
                setToggle(initialToogle);
            }

            for (let i = 0; i < monthlyStats.length; i++)
            {
                const categorizedMonthly = []
                for (let j = 0; j < monthlyStats[i].categorizedMonthly.length; j++) {
                    const mappedCategories = monthlyStats[i].categorizedMonthly
                                                .map(categoryItem => categoryItem.category)
                                                .map(category => mapCategories(category))
                    categorizedMonthly.push(
                        <tr key={j}>
                            <td></td>
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
                    <tr id={i} key={i}>
                        <td onClick={(event) => toggleMonthlyCategorized(event)} style={{ textAlign: 'right', cursor: 'pointer'}}>
                            &#10133;
                        </td>
                        <td>{monthlyStats[i].monthName}</td>
                        <td style={{ color: 'rgb(75, 192, 192)'}}>
                            <b>{plnFormatter.format(monthlyStats[i].income.toFixed(2))}</b>
                        </td>
                        <td style={{ color: 'rgb(255, 99, 132)'}}>
                            <b>{plnFormatter.format(-1*monthlyStats[i].expenses.toFixed(2))}</b>
                        </td>
                        <td style={{ color: 'rgb(53, 162, 235)'}}>
                            <b>{plnFormatter.format(monthlyStats[i].balance.toFixed(2))}</b>
                        </td>
                        <td>{rateOfReturn}</td>
                        <td onClick={(event) => filterTableByMonth(event)} style={{ cursor: 'pointer'}}>&#10024;</td>
                    </tr>
                    {toggle.get(monthlyStats[i].monthName) &&
                    (<tr>
                        <td colSpan={7} style={{ padding: "0px"}}>
                            <table className="table table-sm">
                                <thead className='table-info'>
                                    <tr>
                                        <th></th>
                                        <th className="text-secondary">Kategoria</th>
                                        <th className="text-secondary">Wydatki</th>
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
                    <th></th>
                    <th className="text-secondary">Miesiąc</th>
                    <th className="text-secondary">Przychód</th>
                    <th className="text-secondary">Wydatki</th>
                    <th className="text-secondary">Dochód</th>
                    <th className="text-secondary">Stopa zwrotu</th>
                    <th></th>
                </tr>
            </thead>
            <tbody style={{ fontSize: '12px'}}>{statsPerMonth}</tbody>
        </table>
    )
}

export default Monthly;