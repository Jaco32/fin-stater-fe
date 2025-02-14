import '../css/Stats.css'
import { useState } from 'react';

function Stats() {

    const [trigger, setTrigger] = useState(0)
//    const [transactions, setTransactions] = useState([])

    function getTransactionsSynch() {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", 'http://localhost:8080/transaction', false);
        xhr.setRequestHeader('mode', 'no-cors');
        xhr.send(null);
        return JSON.parse(xhr.responseText)
    }

    function parseTransactions(transactions) {
        if (transactions != undefined) {
            const transactionsItems = []
            for (let i = 0; i < transactions.length; i++) {
                if (transactions[i].usedForCalculation == false)
                  transactionsItems.push(<tr key={i} onClick={(event) => excludeRow(event)} style={{ backgroundColor: "blueviolet"}}>
                      <td style={{whiteSpace: 'nowrap'}}>{transactions[i].date.substr(0, 10)}</td>
                      <td style={{whiteSpace: 'nowrap'}}>{transactions[i].type}</td>
                      <td style={{textAlign: 'center'}}>{transactions[i].amount}</td>
                      <td>{transactions[i].sender}</td>
                      <td>{transactions[i].receiver}</td>
                      <td>{transactions[i].description}</td>
                      <td style={{textAlign: 'center'}}>{transactions[i].category}</td>
                    </tr>);
                else {
                  transactionsItems.push(<tr key={i} onClick={(event) => excludeRow(event)}>
                      <td style={{whiteSpace: 'nowrap'}}>{transactions[i].date.substr(0, 10)}</td>
                      <td style={{whiteSpace: 'nowrap'}}>{transactions[i].type}</td>
                      <td style={{textAlign: 'center'}}>{transactions[i].amount}</td>
                      <td>{transactions[i].sender}</td>
                      <td>{transactions[i].receiver}</td>
                      <td>{transactions[i].description}</td>
                      <td style={{textAlign: 'center'}}>{transactions[i].category}</td>
                    </tr>);
                }
            }

            return transactionsItems;
        }
    }

    function getStatsSynch()
    {
        let stats = {};

        let xhr0 = new XMLHttpRequest();
        xhr0.open("GET", 'http://localhost:8080/stat', false);
        xhr0.setRequestHeader('mode', 'no-cors');
        xhr0.send(null);
        stats.stat = JSON.parse(xhr0.responseText)

        let xhr1 = new XMLHttpRequest();
        xhr1.open("GET", 'http://localhost:8080/stat/month', false);
        xhr1.setRequestHeader('mode', 'no-cors');
        xhr1.send(null);
        stats.statMonth = JSON.parse(xhr1.responseText)

        let xhr2 = new XMLHttpRequest();
        xhr2.open("GET", 'http://localhost:8080/stat/categorized', false);
        xhr2.setRequestHeader('mode', 'no-cors');
        xhr2.send(null);
        stats.statCategorized = JSON.parse(xhr2.responseText)

        return stats;
    }

    function parseStats(stats)
    {
      if ((stats.stat != undefined) &&
          (stats.statMonth != undefined) &&
          (stats.statCategorized != undefined))
      {
        const statsOverall = []
        statsOverall.push(<tr>
            <td>{stats.stat.from_date.substr(0, 10)}</td>
            <td>{stats.stat.to.substr(0, 10)}</td>
            <td>{stats.stat.income}</td>
            <td>{stats.stat.expenses}</td>
            <td>{stats.stat.periodBalance.toFixed(2)}</td>
          </tr>)

        const statsPerMonth = []
        for (let i = 0; i < stats.statMonth.length; i++) {
          statsPerMonth.push(<tr key={i}>
              <td>{stats.statMonth[i].month}</td>
              <td>{stats.statMonth[i].income}</td>
              <td>{stats.statMonth[i].expenses.toFixed(2)}</td>
              <td>{stats.statMonth[i].balance.toFixed(2)}</td>
              <td>{stats.statMonth[i].rateOfReturn.toFixed(0)} %</td>
            </tr>)
        }

        const statsPerCategory = []
        for (let i = 0; i < stats.statCategorized.length; i++) {
          statsPerCategory.push(<tr key={i}>
              <td>{stats.statCategorized[i].category}</td>
              <td>{stats.statCategorized[i].expense.toFixed(2)}</td>
            </tr>)
        }

        return [statsOverall, statsPerMonth, statsPerCategory]
      }
    }

    function filterTable() {
      var filter = document.getElementById("table-search-input").value.toUpperCase()
      var table = document.getElementById("transactions-table");
      var tr = table.getElementsByTagName("tr");
    
      for (let i = 0; i < tr.length; i++) {
        let td = tr[i].getElementsByTagName("td")[1];
        if (td) {
          let tdValue = td.textContent || td.innerText;
          if (tdValue.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
          } else {
            tr[i].style.display = "none";
          }
        }
      }
    }

    function excludeRow(event) {
      let xhr = new XMLHttpRequest()
      xhr.open('PATCH', 'http://localhost:8080/transaction/' + event.target.parentNode.rowIndex, false)
      xhr.setRequestHeader('mode', 'no-cors');
      xhr.send(null)

      setTrigger(trigger + 1)
    }

    var parsedTransaction = parseTransactions(getTransactionsSynch())
    let parsedStats = parseStats(getStatsSynch())
    var statsOverall = parsedStats[0]
    var statsPerMonth = parsedStats[1]
    var statsPerCategory = parsedStats[2]
    
    return (
      <div className='container'>
        <div className="item-all">
          <input type='text' id='table-search-input' onKeyUp={filterTable} placeholder='Search...'/>
          <table id="transactions-table" style={{ fontSize: "12px"}}>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Sender</th>
              <th>Receiver</th>
              <th>Description</th>
              <th>Category</th>
            </tr>
            <tbody>{parsedTransaction}</tbody>
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
            <tbody>{statsOverall}</tbody>
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
            <tbody>{statsPerMonth}</tbody>
          </table>
        </div>
        <div className="item-categorized">
          <table>
            <tr>
              <th>Category</th>
              <th>Expenses</th>
            </tr>
            <tbody>{statsPerCategory}</tbody>
          </table>
        </div>
      </div>
    );
}

export default Stats;