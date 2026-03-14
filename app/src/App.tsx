import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { TicketProvider } from "./context/TicketContext";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import MonitoringPage from "./pages/Monitoring";
import Tickets from "./pages/Tickets";

function App() {
  return (
    <AuthProvider>
      <TicketProvider>
        <Router>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/monitoring" element={<MonitoringPage />} />
            <Route path="/tickets" element={<Tickets />} />
          </Routes>
        </Router>
      </TicketProvider>
    </AuthProvider>
  );
}

export default App;
