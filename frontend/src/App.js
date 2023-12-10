import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LandingPage } from './LandingPage'
import Signup from './Signup'
import Home from './Home'
import Login from './login'
import AdminLogin from './AdminLogin'
import AdminHome from './AdminHome'
import AddBook from './AddBook'
import AddPatron from './AddPatron'
import PurchaseList from './PurchaseList'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/admin-login' element={<AdminLogin />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/admin-home' element={<AdminHome />}></Route>
        <Route path='/add-book' element={<AddBook />}></Route>
        <Route path='/add-patron' element={<AddPatron />}></Route>
        <Route path='/purchase-list' element={<PurchaseList />}></Route>
      </Routes>
    </BrowserRouter>)
}
export default App