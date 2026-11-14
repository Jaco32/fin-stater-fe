import Container from 'react-bootstrap/Container';
import { useState, useRef, useEffect } from 'react';
import { getTransactionsSynch } from '../backend/stats';
import { parseTransactions } from '../utils/parse';
import { useLocation, useNavigate } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

function Transactions() {
    console.log('Transactions - entered')

    const [dateFilters, setDateFilters] = useState(new Map())
    console.log("Transactions - current dateFilters:");
    for (const f of dateFilters.entries()) console.log(f);

    const [transactionExclusionTrigger, setTransactionExclusion] = useState(false);    
    const location = useLocation();
    const transactionsTableRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
      console.log("Transactions - useEffect - entering");

      const transactionRows = transactionsTableRef.current.getElementsByTagName("tr");
      console.log("Transactions - useEffect - number of transaction rows: " + transactionRows.length);
      for (let i = 0; i < transactionRows.length; i++)
        visibleRows.push(i);
      filterTableByDate()
    })

    function filterTableByDate() {
      console.log("Transactions - filterTableByDate - entered");

      dateFilters.forEach((v,k) => {
        const dateFrom = v[0];
        const dateTo = v[1];
        const tr = transactionsTableRef.current.getElementsByTagName("tr");
        let indexesToDrop = []
        for (let i = 0; i < visibleRows.length; i++) {
          const tdDate = new Date(tr[i].getElementsByTagName("td")[0].textContent);
          if( !((tdDate >= dateFrom) && (tdDate <= dateTo))) {
            tr[i].style.display = "none";
            indexesToDrop.push(i)
          }
        }

        console.log("Transactions - filterTableByDate - number of indexesToDrop: " + indexesToDrop.length)
        visibleRows = visibleRows.filter(it => !indexesToDrop.includes(it))
        console.log("Transactions - filterTableByDate - visibleRows count after filter:" + visibleRows.length)
      })
    }

    function calculateView() {
        window.event.preventDefault();

        var xhr = new XMLHttpRequest();
        var viewName = document.getElementById('view-name-input').value;
        xhr.open("PATCH", process.env.REACT_APP_BACKEND_URL + '/stat/view/' + viewName, false);
        xhr.setRequestHeader('Content-Type', 'text/plain');
        const visibleDbIds = visibleRows.map(i => rawTransactions[i].id);
        xhr.send(visibleDbIds.toString());
        
        navigate('/overall', {
            state: {
                username: location.state.username,
                password: location.state.password
            },
            replace: true
        })
    }

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

    function addDateFilter() {
      console.log("Transactions - addDateFilter - entered");

      window.event.preventDefault();

      console.log("Transactions - addDateFilter - current dateFilters:");
      for (const dateFilter of dateFilters.entries()) console.log(dateFilter);

      const dateFrom = new Date(document.getElementById("table-search-date-from").value)
      const dateTo = new Date(document.getElementById("table-search-date-to").value)
      console.log("Transactions - addDateFilter - dateFrom: " + dateFrom + ", dateTo: " + dateTo);

      const newFilters = new Map();
      newFilters.set("Date Filter 1", [dateFrom, dateTo]);
      setDateFilters(newFilters);
    }

    function excludeTransactionFromStats() {
      const dBTransactionsTableId = rawTransactions[window.event.target.parentNode.rowIndex-1].id
      const urlPart = "/transaction/toogleforstats/" + dBTransactionsTableId
      console.log("Sending '" + urlPart + "'")
      let xhr = new XMLHttpRequest()
      xhr.open('PATCH', process.env.REACT_APP_BACKEND_URL + urlPart, false)
      xhr.send(null)

      setTransactionExclusion((prev) => !prev)
    }

    const rawTransactions = getTransactionsSynch([location.state.username, location.state.password])
    const parsedTransactions = parseTransactions(rawTransactions, excludeTransactionFromStats)

    return (
      <Container className='mt-2 mw-100 small'>      
        <Row>
          <Col className='border shadow-sm rounded-3 border-secondary ms-2 me-2' style={{ minWidth: 0, flexDirection: "column", display: "flex" }}>
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
                  <div className="input-group input-group-sm">
                    <span className="input-group-text">&#128269;</span>
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
            <Row className='mt-2 mb-2'>
              <Col>
                <select className='form-select form-select-sm'>
                    <option>Wszystkie</option>
                    <option>Przychody</option>
                    <option>Wydatki</option>
                    <option>Nie uwzględniane</option>
                </select>
              </Col>
              <Col>
                <select className='form-select form-select-sm'>
                    <option>Jedzenie</option>
                </select>
              </Col>
              <Col>
                <select className='form-select form-select-sm'>
                    <option>Zamawiane</option>
                </select>
              </Col>
              <Col>
                <select className='form-select form-select-sm'>
                    <option>Płatność kartą</option>
                </select>
              </Col> 
            </Row>
            <Row className='overflow-y-auto border rounded-3 border-secondary'>
              <table id="transactions-table" className="table table-hover table-sm">
                <thead className="table-primary">
                  <tr style={{ position: 'sticky', top: 0, fontSize: '12px' }}>
                    <th>Data</th>
                    <th>Kwota</th>
                    <th>Kategoria</th>
                    <th>Podkategoria</th>
                    <th>Opis 1</th>
                    <th>Opis 2</th>
                    <th>Opis 3</th>
                    <th>Nadawca</th>
                    <th>Odbiorca</th>
                    <th>Typ</th>
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
    )
}

export default Transactions;