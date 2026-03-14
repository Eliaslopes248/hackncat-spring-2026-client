import { useLocation } from 'react-router-dom';
import NavBar from '../components/ui/NavBar';
import MonitoringHeader from '../components/monitoring/MonitoringHeader';
import AiInsightsPanel from '../components/monitoring/AiInsightsPanel';
import PumpDataGrid from '../components/monitoring/PumpDataGrid';
import type { Pump } from '../components/AssetMonitoring';
import { useTickets } from '../context/TicketContext';

export default function MonitoringPage() {
    const { state } = useLocation();
    const pump = (state as { pump?: Pump } | null)?.pump ?? null;
    const { getTicketByPumpId } = useTickets();
    const ticketForPump = pump ? getTicketByPumpId(pump.id) : undefined;

    return (
    <div className="min-h-screen flex flex-col">
        <div className="min-h-screen flex flex-col">
            <NavBar/>
            <MonitoringHeader pump={pump} ticket={ticketForPump}/>
            <AiInsightsPanel pump={pump}/>
            <PumpDataGrid pump={pump}/>
            <footer className="p-6 bg-slate-50 border-t border-border">
                <div className="text-[10px] text-slate-400 uppercase tracking-[0.2em] font-medium">
                    © 2026 Chevron Digital Asset Management
                </div>
            </footer>
        </div>

    </div>
  )
}
