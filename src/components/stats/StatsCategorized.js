import Header from './../Header';
import Transactions from './../Transactions';
import StatsTabs from './StatsTabs';
import { Row, Col } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { Bar } from 'react-chartjs-2';
import Categorized from './Categorized'
import { getCategorizedStatsSynch } from '../../backend/stats';
import { getCategorizedStatBarChartData } from '../../utils/charts';
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
import { useLocation } from 'react-router-dom';

function StatsCategorized() {
    console.log("StatsCategorized - entered");

    const location = useLocation(); 

    Chart.register(ArcElement, Legend, Tooltip, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title);

    const statsCategorized = getCategorizedStatsSynch([location.state.username, location.state.password]);
    const categorizedBarData = getCategorizedStatBarChartData(statsCategorized);
    const categorizedBarOptions = {
      indexAxis: 'y',
      responsive: true,
      plugins: {
        legend: {
          position: 'right',
        },
      },
    }

    return (
        <>
            <Header/>
            <StatsTabs/>
            <Container className='mw-100 mt-2 small ps-2 pe-2'>
                <Row className='border shadow-sm rounded-3 border-secondary ms-0 me-0' style={{ overflow: 'hidden' }}>
                    <Col className='ps-0 pe-0'>
                      <Categorized stPerCt={statsCategorized}/>
                    </Col>
                    <Col className='col-sm-7'>
                      {Object.keys(categorizedBarData).length !== 0 ? <Bar data={categorizedBarData} options={categorizedBarOptions}/> : <h3>Categorized</h3>}
                    </Col>
                </Row>
            </Container>
            <Transactions/>
        </>
    )
}

export default StatsCategorized;