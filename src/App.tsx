
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Invoices from './pages/Invoices'
import Myaccount from './pages/Profile'
import Navbar from './components/Navbar'
import CampaignManagement from './pages/CampaignManagement'
import UploadCampaign from './pages/UploadCampaign'
import Invoiceupload from './pages/Invoiceupload'
function App() {
 

  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/campaigns" element={<CampaignManagement/>} />
          <Route path="/Upload-Campaign" element={<UploadCampaign/>} />
          <Route path="/Upload-Invoice" element={<Invoiceupload/>} />
         
          <Route path="/invoices" element={<Invoices/>} />
          <Route path="/Myaccount" element={<Myaccount/>} />
          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
