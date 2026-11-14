import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';
import Main from './components/Main';
import SignIn from './components/SignIn'
import SignUp from './components/SignUp';
import UploadTransactions from './components/UploadTransactions';
import StatsOverall from './components/stats/StatsOverall';
import StatsCategorized from './components/stats/StatsCategorized';
import StatsMonthly from './components/stats/StatsMonthly';
import './scss/custom.scss'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Main />} />
      <Route path='/sign_in' element={<SignIn />} />
      <Route path='/sign_up' element={<SignUp />} />
      <Route path='/upload_transactions' element={<UploadTransactions />} />
      <Route path='/overall' element={<StatsOverall/>} />
      <Route path='/categorized' element={<StatsCategorized/>} />
      <Route path='/monthly' element={<StatsMonthly/>} />
    </>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router}/>);