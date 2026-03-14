import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Test from "./pages/Test"
import MonitoringPage from "./pages/Monitoring"
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Test/>} />
        <Route path="/monitoring" element={<MonitoringPage/>}/>
      </Routes>
    </Router>
  )
}

export default App
