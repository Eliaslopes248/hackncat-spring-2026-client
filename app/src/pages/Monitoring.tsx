import { useLocation } from 'react-router-dom';
import NavBar from '../components/ui/NavBar';
import MonitoringHeader from '../components/monitoring/MonitoringHeader';
import AiInsightsPanel from '../components/monitoring/AiInsightsPanel';
import PumpDataGrid from '../components/monitoring/PumpDataGrid';
import type { Pump } from '../components/AssetMonitoring';

export default function MonitoringPage() {
    const { state } = useLocation();
    const pump = (state as { pump?: Pump } | null)?.pump ?? null;

    return (
    <div className="min-h-screen flex flex-col">
        <div className="min-h-screen flex flex-col">
            <NavBar/>
            <MonitoringHeader pump={pump}/>
            <AiInsightsPanel pump={pump}/>
            <PumpDataGrid pump={pump}/>
            <footer className="p-6 bg-slate-50 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-[10px] text-slate-400 uppercase tracking-[0.2em] font-medium">
                    © 2026 Chevron Digital Asset Management • Secure SCADA Gateway 4.0
                </div>
                <div className="flex gap-6">
                    <span className="text-[10px] text-slate-400 uppercase font-bold hover:text-chevronBlue cursor-pointer">Support</span>
                    <span className="text-[10px] text-slate-400 uppercase font-bold hover:text-chevronBlue cursor-pointer">Logs</span>
                    <span className="text-[10px] text-slate-400 uppercase font-bold hover:text-chevronBlue cursor-pointer">Security</span>
                </div>
            </footer>
        </div>

    </div>
  )
}
