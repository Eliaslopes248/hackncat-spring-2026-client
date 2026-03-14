type OperationStatus = 'STABLE' | 'AT_RISK' | 'DEGRADED' | 'NOMINAL'

type OperationData = {
  label: string
  metric: string
  icon: string
  status: OperationStatus
  statusLabel?: string
  progress?: number
  subtitle?: string
}

// Stable = green, At Risk = yellow, Degraded = red, Nominal = blue
const STATUS_ICON_CLASSES: Record<OperationStatus, string> = {
  STABLE: 'material-symbols-outlined text-emerald-600',
  AT_RISK: 'material-symbols-outlined text-amber-500',
  DEGRADED: 'material-symbols-outlined text-chevron-red',
  NOMINAL: 'material-symbols-outlined text-chevron-blue',
}

const STATUS_LABEL_CLASSES: Record<OperationStatus, string> = {
  STABLE: 'text-emerald-600 text-[10px] font-black uppercase',
  AT_RISK: 'text-amber-500 text-[10px] font-black uppercase',
  DEGRADED: 'text-chevron-red text-[10px] font-black uppercase',
  NOMINAL: 'text-chevron-blue text-[10px] font-black uppercase',
}

const PROGRESS_BAR_CLASSES: Record<OperationStatus, string> = {
  STABLE: 'bg-emerald-600 h-full rounded-full',
  AT_RISK: 'bg-amber-500 h-full rounded-full',
  DEGRADED: 'bg-chevron-red h-full rounded-full',
  NOMINAL: 'bg-chevron-blue h-full rounded-full',
}

const operationalMetrics: OperationData[] = [
  {
    label: 'Temperature',
    metric: '210°F',
    icon: 'thermostat',
    status: 'DEGRADED',
    statusLabel: 'Degrading',
    progress: 85,
  },
  {
    label: 'Vibration',
    metric: '4.2 mm/s',
    icon: 'vibration',
    status: 'STABLE',
    statusLabel: 'Stable',
    subtitle: 'Within nominal range',
  },
  {
    label: 'Pressure',
    metric: '120 PSI',
    icon: 'speed',
    status: 'NOMINAL',
    statusLabel: 'Nominal',
    progress: 60,
  },
  {
    label: 'Flow Rate',
    metric: '450 GPM',
    icon: 'water_drop',
    status: 'NOMINAL',
    subtitle: 'Avg: 442 GPM',
  },
]

type LifecycleData = {
  label: string
  value: string
  icon: string
  subtitle?: string
  highlight?: boolean
  subtitleSuccess?: boolean
  valueSize?: 'normal' | 'xl'
}

const lifecycleMetrics: LifecycleData[] = [
  {
    label: 'Maintenance',
    value: 'ACTIVE',
    icon: 'build',
    subtitle: 'Work order assigned',
    highlight: true,
  },
  {
    label: 'Rotation',
    value: '1,750',
    icon: 'rotate_right',
    subtitle: 'Target: 1,800 RPM',
  },
  {
    label: 'Op. Hours',
    value: '12,450h',
    icon: 'schedule',
    subtitle: 'Next service: 15,000h',
  },
  {
    label: 'Connectivity',
    value: '98ms Latency',
    icon: 'sensors',
    subtitle: 'Signal Strength: Optimal',
    subtitleSuccess: true,
    valueSize: 'xl',
  },
]

