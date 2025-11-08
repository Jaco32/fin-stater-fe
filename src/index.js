import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';
import Main from './components/Main';
import SignIn from './components/SignIn'
import SignUp from './components/bootstrap/SignUp';
import UploadTransactions from './components/bootstrap/UploadTransactions';
import Stats from './components/Stats';
import 'bootstrap/dist/css/bootstrap.min.css';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Main />} />
      <Route path='/sign_in' element={<SignIn />} />
      <Route path='/sign_up' element={<SignUp />} />
      <Route path='/upload_transactions' element={<UploadTransactions />} />
      <Route path='/stats' element={<Stats />} />
    </>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router}/>);