import Header from './../Header';
import Transactions from './../Transactions';
import StatsTabs from './StatsTabs';
import { Row, Col } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { Bar } from 'react-chartjs-2';
import Monthly from './Monthly';
import { getMonthlyStatsSynch } from '../../backend/stats';
import { getMonthlyStatBarChartData } from '../../utils/charts';
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

function StatsMonthly() {
    console.log("StatsMonthly - entered")

    Chart.register(ArcElement, Legend, Tooltip, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title);

    const monthlyStats = getMonthlyStatsSynch()
    const monthlyStatBarChartData = getMonthlyStatBarChartData(monthlyStats)
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

    return (
        <>
            <Header/>
            <StatsTabs/>
            <Container className='mw-100 mt-2 ps-2 pe-2'>
                <Row className='border shadow-sm rounded-3 border-secondary ms-0 me-0' style={{ overflow: 'hidden' }}>
                    <Col className='ps-0 pe-0'>
                      <Monthly stPerMonth={monthlyStats}/>
                    </Col>
                    <Col className='col-sm-7'>
                      {Object.keys(monthlyStatBarChartData).length !== 0 ? <Bar data={monthlyStatBarChartData} options={monthlyStatBarChartOptions}/> : <h3>Monthly Bar</h3>}
                    </Col>
                </Row>
            </Container>
            <Transactions/>
        </>
    )
}

export default StatsMonthly;