import '../css/Stats.css';
import Categorized from './stats/Categorized';
import { getTransactionsSynch, getStatsSynch } from '../backend/stats';

import { useState } from 'react';
import { Chart, ArcElement, Legend, Tooltip, plugins } from 'chart.js';
import { Pie } from 'react-chartjs-2';

function Stats() {

    const [trigger, setTrigger] = useState(0)
    const [toogle, setToggle] = useState([false, false, false, false, false, false, false, false]);
    const [toogleCategorized, setToggleCategorized] = useState(true);

    function parseTransactions(transactions) {
        if (transactions !== undefined) {
            const transactionsItems = []
            for (let i = 0; i < transactions.length; i++) {
                if (transactions[i].usedForCalculation === false)
                  transactionsItems.push(<tr key={i} onClick={(event) => excludeRow(event)} style={{ backgroundColor: "blueviolet"}}>
                      <td style={{whiteSpace: 'nowrap'}}>{transactions[i].date.substr(0, 10)}</td>
                      <td style={{whiteSpace: 'nowrap'}}>{transactions[i].type}</td>
                      <td style={{textAlign: 'center'}}>{transactions[i].amount}</td>
                      <td>{transactions[i].sender}</td>
                      <td>{transactions[i].receiver}</td>
                      <td>{transactions[i].description}</td>
                      <td style={{textAlign: 'center'}}>{transactions[i].category}</td>
                      <td>{transactions[i].additional_info}</td>
                      <td>{transactions[i].additional_info_2}</td>
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
                      <td>{transactions[i].additional_info}</td>
                      <td>{transactions[i].additional_info_2}</td>
                    </tr>);
                }
            }

            return transactionsItems;
        }
    }

    function toogleMonthlyCategorized(event) {
      const toogleCopy = toogle.slice(0)
      toogleCopy[event.target.parentNode.rowIndex-1] = !toogle[event.target.parentNode.rowIndex-1]
      setToggle(toogleCopy)
    }

    function parseStats(stats)
    {
      if ((stats.stat !== undefined) &&
          (stats.statMonth !== undefined) &&
          (stats.statCategorized !== undefined) &&
          (stats.statAvarage !== undefined))
      {
        const statsOverall = []
        for (let i = 0; i < stats.stat.length; i++) {
          statsOverall.push(<tr>
            <td>{stats.stat[i].from_date.substr(0, 10)}</td>
            <td>{stats.stat[i].to.substr(0, 10)}</td>
            <td>{stats.stat[i].income.toFixed(2)}</td>
            <td>{stats.stat[i].expenses.toFixed(2)}</td>
            <td>{stats.stat[i].periodBalance.toFixed(2)}</td>
            <td>{stats.stat[i].viewName}</td>
          </tr>)
        }
        

        const statsPerMonth = []
        for (let i = 0; i < stats.statMonth.length; i++) {
          var categorizedMonthly = []
          for (let j = 0; j < stats.statMonth[i].categorizedMonthly.length; j++) {
              categorizedMonthly.push(
                  <tr key={j} className="sub-table">
                    <td style={{ borderLeft: "0px", borderBottom: "0px"}}>{stats.statMonth[i].categorizedMonthly[j].category}</td>
                    <td style={{ borderRight: "0px", borderBottom: "0px"}}>{stats.statMonth[i].categorizedMonthly[j].expense.toFixed(2)}</td>
                  </tr>
              )
          }

          statsPerMonth.push(
            <>
              <tr id={i} key={i} onClick={(event) => toogleMonthlyCategorized(event)}>
                <td>{stats.statMonth[i].monthName}</td>
                <td>{stats.statMonth[i].income.toFixed(2)}</td>
                <td>{stats.statMonth[i].expenses.toFixed(2)}</td>
                <td>{stats.statMonth[i].balance.toFixed(2)}</td>
                <td>{stats.statMonth[i].rateOfReturn.toFixed(0)} %</td>
              </tr>
              {toogle[i] &&
                (<tr>
                  <td colSpan={5} style={{ paddingLeft: "0px", paddingRight: "0px", paddingBottom: "0px", paddingTop: "0px"}}>
                    <table className="sub-table" style={{ width: "100%"}}>
                      <tr className="sub-table">
                        <th className="sub-table" style={{ borderRight: "solid black 1px"}}>Category</th>
                        <th className="sub-table">Expenses</th>
                      </tr>
                      <tbody>{categorizedMonthly}</tbody>
                    </table>
                  </td>
                </tr>)
              }
            </>
          )
        }

        const statsPerCategory = []
        for (let i = 0; i < stats.statCategorized.length; i++) {
          statsPerCategory.push(<tr key={i}>
              <td>{stats.statCategorized[i].category}</td>
              <td>{stats.statCategorized[i].expense.toFixed(2)}</td>
            </tr>)
        }

        const statsAvarage = []
        statsAvarage.push(<tr>
            <td>{stats.statAvarage.avarageIncome.toFixed(2)}</td>
            <td>{stats.statAvarage.avarageExpenses.toFixed(2)}</td>
            <td>{stats.statAvarage.avarageBalance.toFixed(2)}</td>
          </tr>)

        return [statsOverall, statsPerMonth, statsPerCategory, statsAvarage]
      }
    }

    var visibleRows = []
    function filterTable() {
      visibleRows = []
      var filter = document.getElementById("table-search-input").value.toUpperCase()
      var table = document.getElementById("transactions-table");
      var tr = table.getElementsByTagName("tr");
    
      for (let i = 0; i < tr.length; i++) {
        let td_type = tr[i].getElementsByTagName("td")[1];
        let td_category = tr[i].getElementsByTagName("td")[6];
        let td_info_1 = tr[i].getElementsByTagName("td")[7];
        let td_info_2 = tr[i].getElementsByTagName("td")[8];

        if (td_type && td_category) {
          let tdTypeValue = td_type.textContent || td_type.innerText;
          let tdCategoryValue = td_category.textContent || td_category.innerText;
          let tdInfo1Value = td_info_1.textContent || td_info_1.innerText;
          let tdInfo2Value = td_info_2.textContent || td_info_2.innerText;

          if ((tdTypeValue.toUpperCase().indexOf(filter) > -1) || 
              (tdCategoryValue.toUpperCase().indexOf(filter) > -1) ||
              (tdInfo1Value.toUpperCase().indexOf(filter) > -1) ||
              (tdInfo2Value.toUpperCase().indexOf(filter) > -1))
          {
            tr[i].style.display = "";
            visibleRows.push(i);
          } else {
            tr[i].style.display = "none";
          }
        }
      }
    }

    function calculateView() {
        var viewName = document.getElementById('view-name-input').value;
        
        var xhr = new XMLHttpRequest();
        xhr.open("PATCH", 'http://localhost:8080/stat/view/' + viewName, false);
        xhr.setRequestHeader('mode', 'no-cors');
        xhr.setRequestHeader('Content-Type', 'text/plain');
        xhr.send(visibleRows.toString());
        
        window.location.assign("/stats")
    }

    function excludeRow(event) {
      let xhr = new XMLHttpRequest()
      xhr.open('PATCH', 'http://localhost:8080/transaction/' + event.target.parentNode.rowIndex, false)
      xhr.setRequestHeader('mode', 'no-cors');
      xhr.send(null)

      setTrigger(trigger + 1)
    }

    const parsedTransaction = parseTransactions(getTransactionsSynch())
    const stats = getStatsSynch()
    const parsedStats = parseStats(stats)
    const statsOverall = parsedStats[0]
    const statsAvarage = parsedStats[3]    
    const statsPerMonth = parsedStats[1]
    const statsPerCategory = parsedStats[2]

    Chart.register(ArcElement, Legend, Tooltip);
    const pieData = {     
      labels: stats.statCategorized.map(categoryItem => categoryItem.category),
      datasets: [
        {
          data: stats.statCategorized.map(categoryItem => categoryItem.expense.toFixed(2)),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],      
        },
      ],
    };
    const pieOptions = {
      plugins: {
        legend: {
          position: 'left',
          labels: {
            boxWidth: 20
          }
        }
      }   
    }

    return (
      <div className='container'>
        <div className="item-all">
          <input type='text' id='table-search-input' onKeyUp={filterTable} placeholder='Search...' style={{ marginRight: "15px" }}/>
          <input type='text' id='view-name-input' placeholder='Enter view name...' style={{ marginRight: "15px" }}/>
          <button onClick={calculateView}>Calculate View</button>
          <br></br>
          <br></br>
          <table id="transactions-table" style={{ fontSize: "12px"}}>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Sender</th>
              <th>Receiver</th>
              <th>Description</th>
              <th>Category</th>
              <th>Additional info 1</th>
              <th>Additional info 2</th>
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
              <th>View name</th>
            </tr>
            <tbody>{statsOverall}</tbody>
          </table>
        </div>
        <div className="item-avarage">
          <table>
            <tr>
              <th>Avg. Income</th>
              <th>Avg. Expense</th>
              <th>Avg. Savings</th>
            </tr>
            <tbody>{statsAvarage}</tbody>
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
          {toogleCategorized ? <Categorized stPerCt={statsPerCategory}/> : <Pie data={pieData} options={pieOptions}/>}
        </div>
        <div>
            <button onClick={() => setToggleCategorized(!toogleCategorized)}>Click here</button>
        </div>        
      </div>
    );
}

export default Stats;