import '../css/Stats.css'

function Stats() {

    async function getStats()
    {
        let myState = {}

        const response = await fetch('http://localhost:8080/transaction', {
          headers: {
            "mode": "no-cors"
          }
        })
        const responseValue = (await response.text()).toString()
        myState.transaction = JSON.parse(responseValue)

        const statResponse = await fetch('http://localhost:8080/stat', {
          headers: {
            "mode": "no-cors"
          }
        })
        const statResponseValue = (await statResponse.text()).toString()
        myState.stat = JSON.parse(statResponseValue)
    
        const statMonthResponse = await fetch('http://localhost:8080/stat/month', {
          headers: {
            "mode": "no-cors"
          }
        })
        const statMonthResponseValue = (await statMonthResponse.text()).toString()
        myState.statMonth = JSON.parse(statMonthResponseValue)
    
        const statCategorizedResponse = await fetch('http://localhost:8080/stat/categorized', {
          headers: {
            "mode": "no-cors"
          }
        })
        const statCategorizedResponseValue = (await statCategorizedResponse.text()).toString()
        myState.statCategorized = JSON.parse(statCategorizedResponseValue)

        return myState
    }

    function getStatsSynch()
    {
        let myState = {};
    
        var xhr = new XMLHttpRequest();
        xhr.open("GET", 'http://localhost:8080/transaction', false);
        xhr.setRequestHeader('mode', 'no-cors');
        xhr.send(null);
        myState.transaction = JSON.parse(xhr.responseText);

        var xhr0 = new XMLHttpRequest();
        xhr0.open("GET", 'http://localhost:8080/stat', false);
        xhr0.setRequestHeader('mode', 'no-cors');
        xhr0.send(null);
        myState.stat = JSON.parse(xhr0.responseText)

        var xhr1 = new XMLHttpRequest();
        xhr1.open("GET", 'http://localhost:8080/stat/month', false);
        xhr1.setRequestHeader('mode', 'no-cors');
        xhr1.send(null);
        myState.statMonth = JSON.parse(xhr1.responseText)

        var xhr2 = new XMLHttpRequest();
        xhr2.open("GET", 'http://localhost:8080/stat/categorized', false);
        xhr2.setRequestHeader('mode', 'no-cors');
        xhr2.send(null);
        myState.statCategorized = JSON.parse(xhr2.responseText)

        return myState;
    }

    function parseStats(someState)
    {
      if ((someState.transaction != undefined) &&
          (someState.stat != undefined) &&
          (someState.statMonth != undefined) &&
          (someState.statCategorized != undefined))
      {
        const items = []
        for (let i = 0; i < someState.transaction.length; i++) {
          items.push(<tr key={i}>
              <td style={{whiteSpace: 'nowrap'}}>{someState.transaction[i].date.substr(0, 10)}</td>
              <td style={{whiteSpace: 'nowrap'}}>{someState.transaction[i].type}</td>
              <td style={{textAlign: 'center'}}>{someState.transaction[i].amount}</td>
              <td>{someState.transaction[i].sender}</td>
              <td>{someState.transaction[i].receiver}</td>
              <td>{someState.transaction[i].description}</td>
              <td style={{textAlign: 'center'}}>{someState.transaction[i].category}</td>
            </tr>);
        }

        const statItems = []
        for (let i = 0; i < 1; i++) {
          statItems.push(<tr>
              <td>{someState.stat.from_date.substr(0, 10)}</td>
              <td>{someState.stat.to.substr(0, 10)}</td>
              <td>{someState.stat.income}</td>
              <td>{someState.stat.expenses}</td>
              <td>{someState.stat.periodBalance.toFixed(2)}</td>
            </tr>)
        }

        const statMonthItems = []
        for (let i = 0; i < 7; i++) {
          statMonthItems.push(<tr key={i}>
              <td>{someState.statMonth[i].month}</td>
              <td>{someState.statMonth[i].income}</td>
              <td>{someState.statMonth[i].expenses.toFixed(2)}</td>
              <td>{someState.statMonth[i].balance.toFixed(2)}</td>
              <td>{someState.statMonth[i].rateOfReturn.toFixed(0)} %</td>
            </tr>)
        }

        const statCategorizedItems = []
        for (let i = 0; i < 11; i++) {
          statCategorizedItems.push(<tr key={i}>
              <td>{someState.statCategorized[i].category}</td>
              <td>{someState.statCategorized[i].expense.toFixed(2)}</td>
            </tr>)
        }

        return [items, statItems, statMonthItems, statCategorizedItems]
      }
    }

    let x = parseStats(getStatsSynch())
    let items = x[0]
    let statItems = x[1]
    let statMonthItems = x[2]
    let statCategorizedItems = x[3]
    
    return (
      <div className='container'>
        <div className="item-all">
          <table>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Sender</th>
              <th>Receiver</th>
              <th>Description</th>
              <th>Category</th>
            </tr>
            <tbody>{items}</tbody>
          </table>
        </div>
        <div className="item-period">
          <table>
            <tr>
              <th>From</th>
              <th>To</th>
              <th>Income</th>
              <th>Expenses</th>
              <th>Balance</th>
            </tr>
            <tbody>{statItems}</tbody>
          </table>
        </div>
        <div className="item-monthly">
          <table>
            <tr>
              <th>Month</th>
              <th>Income</th>
              <th>Expenses</th>
              <th>Balance</th>
              <th>Stopa zwrotu</th>
            </tr>
            <tbody>{statMonthItems}</tbody>
          </table>
        </div>
        <div className="item-categorized">
          <table>
            <tr>
              <th>Category</th>
              <th>Expenses</th>
            </tr>
            <tbody>{statCategorizedItems}</tbody>
          </table>
        </div>
      </div>
    );
}

export default Stats;