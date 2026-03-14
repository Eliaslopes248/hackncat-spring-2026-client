interface TopMetricsProps {
  totalPumps: number;
  healthy: number;
  warning: number;
  critical: number;
  openIncidents: number;
  activeWorkOrders: number;
  avgTemp: number;
}

export default function TopMetrics({
  totalPumps,
  healthy,
  warning,
  critical,
  openIncidents,
  activeWorkOrders,
  avgTemp,
}: TopMetricsProps) {
  const healthyPercent = totalPumps > 0 ? Math.round((healthy / totalPumps) * 100) : 0;

  return (
    <div>
      <section className="mt-[2vh] px-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3" data-purpose="top-metrics">
        <div className="bg-white p-3 rounded-custom border border-border shadow-sm">
          <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Total Pumps</p>
          <p className="text-xl font-bold text-slate-800">{totalPumps}</p>
        </div>
        <div className="bg-white p-3 rounded-custom border border-border shadow-sm">
          <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Healthy</p>
          <div className="flex items-baseline gap-2">
            <p className="text-xl font-bold text-green-600">{healthy}</p>
            <span className="text-[10px] text-slate-400">{healthyPercent}%</span>
          </div>
        </div>
        <div className="bg-white p-3 rounded-custom border border-border shadow-sm">
          <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Warning</p>
          <p className="text-xl font-bold text-amber-500">{warning}</p>
        </div>
        <div className="bg-white p-3 rounded-custom border-l-4 border-l-chevronRed border-y border-r border-border shadow-sm">
          <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Critical</p>
          <p className="text-xl font-bold text-chevronRed">{critical}</p>
        </div>
        <div className="bg-white p-3 rounded-custom border border-border shadow-sm">
          <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Open Incidents</p>
          <p className="text-xl font-bold text-slate-800">{openIncidents}</p>
        </div>
        <div className="bg-white p-3 rounded-custom border border-border shadow-sm">
          <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Active Work Orders</p>
          <p className="text-xl font-bold text-slate-800">{activeWorkOrders}</p>
        </div>
        <div className="bg-slate-50 p-3 rounded-custom border border-chevronBlue/10 shadow-sm">
          <p className="text-[10px] text-chevronBlue font-bold uppercase mb-1">Avg Temp</p>
          <p className="text-xl font-bold text-chevronBlue">{avgTemp}°F</p>
        </div>
      </section>
    </div>
  );
}