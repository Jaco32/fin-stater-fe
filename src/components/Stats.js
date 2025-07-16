import '../css/Stats.css';
import Overall from './stats/Overall';
import Categorized from './stats/Categorized';
import Avarage from './stats/Avarage';
import Monthly from './stats/Monthly';
import { getTransactionsSynch, getStatsSynch } from '../backend/stats';
import Header from './bootstrap/Header';

import { useState } from 'react';
import {
  Chart,
  ArcElement,
  Legend,
  Tooltip,
  CategoryScale,
  LinearScale,
  BarElement
} from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import Container from 'react-bootstrap/Container';

function Stats() {

    const [trigger, setTrigger] = useState(0)
    const [toogle, setToggle] = useState([false, false, false, false, false, false, false, false]);

    function parseTransactions(transactions) {
        if (transactions !== undefined) {
            const plnFormatter = new Intl.NumberFormat("pl-PL", { style: "currency", currency: "PLN" });
            const transactionsItems = []
            for (let i = 0; i < transactions.length; i++) {
                if (transactions[i].usedForCalculation === false)
                  transactionsItems.push(<tr key={i} onClick={(event) => excludeRow(event)} style={{ backgroundColor: "blueviolet"}}>
                      <td style={{whiteSpace: 'nowrap'}}>{transactions[i].date.substr(0, 10)}</td>
                      <td style={{textAlign: 'center'}}>{transactions[i].amount}</td>
                      <td style={{textAlign: 'center'}}>{transactions[i].category}</td>
                      <td>{transactions[i].description}</td>
                      <td>{transactions[i].additional_info}</td>
                      <td>{transactions[i].additional_info_2}</td>
                      <td>{transactions[i].sender}</td>
                      <td>{transactions[i].receiver}</td>
                      <td style={{whiteSpace: 'nowrap'}}>{transactions[i].type}</td>
                    </tr>);
                else {
                  transactionsItems.push(<tr key={i} onClick={(event) => excludeRow(event)}>
                      <td style={{whiteSpace: 'nowrap'}}>{transactions[i].date.substr(0, 10)}</td>
                      <td style={{textAlign: 'center'}}>{plnFormatter.format(transactions[i].amount)}</td>
                      <td style={{textAlign: 'center'}}>{transactions[i].category}</td>
                      <td>{transactions[i].description}</td>
                      <td>{transactions[i].additional_info}</td>
                      <td>{transactions[i].additional_info_2}</td>
                      <td>{transactions[i].sender}</td>
                      <td>{transactions[i].receiver}</td>
                      <td style={{whiteSpace: 'nowrap'}}>{transactions[i].type}</td>
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
        const plnFormatter = new Intl.NumberFormat("pl-PL", { style: "currency", currency: "PLN" });

        const statsOverall = []
        for (let i = 0; i < stats.stat.length; i++) {
          statsOverall.push(<tr>
            <td>{stats.stat[i].from_date.substr(0, 10)}</td>
            <td>{stats.stat[i].to.substr(0, 10)}</td>
            <td>{plnFormatter.format(stats.stat[i].income.toFixed(2))}</td>
            <td>{plnFormatter.format(-1*stats.stat[i].expenses.toFixed(2))}</td>
            <td>{plnFormatter.format(stats.stat[i].periodBalance.toFixed(2))}</td>
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
                <td>{plnFormatter.format(stats.statMonth[i].income.toFixed(2))}</td>
                <td>{plnFormatter.format(-1*stats.statMonth[i].expenses.toFixed(2))}</td>
                <td>{plnFormatter.format(stats.statMonth[i].balance.toFixed(2))}</td>
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
              <td>{plnFormatter.format(-1*stats.statCategorized[i].expense.toFixed(2))}</td>
            </tr>)
        }

        const statsAvarage = []        
        statsAvarage.push(<tr>
            <td>{plnFormatter.format(stats.statAvarage.avarageIncome.toFixed(2))}</td>
            <td>{plnFormatter.format(-1*stats.statAvarage.avarageExpenses.toFixed(2))}</td>
            <td>{plnFormatter.format(stats.statAvarage.avarageBalance.toFixed(2))}</td>
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

    Chart.register(ArcElement, Legend, Tooltip, CategoryScale, LinearScale, BarElement);

    const overallBarData = {
      labels: ['Stat'],
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

    const overallBarOptions = {
      responsive: true,
      interaction: {
        mode: 'index',
        intersect: false,
      },
    };

    const pieData = {     
      labels: stats.statCategorized.map(categoryItem => categoryItem.category),
      datasets: [
        {
          data: stats.statCategorized.map(categoryItem => categoryItem.expense.toFixed(2)),
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(75, 192, 192)',
            'rgb(53, 162, 235)',
            'rgb(255, 206, 86)',
            'rgb(153, 102, 255)',
            'rgb(255, 159, 64)',
            'brown',
            'violet',
            'lightgreen',
          ],
        },
      ],
    };
    const pieOptions = {
      canvas: {
        style: {
          width: "100px",
        }
      },
      plugins: {
        legend: {
          position: 'left',
          labels: {
            boxWidth: 20
          }
        }
      },
      aspectRatio: 1.3
    }

    const labels = stats.statMonth.map(monthItem => monthItem.monthName);
    const barData = {
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

    const barOptions = {
      responsive: true,
      interaction: {
        mode: 'index',
        intersect: false,
      },
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
        },
      },
      aspectRatio: 1.2
    };

    return (
      <>
      <Header />
        <Container className='containe mt-4 mw-100 small'>
          <div className='row me-1 ms-1'>
            <div className='col'>
              <div className='row border shadow-sm mb-3 pt-2'>
                <div className='col'>
                  <Overall stOverall={statsOverall}/>
                </div>
                <div className='col'>
                  <Bar data={overallBarData} options={overallBarOptions}/>
                </div>                
              </div>
              <div className='row border shadow-sm mb-3 pt-2'>
                <div className='col pb-2'>
                  <Categorized stPerCt={statsPerCategory}/>
                </div>
                <div className='col pb-2'>
                  <Pie data={pieData} options={pieOptions}/>
                </div>
              </div>
              <div className='row border shadow-sm mb-3 pt-2'>
                <div className='col'>
                  <Monthly stPerMonth={statsPerMonth}/>
                </div>
                <div className='col'>
                  <Bar data={barData} options={barOptions}/>
                </div>
              </div>
              <div className='row border shadow-sm pt-2'>
                <div className='col'>
                  <Avarage stAvarage={statsAvarage}/>
                </div>
              </div>
            </div>
            <div className='col overflow-scroll'>
              <input type='text' id='table-search-input' onKeyUp={filterTable} placeholder='Search...' className="me-3"/>
              <input type='text' id='view-name-input' placeholder='Enter view name...' className="me-3"/>
              <button onClick={calculateView} className="mb-3 btn btn-primary">Calculate View</button>
              <table id="transactions-table" className="table table-striped table-bordered table-hover table-sm">
                <thead class="table-primary">
                  <tr>
                    <th>Date</th>                    
                    <th>Amount</th>
                    <th>Category</th>                    
                    <th>Description</th>
                    <th>Additional info 1</th>
                    <th>Additional info 2</th>
                    <th>Sender</th>
                    <th>Receiver</th>
                    <th>Type</th>
                  </tr>
                </thead>
                <tbody>{parsedTransaction}</tbody>
              </table>
            </div>
          </div>            
        </Container>
      </>
    );
}

export default Stats;