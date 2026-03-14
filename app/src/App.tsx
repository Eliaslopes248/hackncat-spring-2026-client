import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Test from "./pages/Test"
import DashboardPage from "./pages/DashboardPage"
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Test/>} />
        <Route path="/dashboard" element={<DashboardPage/>} />
      </Routes>
    </Router>
  )
}

export default App
