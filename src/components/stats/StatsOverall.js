import Container from 'react-bootstrap/Container';
import { Row, Col } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import Header from './../Header';
import Transactions from './../Transactions';
import StatsTabs from './StatsTabs';
import Overall from './Overall'
import { getOverallStatsSynch } from '../../backend/stats';
import { parseOverallStats } from '../../utils/parse';
import { getOverallStatBarChartData } from '../../utils/charts';
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

function StatsOverall() {
    console.log("StatsOverall - entered")

    const location = useLocation(); 

    Chart.register(ArcElement, Legend, Tooltip, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title);

    const statsOverall = getOverallStatsSynch([location.state.username, location.state.password]);
    const parsedStatsOverall = parseOverallStats(statsOverall)
    const overallBarData = getOverallStatBarChartData(statsOverall)
    const overallBarOptions = {
      responsive: true,
      interaction: {
        mode: 'index',
        intersect: false,
      },
    };

    return (
        <>
            <Header/>
            <StatsTabs/>
            <Container className='mw-100 mt-2 small ps-2 pe-2'>
                <Row className='border shadow-sm rounded-3 border-secondary ms-0 me-0' style={{ overflow: 'hidden' }}>
                    <Col className='col-sm-7 ps-0 pe-0'>
                        <Overall stOverall={parsedStatsOverall}/>
                    </Col>
                    <Col>{Object.keys(overallBarData).length !== 0 ? <Bar data={overallBarData} options={overallBarOptions}/> : <h3>Overall</h3>}</Col>
                </Row>
            </Container>
            <Transactions/>
        </>
    )
}

export default StatsOverall;