

export type Status = 'healthy' | 'warning' | 'critical';

export type Pump = {
    id: string;
    name: string;
    status: Status;
    pressure: number;
    flowRate: number;
    vibration: number;
    temperature?: number;
    rpm?: number;
    operationalHours?: number;
    requiresMaintenance?: boolean;
    loadPercent?: number;
    isRunning?: boolean;
};

interface AssetMonitoringProps {
    pumps: Pump[];
    loading: boolean;
}

export default function AssetMonitoring({ pumps, loading }: AssetMonitoringProps) {
    const getStatusConfig = (status: Status) => {
        const configs: Record<Status, {
            dot: string;
            text: string;
            row: string;
            bg: string;
            badge: string;
            button: string;
            buttonText: string;
            cardBg: string;
            cardBadge: string;
            cardBadgeText: string;
        }> = {
            healthy: {
                dot: 'bg-green-500',
                text: 'text-slate-600',
                row: 'hover:bg-slate-50',
                bg: '',
                badge: 'text-green-600',
                button: 'text-chevronBlue hover:underline',
                buttonText: 'Details',
                cardBg: 'bg-white border-border opacity-80',
                cardBadge: 'text-[10px] font-bold text-green-600',
                cardBadgeText: 'HEALTHY',
            },
            warning: {
                dot: 'bg-amber-500',
                text: 'text-amber-600',
                row: 'bg-amber-50/30 hover:bg-amber-50',
                bg: 'bg-amber-50/30',
                badge: 'text-amber-600',
                button: 'text-amber-600 hover:underline',
                buttonText: 'Inspect',
                cardBg: 'bg-amber-50 border-amber-200',
                cardBadge: 'text-[10px] font-bold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full',
                cardBadgeText: 'WARNING',
            },
            critical: {
                dot: 'bg-chevronRed',
                text: 'text-chevronRed',
                row: 'bg-red-50 hover:bg-red-100',
                bg: 'bg-red-50',
                badge: 'text-chevronRed',
                button: 'bg-chevronRed text-white px-2 py-0.5 rounded',
                buttonText: 'Emergency',
                cardBg: 'bg-red-50 border-chevronRed/30',
                cardBadge: 'text-[10px] font-bold bg-chevronRed text-white px-2 py-0.5 rounded-full',
                cardBadgeText: 'CRITICAL',
            },
        };
        return configs[status];
    };

    if (loading) {
        return (
            <div className="p-6 bg-white border border-border rounded-custom">
                <div className="flex items-center justify-center py-8">
                    <div className="text-sm text-slate-500">Loading pump data...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 bg-white border border-border rounded-custom">
            <section className="space-y-3">
                <div className="flex justify-between items-center">
                    <h2 className="text-sm font-bold text-slate-800 uppercase tracking-tight flex items-center gap-2">
                        <span className="bg-slate-100 text-slate-500 text-[10px] px-2 py-0.5 rounded-full">LIVE</span>
                    </h2>
                    <span className="text-[11px] font-bold text-chevronBlue cursor-pointer hover:underline uppercase">View All Assets</span>
                </div>

                {/* Desktop Table */}
                <div className="hidden lg:block bg-white border border-border rounded-custom shadow-sm overflow-hidden">
                    <table className="w-full text-left high-density-table border-collapse">
                        <thead className="bg-slate-50 border-b border-border">
                            <tr>
                                <th className="text-[10px] font-bold text-slate-500 uppercase">
                                    Asset Name <span className="material-symbols-outlined text-[12px] align-middle">unfold_more</span>
                                </th>
                                <th className="text-[10px] font-bold text-slate-500 uppercase text-center">Status</th>
                                <th className="text-[10px] font-bold text-slate-500 uppercase">Pressure</th>
                                <th className="text-[10px] font-bold text-slate-500 uppercase">Flow Rate</th>
                                <th className="text-[10px] font-bold text-slate-500 uppercase">Vibration</th>
                                <th className="text-[10px] font-bold text-slate-500 uppercase text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {pumps.map((pump) => {
                                const config = getStatusConfig(pump.status);
                                return (
                                    <tr key={pump.id} className={`${config.row} transition-colors`}>
                                        <td className={`font-bold ${pump.status === 'critical' ? 'text-chevronRed' : 'text-slate-700'}`}>
                                            {pump.name}
                                        </td>
                                        <td className="text-center">
                                            <span className={`inline-block w-2 h-2 rounded-full ${config.dot}`} title={pump.status}></span>
                                        </td>
                                        <td className={`${pump.status !== 'healthy' ? 'font-semibold' : ''} ${config.text}`}>
                                            {pump.pressure} PSI
                                        </td>
                                        <td className={`${pump.status === 'critical' ? 'font-bold text-chevronRed' : 'text-slate-600'}`}>
                                            {pump.flowRate} GPM
                                        </td>
                                        <td className={`${pump.status !== 'healthy' ? 'font-semibold' : ''} ${config.text}`}>
                                            {pump.vibration.toFixed(2)} in/s
                                        </td>
                                        <td className="text-right">
                                            <button className={`${config.button} font-bold text-[11px] uppercase`}>
                                                {config.buttonText}
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Cards */}
                <div className="lg:hidden space-y-2 max-h-[400px] overflow-y-auto pr-1">
                    {pumps
                        .sort((a: Pump, b: Pump) => {
                            const priority: Record<Status, number> = { critical: 0, warning: 1, healthy: 2 };
                            return priority[a.status] - priority[b.status];
                        })
                        .map((pump) => {
                            const config = getStatusConfig(pump.status);
                            return (
                                <div key={pump.id} className={`${config.cardBg} border p-3 rounded-custom shadow-sm`}>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className={`font-bold text-sm ${pump.status === 'critical' ? 'text-chevronRed' : 'text-slate-800'}`}>
                                            {pump.name}
                                        </span>
                                        <span className={config.cardBadge}>{config.cardBadgeText}</span>
                                    </div>
                                    <div className={`${pump.status === 'healthy' ? 'flex gap-4 text-[10px] text-slate-500' : 'grid grid-cols-3 gap-2 text-[11px]'}`}>
                                        {pump.status === 'healthy' ? (
                                            <>
                                                <span>{pump.pressure} PSI</span> • <span>{pump.flowRate} GPM</span> • <span>{pump.vibration.toFixed(2)} in/s</span>
                                            </>
                                        ) : (
                                            <>
                                                <div>
                                                    <p className="text-slate-500">Press.</p>
                                                    <p className={`font-bold ${config.text}`}>{pump.pressure} PSI</p>
                                                </div>
                                                <div>
                                                    <p className="text-slate-500">Flow</p>
                                                    <p className={pump.status === 'critical' ? 'font-bold text-chevronRed' : 'font-bold'}>{pump.flowRate} GPM</p>
                                                </div>
                                                <div>
                                                    <p className="text-slate-500">Vibr.</p>
                                                    <p className={`font-bold ${config.text}`}>{pump.vibration.toFixed(2)} in/s</p>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </section>
        </div>
    );
}