export default function PumpDataGrid() {
  return (
    <div className="p-[25px] md:p-[35px] mb-[100px] grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h3 className="text-slate-400 text-xs font-black uppercase tracking-[0.2em] border-b border-slate-100 pb-2">
          Operational Metrics
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {operationalMetrics.map((op) => (
            <div key={op.label} className="metric-card">
              <div className="flex items-center justify-between mb-4">
                <span className={STATUS_ICON_CLASSES[op.status]}>{op.icon}</span>
                {op.statusLabel != null && (
                  <span className={STATUS_LABEL_CLASSES[op.status]}>{op.statusLabel}</span>
                )}
              </div>
              <div className="text-slate-400 text-xs font-bold uppercase mb-1">{op.label}</div>
              <div className="text-3xl font-black text-slate-900">{op.metric}</div>
              {op.progress != null && (
                <div className="w-full bg-slate-100 h-1.5 rounded-full mt-4">
                  <div
                    className={PROGRESS_BAR_CLASSES[op.status]}
                    style={{ width: `${op.progress}%` }}
                  />
                </div>
              )}
              {op.subtitle != null && (
                <p className="text-slate-400 text-[10px] mt-2 font-bold italic">{op.subtitle}</p>
              )}
            </div>
          ))}
        </div>
        <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-slate-900 font-black text-sm uppercase tracking-wider">24H Sensor History</h3>
            <div className="flex gap-1">
              <button className="px-2 py-1 bg-slate-50 text-[10px] font-black text-slate-400 rounded">1H</button>
              <button className="px-2 py-1 bg-chevron-blue text-white text-[10px] font-black rounded">24H</button>
              <button className="px-2 py-1 bg-slate-50 text-[10px] font-black text-slate-400 rounded">7D</button>
            </div>
          </div>
          <div className="h-40 flex items-end gap-1 px-2">
            <div className="flex-1 bg-chevron-blue/10 h-[40%] rounded-t"></div>
            <div className="flex-1 bg-chevron-blue/10 h-[35%] rounded-t"></div>
            <div className="flex-1 bg-chevron-blue/10 h-[45%] rounded-t"></div>
            <div className="flex-1 bg-chevron-blue/10 h-[50%] rounded-t"></div>
            <div className="flex-1 bg-chevron-blue/10 h-[60%] rounded-t"></div>
            <div className="flex-1 bg-chevron-red/40 h-[80%] rounded-t"></div>
            <div className="flex-1 bg-chevron-red/60 h-[95%] rounded-t"></div>
            <div className="flex-1 bg-chevron-red h-full rounded-t"></div>
            <div className="flex-1 bg-chevron-red h-[90%] rounded-t"></div>
          </div>
        </div>
      </div>
          
      <div className="space-y-6">
        <h3 className="text-slate-400 text-xs font-black uppercase tracking-[0.2em] border-b border-slate-100 pb-2">
          Lifecycle &amp; Assets
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {lifecycleMetrics.map((lc) => (
            <div
              key={lc.label}
              className={`metric-card ${lc.highlight ? 'bg-chevron-blue/[0.03] primary-border' : ''}`}
            >
              <div className="flex items-center justify-between mb-4">
                <span
                  className={
                    lc.highlight
                      ? 'material-symbols-outlined text-chevron-blue'
                      : 'material-symbols-outlined text-slate-400'
                  }
                >
                  {lc.icon}
                </span>
                {lc.highlight && (
                  <div className="h-2 w-2 rounded-full bg-chevron-blue animate-pulse" />
                )}
              </div>
              <div
                className={
                  lc.highlight
                    ? 'text-chevron-blue text-xs font-black uppercase mb-1'
                    : 'text-slate-400 text-xs font-bold uppercase mb-1'
                }
              >
                {lc.label}
              </div>
              <div
                className={
                  lc.highlight
                    ? 'text-3xl font-black text-chevron-blue'
                    : lc.valueSize === 'xl'
                      ? 'text-xl font-black text-slate-900'
                      : 'text-3xl font-black text-slate-900'
                }
              >
                {lc.value}
              </div>
              {lc.subtitle != null && (
                <p
                  className={
                    lc.subtitleSuccess
                      ? 'text-emerald-600 text-[10px] mt-2 font-black uppercase'
                      : lc.highlight
                        ? 'text-chevron-blue/60 text-[10px] mt-2 font-bold'
                        : 'text-slate-400 text-[10px] mt-2 font-bold uppercase tracking-tight'
                  }
                >
                  {lc.subtitle}
                </p>
              )}
            </div>
          ))}
        </div>
       
      </div>
    </div>
  )
}
