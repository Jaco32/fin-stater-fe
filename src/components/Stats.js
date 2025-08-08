import Header from './bootstrap/Header';
import Overall from './stats/Overall';
import Categorized from './stats/Categorized';
import Monthly from './stats/Monthly';
import Avarage from './stats/Avarage';
import { getTransactionsSynch, getStatsSynch } from '../backend/stats';
import {
  parseTransactions,
  parseCategorizedStats,
  parseAvarageStats,
  parseOverallStats,
  mapCategories
} from '../utils/parse';
import { useState, useRef, useEffect } from 'react';
import {
  Chart,
  Legend,
  Tooltip,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title
} from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import Container from 'react-bootstrap/Container';

function Stats()
{
    const [trigger, setTrigger] = useState(0)
    const [toogle, setToggle] = useState([]);
    const transactionsTableRef = useRef(null);
    const transactionColRef = useRef(null);
    const statsColRef = useRef(null);

    useEffect(() => {
      transactionColRef.current.style.height = statsColRef.current.offsetHeight.toString() + 'px';

      const transactionRows = transactionsTableRef.current.getElementsByTagName("tr");
      for(const transactionRow of transactionRows) {
        transactionRow.addEventListener("click", (event) => excludeRow(event))
      }
    })

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

              monthlyStatsTBody.push(
              <>
                  <tr id={i} key={i} onClick={(event) => toogleMonthlyCategorized(event)}>
                      <td>{monthlyStats[i].monthName}</td>
                      <td>{plnFormatter.format(monthlyStats[i].income.toFixed(2))}</td>
                      <td>{plnFormatter.format(-1*monthlyStats[i].expenses.toFixed(2))}</td>
                      <td>{plnFormatter.format(monthlyStats[i].balance.toFixed(2))}</td>
                      <td>{monthlyStats[i].rateOfReturn.toFixed(0)} %</td>
                  </tr>
                  {toogle[i] &&
                  (<tr>
                      <td colSpan={5} style={{ padding: "0px"}}>
                          <table className="table table-sm">
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

    const parsedTransactions = parseTransactions(getTransactionsSynch())
    const stats = getStatsSynch()
    const statsPerMonth = parseMonthlyStats(stats.statMonth)
    const statsOverall = parseOverallStats(stats.stat)
    const statsAvarage = parseAvarageStats(stats.statAvarage)
    const statsPerCategory = parseCategorizedStats(stats.statCategorized)

    Chart.register(ArcElement, Legend, Tooltip, CategoryScale, LinearScale, BarElement, Title);

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

    const categorizedBarOptions = {
      indexAxis: 'y',
      responsive: true,
      plugins: {
        legend: {
          position: 'right',
        },
        title: {
          display: true,
          text: 'Chart.js Horizontal Bar Chart',
        },
      },
    }
    const categorizedBarLabels = stats.statCategorized.map(categoryItem => categoryItem.category);
    const categorizedBarData = {
      labels: categorizedBarLabels,
      datasets: [
        {
          label: 'Dataset 1',
          data: stats.statCategorized.map(categoryItem => -1*categoryItem.expense.toFixed(2)),
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ]
    }

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
          <div className='col' ref={statsColRef}>
            <div className='row border shadow-sm mb-3 pt-2'>
              <Overall stOverall={statsOverall}/>
              <Bar data={overallBarData} options={overallBarOptions}/>
            </div>
            <div className='row border shadow-sm mb-3 pt-2'>
              <div className='col pb-2'>
                <Categorized stPerCt={statsPerCategory}/>
              </div>
              <div className='col pb-2'>
                <Bar data={categorizedBarData} options={categorizedBarOptions}/>
              </div>
            </div>
            <div className='row border shadow-sm mb-3 pt-2'>
                <Monthly stPerMonth={statsPerMonth}/>
                <Bar data={barData} options={barOptions}/>
            </div>
            <div className='row border shadow-sm pt-2'>
                <Avarage stAvarage={statsAvarage}/>
            </div>
          </div>
          <div className='col overflow-scroll border shadow-sm ms-2' ref={transactionColRef}>
            <div className='row mt-3 mb-3'>
              <div className='col'>
                <input type='text' className="form-control" id='table-search-input' onKeyUp={filterTable} placeholder='Search...'/>
              </div>
              <div className='col'>
                <input type='text' className="form-control" id='view-name-input' placeholder='Enter view name...'/>
              </div>
              <div className='col'>
                <button onClick={calculateView} className="btn btn-primary">Calculate View</button>
              </div>
            </div>
            <table id="transactions-table" className="table table-striped table-bordered table-hover table-sm">
              <thead className="table-primary">
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
              <tbody ref={transactionsTableRef}>
                {parsedTransactions}
              </tbody>
            </table>
          </div>
        </div>            
      </Container>
      </>
    );
}

export default Stats;