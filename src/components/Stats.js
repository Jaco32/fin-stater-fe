import Header from './bootstrap/Header';
import Overall from './stats/Overall';
import Categorized from './stats/Categorized';
import Monthly from './stats/Monthly';

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
import { useLocation } from 'react-router-dom';

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
    console.log("Stats - Rendering - entered");

    const [transactionExclusionTrigger, setTransactionExclusion] = useState(false)
    const [isCollapse, setIsCollapse] = useState(false)
    
    const [dateFilters, setDateFilters] = useState(new Map())
    console.log("Stats - Rendering - current dateFilters:");
    for (const f of dateFilters.entries()) console.log(f);
    
    const [transactionTypeFilter, setTransactionTypeFilter] = useState("")
    const [textFilters, setTextFilters] = useState(new Map())
    const [subCatFilter, setSubCatFilter] = useState(new Map())

    const transactionsTableRef = useRef(null);
    const transactionColRef = useRef(null);
    const lastStatColRow = useRef(null);

    const callingLocation = useLocation()

    useEffect(() => {
      console.log("Stats - useEffect - entering");

      if (!isCollapse) transactionColRef.current.style.height = (lastStatColRow.current.offsetHeight*3).toString() + 'px';

      const transactionRows = transactionsTableRef.current.getElementsByTagName("tr");
      console.log("Stats - useEffect - number of transaction rows: " + transactionRows.length);
      for (let i = 1; i <= transactionRows.length; i++) visibleRows.push(i);
      filterTableByDate()
      filterTableByTransactionType()
      //filterColumnByTextWithCondition()
      //filterSubcategoryColumnByText()
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

    function addDateFilter() {
      console.log("Stats - addDateFilter - entered");

      const dateFrom = new Date(document.getElementById("table-search-date-from").value)
      const dateTo = new Date(document.getElementById("table-search-date-to").value)
      console.log("Stats - addDateFilter - dateFrom: " + dateFrom + ", dateTo: " + dateTo);
      console.log("Stats - addDateFilter - current dateFilters:");

      for (const dateFilter of dateFilters.entries()) console.log(dateFilter);
      const newFilters = new Map();
      newFilters.set("Date Filter 1", [dateFrom, dateTo]);
      setDateFilters(newFilters);
    }

    function addTransactionTypeFilter(id) {
      console.log("Stats - addTransactionTypeFilter - entered, id: " + id);
      if (document.getElementById(id).checked) setTransactionTypeFilter(id);
      else setTransactionTypeFilter(""); 
    }

    function filterTableByDate() {
      console.log("Stats - filterTableByDate - entered");

      dateFilters.forEach((v,k) => {
        const dateFrom = v[0];
        const dateTo = v[1];
        const tr = document.getElementById("transactions-table").getElementsByTagName("tr");
        let indexesToDrop = []
        for (let i = 0; i < visibleRows.length; i++) {
          const tdDate = new Date(tr[visibleRows[i]].getElementsByTagName("td")[0].textContent);
          if((tdDate >= dateFrom) && (tdDate <= dateTo))
            tr[visibleRows[i]].style.display = "";
          else {
            tr[visibleRows[i]].style.display = "none";
            indexesToDrop.push(i)
          }
        }

        console.log("Stats - filterTableByDate - indexesToDrop: " + indexesToDrop)
        visibleRows = visibleRows.filter(it => !indexesToDrop.includes(it))
        console.log("Stats - filterTableByDate - visibleRows count after filter:" + visibleRows.length)
      })
    }

    function addColumnFilter() {
      const filterText = document.getElementById("search-box-ad-info").value.toUpperCase()
      const searchType = document.getElementById("drop-down-search-type-ad-info-1").options.selectedIndex;
      setTextFilters(new Map(textFilters.set(crypto.randomUUID(), [filterText, searchType])))
    }

    function filterColumnByTextWithCondition() {
      textFilters.forEach((v,k) => {
        const filterText = v[0];
        const searchType = v[1];
        const tr = document.getElementById("transactions-table").getElementsByTagName("tr");
        
        let indexesToDrop = []
        console.log("Iterating through " + visibleRows.length + " elements of visibleRows")
        for (let i = 0; i < visibleRows.length; i++) {
          const idx = visibleRows[i]
          const td_info_1 = tr[idx].getElementsByTagName("td")[5];

          if (td_info_1) {
            const tdInfo1Value = td_info_1.textContent || td_info_1.innerText;

            if ((tdInfo1Value.length > 0) && (tdInfo1Value.toUpperCase().indexOf(filterText) > -1)) {
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
      })
    }

    function addSubcategoryColumnFilter() {
      const filterText = "ZAMAWIANE";
      textFilters.clear();
      setSubCatFilter(new Map(subCatFilter.set(crypto.randomUUID(), [filterText])))
    }

    function filterSubcategoryColumnByText(event) {
      subCatFilter.forEach((v,k) => {
        const filterText = v[0];
        const tr = document.getElementById("transactions-table").getElementsByTagName("tr");
        
        let indexesToDrop = []
        for (let i = 0; i < visibleRows.length; i++) {
          const idx = visibleRows[i]
          const td = tr[idx].getElementsByTagName("td")[3];
          if (td) {
            const tdValue = td.textContent || td.innerText;
            if (tdValue.toUpperCase().indexOf(filterText) === -1){
              tr[idx].style.display = "none";
              indexesToDrop.push(idx)
            }
          }
        }
        visibleRows = visibleRows.filter(it => !indexesToDrop.includes(it))
      })
    }

    function filterTableByTransactionType() {
      console.log("Stats - filterTableByTransactionType - entered");

      const tr = document.getElementById("transactions-table").getElementsByTagName("tr");
      let indexesToDrop = []
      for (let i = 0; i < visibleRows.length; i++) {
        const tdAmount = parseFloat(tr[visibleRows[i]].getElementsByTagName("td")[1].textContent.split(' ')[0].replace(",", "."));
        if (transactionTypeFilter === "radio-income" && (tdAmount < 0)) {
            tr[visibleRows[i]].style.display = "none";
            indexesToDrop.push(i);
        }
        else if (transactionTypeFilter === "radio-expenses" && (tdAmount > 0)) {
            tr[visibleRows[i]].style.display = "none";
            indexesToDrop.push(i);
        }
      }

      console.log("Stats - filterTableByTransactionType - indexesToDrop: " + indexesToDrop)
      visibleRows = visibleRows.filter(it => !indexesToDrop.includes(it))
      console.log("Stats - filterTableByTransactionType - visibleRows count after filter:" + visibleRows.length)
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

    function excludeTransactionFromStats() {
      const dBTransactionsTableId = rawTransactions[window.event.target.parentNode.rowIndex-1].id
      const urlPart = "/transaction/toogleforstats/" + dBTransactionsTableId
      console.log("Sending '" + urlPart + "'")
      let xhr = new XMLHttpRequest()
      xhr.open('PATCH', process.env.REACT_APP_BACKEND_URL + urlPart, false)
      xhr.setRequestHeader('mode', 'no-cors');
      xhr.send(null)

      setTransactionExclusion((prev) => !prev)
    }

    const rawTransactions = getTransactionsSynch(callingLocation)
    const parsedTransactions = parseTransactions(rawTransactions, excludeTransactionFromStats)
    const stats = getStatsSynch()
    const statsOverall = parseOverallStats(stats.stat)

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
      <Container className='container ms-2 mt-2 mw-100 small'>
        <Row>
          <Col className={`collapse ${isCollapse ? "" : "show"}`} id='statsCol'>
            <Row className='border shadow-sm rounded-3 border-secondary' style={{ overflow: 'hidden' }}>
              <Overall stOverall={statsOverall}/>
              {Object.keys(overallBarData).length !== 0 ? <Bar data={overallBarData} options={overallBarOptions}/> : <h3>Overall</h3>}
            </Row>
            <Row className='border shadow-sm rounded-3 border-secondary mt-2' style={{ overflow: 'hidden' }}>
              <Categorized stPerCt={stats.statCategorized}/>
              {Object.keys(categorizedBarData).length !== 0 ? <Bar data={categorizedBarData} options={categorizedBarOptions}/> : <h3>Categorized</h3>}
            </Row>
            <Row className='border shadow-sm rounded-3 border-secondary mt-2' style={{ overflow: 'hidden' }}>
                <Monthly stPerMonth={stats.statMonth}/>
                {Object.keys(monthlyStatBarChartData).length !== 0 ? <Bar data={monthlyStatBarChartData} options={monthlyStatBarChartOptions}/> : <h3>Monthly Bar</h3>}
            </Row>
            <Row className='border shadow-sm mt-2' ref={lastStatColRow}>
              {Object.keys(monthlyStatLineChartData).length !== 0 ? <Line data={monthlyStatLineChartData} options={monthlyStatLineChartOptions}/> : <h3>Monthly Line</h3>}
            </Row>
          </Col>
          <Col className='border shadow-sm rounded-3 ms-2' ref={transactionColRef} style={{ minWidth: 0, flexDirection: "column", display: "flex" }}>
            <Row className='mt-2'>
              <Col>
                <Button
                  className='btn-sm rounded-circle'
                  variant='outline-primary'
                  onClick={() => setIsCollapse(!isCollapse)}
                  aria-expanded={isCollapse}
                  aria-controls="statsCol">
                    &#11160;
                </Button>
              </Col>
            </Row>
            <Row className="mt-2">
              <Col>
                <form>
                  <div className='input-group input-group-sm'>
                    <input type='text' className="form-control form-control-sm" id='view-name-input' placeholder='Podaj nazwę widoku...'/>
                    <button onClick={calculateView} className="btn btn-primary btn-sm">Stwórz widok</button>
                  </div>
                </form>
              </Col>
            </Row>
            <Row className='mt-2'>
              <Col>
                <form>
                  <div class="input-group input-group-sm">
                    <span class="input-group-text">&#128269;</span>
                    <input
                      type='text'
                      className="form-control form-control-sm"
                      id='table-search-input'
                      onKeyUp={filterTableByText}
                      placeholder='Szukaj...'
                    />
                  </div>
                </form>
              </Col>
              <Col>
                <form>
                  <div className='input-group input-group-sm'>
                    <input type="date" className='form-control form-control-sm' id="table-search-date-from"/>
                    <input type="date" className='form-control form-control-sm' id="table-search-date-to"/>
                    <button onClick={addDateFilter} className="btn btn-primary btn-sm">Filtruj</button>
                  </div>
                </form>
              </Col>
            </Row>
            <Row>
                {Array.from(dateFilters, ([key, value]) => (
                  <span>
                    {value[0].toLocaleDateString()} - {value[1].toLocaleDateString()}
                    <button type="button" class="btn-close"></button>
                  </span>
                ))}
            </Row>
            <Row className='mt-2 mb-2'>
              <form>
                <div className='input-group input-group-sm'>
                  <div className='input-group-text'>
                    <input type="radio" name="tansaction-type-form" id="radio-all" onChange={() => addTransactionTypeFilter("radio-all")}/>
                  </div>
                  <label className='form-control form-check-label me-3'>Wszystkie</label>
                  <div className='input-group-text'>
                    <input type="radio" name="tansaction-type-form" id="radio-income" onChange={() => addTransactionTypeFilter("radio-income")}/>
                  </div>
                  <label className='form-control form-check-label me-3'>Przychody</label>
                  <div className='input-group-text'>
                    <input type="radio" name="tansaction-type-form" id="radio-expenses" onChange={() => addTransactionTypeFilter("radio-expenses")}/>
                  </div>
                  <label className='form-control form-check-label me-3'>Wydatki</label>
                  <div className='input-group-text'>
                    <input type="radio" name="tansaction-type-form" id="radio-excluded" onChange={() => addTransactionTypeFilter("radio-excluded")}/>
                  </div>
                  <label className='form-control form-check-label me-3'>Nie uwzględniane</label>
                </div>
              </form>
            </Row>
            <Row className='overflow-y-auto border rounded-3'>
              <table id="transactions-table" className="table table-hover table-sm">
                <thead className="table-primary">
                  <tr style={{ position: 'sticky', top: 0, fontSize: '12px' }}>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Category</th>
                    <th>
                      Subcategory
                      <select id="drop-down-subcategory">
                        <option>Zamawiane</option>
                      </select>
                    <button className="btn btn-primary btn-sm" onClick={addSubcategoryColumnFilter}>Filter</button>
                    </th>
                    <th>
                      Description
                      <input
                        className='form-control form-control-sm'
                        id="column-search-input-desc"
                        type="text"
                        placeholder='Search...'
                        onKeyUp={event => filterColumnByText(event)}
                      />
                    </th>
                    <th>
                      Additional info 1
                      <input className='form-control form-control-sm' type="text" id="search-box-ad-info" placeholder='Search...'/>
                      <select id="drop-down-search-type-ad-info-1">
                        <option>contains</option>
                        <option>doesn't contain</option>
                      </select>
                      <button className="btn btn-primary btn-sm" onClick={addColumnFilter}>Filter</button>
                    </th>
                    <th>Additional info 2</th>
                    <th>
                      Sender
                      <input
                        className='form-control form-control-sm'
                        id="column-search-input-sender"
                        type="text"
                        placeholder='Search...'
                        onKeyUp={event => filterColumnByText(event)}
                      />
                    </th>
                    <th>Receiver</th>
                    <th>Type</th>
                  </tr>
                </thead>
                <tbody ref={transactionsTableRef} style={{ fontSize: '12px' }}>
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