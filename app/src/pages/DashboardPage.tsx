import { useState, useEffect } from "react";
import TopMetrics from "../components/TopMetrics";
import AssetMonitoring, { type Pump, type Status } from "../components/AssetMonitoring";
import AIEvents from "../components/AIEvents";
import NavBar from "../components/ui/NavBar";
import { useTickets } from "../context/TicketContext";

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
    status?: string;
};

const DEFAULT_DEMO_PUMPS: Pump[] = [
    { id: 'demo-01', name: 'Pump 01', status: 'HEALTHY', pressure: 42, flowRate: 120, vibration: 0.8, temperature: 68, rpm: 2850, operationalHours: 1240, requiresMaintenance: false, loadPercent: 72, isRunning: true },
    { id: 'demo-02', name: 'Pump 02', status: 'WARNING', pressure: 38, flowRate: 95, vibration: 1.2, temperature: 74, rpm: 2720, operationalHours: 2100, requiresMaintenance: false, loadPercent: 85, isRunning: true },
    { id: 'demo-03', name: 'Pump 03', status: 'CRITICAL', pressure: 28, flowRate: 45, vibration: 2.1, temperature: 82, rpm: 2400, operationalHours: 3800, requiresMaintenance: true, loadPercent: 92, isRunning: true },
    { id: 'demo-04', name: 'Pump 04', status: 'HEALTHY', pressure: 45, flowRate: 135, vibration: 0.5, temperature: 65, rpm: 2900, operationalHours: 890, requiresMaintenance: false, loadPercent: 68, isRunning: true },
];

export default function DashboardPage() {
    const [pumps, setPumps] = useState<Pump[]>([]);
    const [loading, setLoading] = useState(true);
    const { addTicketIfNotExists } = useTickets();

    // Helper functions (same as AssetMonitoring)
    const getStatusFromHealth = (health: number, requiresMaintenance: boolean): Status => {
        if (requiresMaintenance || health < 0.5) return 'CRITICAL';
        if (health < 0.75) return 'WARNING';
        return 'HEALTHY';
    };

    const mapApiStatusToStatus = (apiStatus: string | undefined, health: number, requiresMaintenance: boolean): Status => {
        const normalized = apiStatus?.toUpperCase();
        if (normalized === 'HEALTHY') return 'HEALTHY';
        if (normalized === 'DEGRADING') return 'WARNING';
        if (normalized === 'WARNING') return 'WARNING';
        if (normalized === 'CRITICAL') return 'CRITICAL';
        return getStatusFromHealth(health, requiresMaintenance);
    };

    const barToPsi = (bar: number): number => bar * 14.5038;
    const cfmToGpm = (cfm: number): number => cfm * 7.48052;
    const estimateVibration = (rpm: number, loadPercent: number): number => {
        return (rpm / 10000) * loadPercent * (0.5 + Math.random() * 0.5);
    };

    const cToF = (c: number): number => (c * 9) / 5 + 32;

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
                        status: mapApiStatusToStatus((statusData as any).status, statusData.health, statusData['requires-maintenance']),
                        pressure: Math.round(barToPsi(statusData.pressure)),
                        flowRate: Math.round(cfmToGpm(statusData['flow-rate'])),
                        vibration: estimateVibration(statusData.rpm, statusData['load-percent']),
                        temperature: cToF(statusData.temperature),
                        rpm: statusData.rpm,
                        operationalHours: statusData['operational-hours'],
                        requiresMaintenance: statusData['requires-maintenance'],
                        loadPercent: statusData['load-percent'],
                        isRunning: statusData['is-running'],
                        health: statusData.health,
                        timestamp: statusData.timestamp,
                    };

                    console.log(`Fetched status for pump ${pumpId}:`, pump);
                    return pump;
                } catch (err) {
                    console.error(`Error fetching status for pump ${pumpId}:`, err);
                    return null;
                }
            });

            const pumpStatuses = await Promise.all(pumpStatusPromises);
            const validPumps = pumpStatuses.filter((p): p is Pump => p !== null);

            // replace with default demo data if API returns none
            if (validPumps.length > 0) {
                setPumps(validPumps);
            } else {
                setPumps(DEFAULT_DEMO_PUMPS);
            }

            
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

    // Create a ticket for each pump that is critical, warning, or degrading (only if one doesn't exist for that pump_id).
    useEffect(() => {
        pumps.forEach((pump) => {
            if (pump.status !== 'HEALTHY') addTicketIfNotExists(pump);
        });
    }, [pumps, addTicketIfNotExists]);

    // Calculate metrics from pump data
    const metrics = {
        totalPumps: pumps.length,
        healthy: pumps.filter(p => p.status === 'HEALTHY').length,
        warning: pumps.filter(p => p.status === 'WARNING').length,
        critical: pumps.filter(p => p.status === 'CRITICAL').length,
        activeWorkOrders: pumps.filter(p => p.requiresMaintenance).length,
        openIncidents: pumps.filter(p => p.status === 'CRITICAL').length,
        avgTemp: pumps.length > 0 
            ? Number((pumps.reduce((sum, p) => sum + (p.temperature || 0), 0) / pumps.length).toFixed(2))
            : 0,
    };

    return (
        <div className="main">
            <NavBar/>

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
