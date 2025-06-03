import Logo from './components/Logo'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './components/Main';
import SignIn from './components/SignIn'
import SignUp from './components/SignUp';
import TransactionsFileUpload from './components/TransactionsFileUpload';
import Stats from './components/Stats';

function App() {

  return (
    <>
      <BrowserRouter>
        <Logo/>
        <Routes>
          <Route path='/' element={<Main/>}></Route>
          <Route path='/sign_in' element={<SignIn/>}></Route>
          <Route path='/sign_up' element={<SignUp/>}></Route>
          <Route path='/upload_transactions' element={<TransactionsFileUpload/>}></Route>
          <Route path='/stats' element={<Stats/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
