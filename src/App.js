import logo from './logo.svg';
import Logo from './components/Logo'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './components/SignUp';
import SetLogin from './components/SetLogin';
import TransactionsFileUpload from './components/TransactionsFileUpload';
import Stats from './components/Stats';

function App() {

  return (
    <>
      <Logo/>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SignUp/>}></Route>
          <Route path='/set_login' element={<SetLogin/>}></Route>
          <Route path='/upload_transactions' element={<TransactionsFileUpload/>}></Route>
          <Route path='/stats' element={<Stats/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
