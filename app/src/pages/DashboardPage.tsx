import { useState, useEffect } from "react";
import CriticalAlert from "../components/CriticalAlert";
import TopMetrics from "../components/TopMetrics";
import AssetMonitoring, { type Pump } from "../components/AssetMonitoring";
import AIEvents from "../components/AIEvents";
import NavBar from "../components/ui/NavBar";

type Status = 'healthy' | 'warning' | 'critical';

type ApiPumpStatus = {
    'pump-id': string;
    temperature: number;
    pressure: number;
    'flow-rate': number;
    rpm: number;
    'operational-hours': number;
    'requires-maintenance': boolean;
    'load-percent': number;
    timestamp: number;
    health: number;
    'is-running': boolean;
};

export default function DashboardPage() {
    const [pumps, setPumps] = useState<Pump[]>([]);
    const [loading, setLoading] = useState(true);

    // Helper functions (same as AssetMonitoring)
    const getStatusFromHealth = (health: number, requiresMaintenance: boolean): Status => {
        if (requiresMaintenance || health < 0.5) return 'critical';
        if (health < 0.75) return 'warning';
        return 'healthy';
    };

    const barToPsi = (bar: number): number => bar * 14.5038;
    const cfmToGpm = (cfm: number): number => cfm * 7.48052;
    const estimateVibration = (rpm: number, loadPercent: number): number => {
        return (rpm / 10000) * loadPercent * (0.5 + Math.random() * 0.5);
    };

    // Fetch pump data
    async function fetchPumps() {
        try {
            setLoading(true);
            const pumpRes = await fetch("https://iotaspheresystems.com/api/pumps", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({}),
            });

            if (!pumpRes.ok) throw new Error(`Failed to fetch pumps: HTTP ${pumpRes.status}`);
            const pumpIds = await pumpRes.json();

            const pumpStatusPromises = Object.keys(pumpIds).map(async (pumpId, index) => {
                try {
                    const statusRes = await fetch("https://iotaspheresystems.com/api/pump-status", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ "pump-id": pumpId }),
                    });

                    if (!statusRes.ok) return null;

                    const statusData: ApiPumpStatus = await statusRes.json();
                    const pump: Pump = {
                        id: statusData['pump-id'],
                        name: `Pump ${String(index + 1).padStart(2, '0')}`,
                        status: getStatusFromHealth(statusData.health, statusData['requires-maintenance']),
                        pressure: Math.round(barToPsi(statusData.pressure)),
                        flowRate: Math.round(cfmToGpm(statusData['flow-rate'])),
                        vibration: estimateVibration(statusData.rpm, statusData['load-percent']),
                        temperature: statusData.temperature,
                        rpm: statusData.rpm,
                        operationalHours: statusData['operational-hours'],
                        requiresMaintenance: statusData['requires-maintenance'],
                        loadPercent: statusData['load-percent'],
                        isRunning: statusData['is-running'],
                    };
                    return pump;
                } catch (err) {
                    console.error(`Error fetching status for pump ${pumpId}:`, err);
                    return null;
                }
            });

            const pumpStatuses = await Promise.all(pumpStatusPromises);
            const validPumps = pumpStatuses.filter((p): p is Pump => p !== null);
            setPumps(validPumps);
        } catch (err) {
            console.error("Failed to fetch pumps:", err);
            setPumps([]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchPumps();
        const interval = setInterval(fetchPumps, 5000);
        return () => clearInterval(interval);
    }, []);

    // Calculate metrics from pump data
    const metrics = {
        totalPumps: pumps.length,
        healthy: pumps.filter(p => p.status === 'healthy').length,
        warning: pumps.filter(p => p.status === 'warning').length,
        critical: pumps.filter(p => p.status === 'critical').length,
        activeWorkOrders: pumps.filter(p => p.requiresMaintenance).length,
        openIncidents: pumps.filter(p => p.status === 'critical').length,
        avgTemp: pumps.length > 0 
            ? Math.round(pumps.reduce((sum, p) => sum + (p.temperature || 0), 0) / pumps.length)
            : 0,
    };

    return (
        <div className="main">
            <NavBar/>

            <CriticalAlert></CriticalAlert>
            
            {/* Dynamic TopMetrics with calculated values */}
            <TopMetrics
                totalPumps={metrics.totalPumps}
                healthy={metrics.healthy}
                warning={metrics.warning}
                critical={metrics.critical}
                openIncidents={metrics.openIncidents}
                activeWorkOrders={metrics.activeWorkOrders}
                avgTemp={metrics.avgTemp}
            />
            
            {/* Pass pump data to AssetMonitoring */}
            <AssetMonitoring pumps={pumps} loading={loading} />
            
            <AIEvents></AIEvents>

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
    );
}
