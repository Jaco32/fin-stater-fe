import Header from './bootstrap/Header';
import Overall from './stats/Overall';
import Categorized from './stats/Categorized';
import Monthly from './stats/Monthly';
import Avarage from './stats/Avarage';
import { getTransactionsSynch, getStatsSynch } from '../backend/stats';
import {
  parseTransactions,
  parseAvarageStats,
  parseOverallStats,
} from '../utils/parse';
import {
  getOverallStatBarChartData,
  getCategorizedStatBarChartData,
  getMonthlyStatBarChartData,
  getMonthlyStatLineChartData
} from '../utils/charts';
import { useState, useRef, useEffect } from 'react';
import {
  Chart,
  Legend,
  Tooltip,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

function Stats()
{
    console.log("Rendering - Stats");

    const [transactionExclusionTrigger, setTransactionExclusion] = useState(false)
    const [firstRender, setFirstRender] = useState(true)
    const [isCollapse, setIsCollapse] = useState(false)

    const transactionsTableRef = useRef(null);
    const transactionColRef = useRef(null);
    const lastStatColRow = useRef(null);

    useEffect(() => {
      console.log("Stats component - calling useEffect");
      if (!isCollapse) transactionColRef.current.style.height = (lastStatColRow.current.offsetHeight*3).toString() + 'px';

      if(firstRender) {
        const transactionRows = transactionsTableRef.current.getElementsByTagName("tr");
        for(const transactionRow of transactionRows) {
          transactionRow.addEventListener("click", (event) => excludeTransactionFromStats(event))
        }
        setFirstRender((prev) => !prev)
      }
    })

    var visibleRows = []
    function filterTableByText() {
      visibleRows = []
      const filter = document.getElementById("table-search-input").value.toUpperCase()
      const table = document.getElementById("transactions-table");
      const tr = table.getElementsByTagName("tr");
    
      for (let i = 1; i < tr.length; i++) {
        const td_category = tr[i].getElementsByTagName("td")[2];
        const td_info_1 = tr[i].getElementsByTagName("td")[4];
        const td_info_2 = tr[i].getElementsByTagName("td")[5];

        if (td_category && td_info_1 && td_info_2) {
          const tdCategoryValue = td_category.textContent || td_category.innerText;
          const tdInfo1Value = td_info_1.textContent || td_info_1.innerText;
          const tdInfo2Value = td_info_2.textContent || td_info_2.innerText;

          if ((tdCategoryValue.toUpperCase().indexOf(filter) > -1) ||
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

    function filterColumnByText(event) {
      const filter = document.getElementById(event.target.id).value.toUpperCase()
      const tr = document.getElementById("transactions-table").getElementsByTagName("tr");
    
      let indexesToDrop = []
      for (let i = 0; i < visibleRows.length; i++) {
        const idx = visibleRows[i]
        const td = tr[idx].getElementsByTagName("td")[event.target.parentNode.cellIndex];
        if (td) {
          const tdValue = td.textContent || td.innerText;
          if (tdValue.toUpperCase().indexOf(filter) === -1){
            tr[idx].style.display = "none";
            indexesToDrop.push(idx)
          }
        }
      }
      visibleRows = visibleRows.filter(it => !indexesToDrop.includes(it))
    }

    function filterTableByDate() {
      const dateFrom = new Date(document.getElementById("table-search-date-from").value)
      const dateTo = new Date(document.getElementById("table-search-date-to").value)
      const tr = document.getElementById("transactions-table").getElementsByTagName("tr");
      
      visibleRows = []
      for (let i = 1; i < tr.length; i++) {
        const tdDate = new Date(tr[i].getElementsByTagName("td")[0].textContent);
        if((tdDate >= dateFrom) && (tdDate <= dateTo)) {
          tr[i].style.display = "";
          visibleRows.push(i);
        }
        else {
          tr[i].style.display = "none";
        }
      }
      console.log("visibleRows count:" + visibleRows.length)
    }

    function filterTableByTransactionType() {
      const allRadio = document.getElementById("radio-all").checked;
      const incomeRadio = document.getElementById("radio-income").checked;
      const expensesRadio = document.getElementById("radio-expenses").checked;
      const tr = document.getElementById("transactions-table").getElementsByTagName("tr");
      
      visibleRows = []
      for (let i = 1; i < tr.length; i++) {
        const tdAmount = parseFloat(tr[i].getElementsByTagName("td")[1].textContent.split(' ')[0].replace(",", "."));
        if (!allRadio)
          if (incomeRadio && (tdAmount > 0)) {
            tr[i].style.display = "";
            visibleRows.push(i);
          }
          else if (expensesRadio && (tdAmount < 0)) {
            tr[i].style.display = "";
            visibleRows.push(i);
          }
          else tr[i].style.display = "none";
        else tr[i].style.display = "";
      }
    }

    function filterColumnByTextWithCondition() {
      const filter = document.getElementById("search-box-ad-info").value.toUpperCase()
      const tr = document.getElementById("transactions-table").getElementsByTagName("tr");
      var searchType = document.getElementById("drop-down-search-type-ad-info-1").options.selectedIndex;

      let indexesToDrop = []
      console.log("Iterating through " + visibleRows.length + " elements of visibleRows")
      for (let i = 0; i < visibleRows.length; i++) {
        const idx = visibleRows[i]
        const td_info_1 = tr[idx].getElementsByTagName("td")[5];

        if (td_info_1) {
          const tdInfo1Value = td_info_1.textContent || td_info_1.innerText;

          if ((tdInfo1Value.length > 0) && (tdInfo1Value.toUpperCase().indexOf(filter) > -1)) {
            if (searchType !== 0) {
              tr[idx].style.display = "none";
              indexesToDrop.push(idx)
            }
          } else {
            if (searchType === 0) {
              tr[idx].style.display = "none";
              indexesToDrop.push(idx)
            }
          }
        }
      }
      console.log("indexesToDrop:" + indexesToDrop)
      visibleRows = visibleRows.filter(it => !indexesToDrop.includes(it))
      console.log("visibleRows count after filter:" + visibleRows.length)
    }

    function filterExcludedTransactions() {
      visibleRows = []
      const tr = document.getElementById("transactions-table").getElementsByTagName("tr");
      for (let i = 1; i < tr.length; i++) {
        console.log(tr[i].className)
        if (tr[i].className === 'table-danger') {
          tr[i].style.display = "";
          visibleRows.push(i);
        }
        else tr[i].style.display = "none";
      }
    }

    function calculateView() {
        var viewName = document.getElementById('view-name-input').value;
        
        var xhr = new XMLHttpRequest();
        xhr.open("PATCH", process.env.REACT_APP_BACKEND_URL + '/stat/view/' + viewName, false);
        xhr.setRequestHeader('mode', 'no-cors');
        xhr.setRequestHeader('Content-Type', 'text/plain');
        const visibleDbIds = visibleRows.map(i => rawTransactions[i-1].id);
        console.log("Sending view req for ids " + visibleDbIds)
        xhr.send(visibleDbIds.toString());
        
        window.location.assign("/stats")
    }

    function excludeTransactionFromStats(event) {
      const dBTransactionsTableId = rawTransactions[event.target.parentNode.rowIndex-1].id
      const urlPart = "/transaction/toogleforstats/" + dBTransactionsTableId
      console.log("Sending '" + urlPart + "'")
      let xhr = new XMLHttpRequest()
      xhr.open('PATCH', process.env.REACT_APP_BACKEND_URL + urlPart, false)
      xhr.setRequestHeader('mode', 'no-cors');
      xhr.send(null)

      setTransactionExclusion((prev) => !prev)
    }

    const rawTransactions = getTransactionsSynch()
    const parsedTransactions = parseTransactions(rawTransactions)
    const stats = getStatsSynch()
    const statsOverall = parseOverallStats(stats.stat)
    const statsAvarage = parseAvarageStats(stats.statAvarage)

    Chart.register(ArcElement, Legend, Tooltip, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title);

    const overallBarData = getOverallStatBarChartData(stats)
    const overallBarOptions = {
      responsive: true,
      interaction: {
        mode: 'index',
        intersect: false,
      },
    };

    const categorizedBarData = getCategorizedStatBarChartData(stats)
    const categorizedBarOptions = {
      indexAxis: 'y',
      responsive: true,
      plugins: {
        legend: {
          position: 'right',
        },
      },
    }

    const monthlyStatBarChartData = getMonthlyStatBarChartData(stats)
    const monthlyStatBarChartOptions = {
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

    const monthlyStatLineChartData = getMonthlyStatLineChartData(stats)
    const monthlyStatLineChartOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Chart.js Line Chart',
        },
      },
    };

    return (
      <>
      <Header />
      <Container className='container mt-4 mw-100 small'>
        <Row>
          <Col className={`collapse ${isCollapse ? "" : "show"}`} id='statsCol'>
            <Row className='border shadow-sm mb-3 pt-2'>
              <Overall stOverall={statsOverall}/>
              {Object.keys(overallBarData).length !== 0 ? <Bar data={overallBarData} options={overallBarOptions}/> : <h1>Overall</h1>}
            </Row>
            <Row className='border shadow-sm pt-2'>
                <Avarage stAvarage={statsAvarage}/>
            </Row>
            <Row className='border shadow-sm mb-3 pt-2'>
              <Categorized stPerCt={stats.statCategorized}/>
              {Object.keys(categorizedBarData).length !== 0 ? <Bar data={categorizedBarData} options={categorizedBarOptions}/> : <h1>Categorized</h1>}
            </Row>
            <Row className='border shadow-sm mb-3 pt-2'>
                <Monthly stPerMonth={stats.statMonth}/>
                {Object.keys(monthlyStatBarChartData).length !== 0 ? <Bar data={monthlyStatBarChartData} options={monthlyStatBarChartOptions}/> : <h1>Monthly Bar</h1>}
            </Row>
            <Row className='border shadow-sm mb-3 pt-2' ref={lastStatColRow}>
              {Object.keys(monthlyStatLineChartData).length !== 0 ? <Line data={monthlyStatLineChartData} options={monthlyStatLineChartOptions}/> : <h1>Monthly Line</h1>}
            </Row>
          </Col>
          <Col className='border shadow-sm ms-2' ref={transactionColRef} style={{ minWidth: 0, flexDirection: "column", display: "flex" }}>
            <Row className='mt-3'>
              <Col>
                <Button variant='primary' onClick={() => setIsCollapse(!isCollapse)} aria-expanded={isCollapse} aria-controls="statsCol">&lt; &lt;</Button>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col>
                <input type='text' className="form-control" id='view-name-input' placeholder='Enter view name...'/>
              </Col>
              <Col>
                <button onClick={calculateView} className="btn btn-primary">Calculate View</button>
              </Col>
            </Row>
            <Row className='mt-3'>
              <Col>
                <input type='text' className="form-control" id='table-search-input' onKeyUp={filterTableByText} placeholder='Search...'/>
              </Col>
            </Row>
            <Row className='mt-3'>
              <Col>
                <input type="date" className='form-control' id="table-search-date-from"></input>
              </Col>
              <Col>
                <input type="date" className='form-control' id="table-search-date-to"></input>
              </Col>
              <Col>
                <button onClick={filterTableByDate} className="btn btn-primary">Filter</button>
              </Col>
            </Row>
            <Row className='mt-3 mb-3'>
              <form>
                <input className="form-check-input me-1" type="radio" name="tansaction-type-form" id="radio-all" onChange={filterTableByTransactionType}/>
                <label className='form-check-label me-3'>All</label>
                <input className="form-check-input me-1" type="radio" name="tansaction-type-form" id="radio-income" onChange={filterTableByTransactionType}/>
                <label className='form-check-label me-3'>Income</label>
                <input className="form-check-input me-1" type="radio" name="tansaction-type-form" id="radio-expenses" onChange={filterTableByTransactionType}/>
                <label className='form-check-label me-3'>Expenses</label>
                <input className="form-check-input me-1" type="radio" name="tansaction-type-form" id="radio-excluded" onChange={filterExcludedTransactions}/>
                <label className='form-check-label me-3'>Excluded</label>
              </form>
            </Row>
            <Row className='overflow-y-auto'>
              <table id="transactions-table" className="table table-bordered table-hover table-sm">
                <thead className="table-primary">
                  <tr style={{ position: 'sticky', top: 0 }}>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Category</th>
                    <th>
                      Subcategory
                      <input id="column-search-input-subcat" type="text" placeholder='Search...' onKeyUp={event => filterColumnByText(event)}/>
                    </th>
                    <th>
                      Description
                      <input id="column-search-input-desc" type="text" placeholder='Search...' onKeyUp={event => filterColumnByText(event)}/>
                    </th>
                    <th>
                      Additional info 1
                      <input type="text" id="search-box-ad-info" placeholder='Search...'/>
                      <select id="drop-down-search-type-ad-info-1">
                        <option>contains</option>
                        <option>doesn't contain</option>
                      </select>
                      <input type="submit" value="Filter" onClick={filterColumnByTextWithCondition}/>
                    </th>
                    <th>Additional info 2</th>
                    <th>
                      Sender
                      <input id="column-search-input-sender" type="text" placeholder='Search...' onKeyUp={event => filterColumnByText(event)}/>
                    </th>
                    <th>Receiver</th>
                    <th>Type</th>
                  </tr>
                </thead>
                <tbody ref={transactionsTableRef}>
                  {parsedTransactions}
                </tbody>
              </table>
            </Row>
          </Col>
        </Row>
      </Container>
      </>
    );
}

export default Stats;