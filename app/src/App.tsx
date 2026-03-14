import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import MonitoringPage from "./pages/Monitoring"
import Tickets from "./pages/Tickets"
import DashboardPage from "./pages/DashboardPage"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardPage/>} />
        <Route path="/dashboard" element={<DashboardPage/>} />
        <Route path="/monitoring" element={<MonitoringPage/>}/>
        <Route path="/tickets" element={<Tickets/>}/>
      </Routes>
    </Router>
  )
}

export default App
