export default function AiInsightsPanel() {
  return (
    <div className="p-[25px] md:p-[35px] grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-slate-50 border border-chevron-blue/20 rounded-lg p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 primary-border">
            <div className="flex-1">
              <div className="flex items-center gap-2 text-chevron-blue mb-2">
                <span className="material-symbols-outlined font-bold">psychology</span>
                <span className="font-black text-sm uppercase tracking-wider">AI Insights</span>
              </div>
              <p className="text-slate-600 leading-relaxed font-medium">
                Autonomous workflow detected overheating condition (210°F). Work order <span className="text-chevron-blue font-black">#8921</span> has been automatically triggered in the maintenance system to prevent bearing failure.
              </p>
            </div>
            
          </div>
          <div className="bg-white border border-chevron-red rounded-lg p-6 shadow-sm critical-border flex flex-col justify-center">
            <div className="flex justify-between items-start mb-2">
              <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Global Status</span>
              <span className="bg-chevron-red/10 text-chevron-red px-2 py-0.5 rounded text-[10px] font-black uppercase">Live</span>
            </div>
            <div className="text-chevron-red text-4xl font-black mb-1">FATAL</div>
            <p className="text-slate-500 text-sm font-bold">Overheating detected</p>
          </div>
        </div>
  )
}
