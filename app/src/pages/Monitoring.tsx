import NavBar from '../components/ui/NavBar';
import MonitoringHeader from '../components/monitoring/MonitoringHeader';
import AiInsightsPanel from '../components/monitoring/AiInsightsPanel';
import PumpDataGrid from '../components/monitoring/PumpDataGrid';

// type for a pump object
type pumpObject = {};

// pass a pumpObject as props
export default function MonitoringPage({pump}: pumpObject | any) {
  return (
    <div className="min-h-screen flex flex-col">
        <div className="min-h-screen flex flex-col">
            {/* navbar */}
            <NavBar/>
            <MonitoringHeader/>
            <AiInsightsPanel/>
            <PumpDataGrid/>
            <footer className="border-t border-slate-100 py-6 px-6 text-center">
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">
                    Pipe .NET
                </p>
            </footer>
        </div>

    </div>
  )
}
