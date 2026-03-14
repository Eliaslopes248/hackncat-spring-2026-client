import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { TicketProvider } from "./context/TicketContext"
import MonitoringPage from "./pages/Monitoring"
import Tickets from "./pages/Tickets"
import DashboardPage from "./pages/DashboardPage"

function App() {
  return (
    <TicketProvider>
    <Router>
      <Routes>
        <Route path="/" element={<DashboardPage/>} />
        <Route path="/dashboard" element={<DashboardPage/>} />
        <Route path="/monitoring" element={<MonitoringPage/>}/>
        <Route path="/tickets" element={<Tickets/>}/>
      </Routes>
    </Router>
    </TicketProvider>
  )
}

export default App
