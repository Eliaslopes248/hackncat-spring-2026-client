import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import MonitoringPage from "./pages/Monitoring"
import Tickets from "./pages/Tickets"
import Test from "./pages/Test"
import DashboardPage from "./pages/DashboardPage"
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/"           element={<MonitoringPage/>} />
        <Route path="/monitoring" element={<MonitoringPage/>}/>
        <Route path="/tickets"    element={<Tickets/>}/>
        <Route path="/" element={<Test/>} />
        <Route path="/dashboard" element={<DashboardPage/>} />
      </Routes>
    </Router>
  )
}

export default App
