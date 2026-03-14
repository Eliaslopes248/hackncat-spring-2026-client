import type { Pump } from "../AssetMonitoring";

interface AiInsightsPanelProps {
  pump?: Pump | null;
}

export default function AiInsightsPanel({ pump }: AiInsightsPanelProps) {
  const temp = pump?.temperature ?? 0;
  const tempDisplay = Number(temp).toFixed(2);
  const isCritical = pump?.status === "CRITICAL";
  const isWarning = pump?.status === "WARNING";
  const severityLabel = isCritical ? "FATAL" : isWarning ? "WARNING" : "HEALTHY";
  const severityBorder = isCritical ? "border-chevron-red critical-border" : isWarning ? "border-amber-500" : "border-emerald-500";
  const severityText = isCritical ? "text-chevron-red" : isWarning ? "text-amber-600" : "text-emerald-600";
  const message = pump
    ? isCritical || (temp >= 75)
      ? `Autonomous workflow detected overheating condition (${tempDisplay}°F). Work order #8921 has been automatically triggered in the maintenance system to prevent bearing failure.`
      : isWarning
        ? `Elevated temperature (${tempDisplay}°F) on ${pump.name}. Monitor vibration and pressure.`
        : `${pump.name} operating within nominal range.`
    : "Select a pump from the dashboard to view AI insights.";

  return (
    <div className="p-[25px] md:p-[35px] grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <div className="lg:col-span-2 bg-slate-50 border border-chevron-blue/20 rounded-lg p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 primary-border">
        <div className="flex-1">
          <div className="flex items-center gap-2 text-chevron-blue mb-2">
            <span className="material-symbols-outlined font-bold">psychology</span>
            <span className="font-black text-sm uppercase tracking-wider">AI Insights</span>
          </div>
          <p className="text-slate-600 leading-relaxed font-medium">{message}</p>
        </div>
      </div>
      <div className={`bg-white border rounded-lg p-6 shadow-sm flex flex-col justify-center ${severityBorder}`}>
        <div className="flex justify-between items-start mb-2">
          <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Global Status</span>
          <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[10px] font-black uppercase">Live</span>
        </div>
        <div className={`${severityText} text-4xl font-black mb-1`}>{severityLabel}</div>
        <p className="text-slate-500 text-sm font-bold">
          {isCritical ? "Overheating / maintenance required" : isWarning ? "Elevated metrics" : pump ? "All systems nominal" : "No pump selected"}
        </p>
      </div>
    </div>
  );
}
