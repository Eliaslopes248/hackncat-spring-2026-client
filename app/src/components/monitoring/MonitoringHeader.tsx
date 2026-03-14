export default function MonitoringHeader() {
  return (
    <div className="p-[25px] md:p-[35px] flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">
              <span>Details</span>
              <span className="material-symbols-outlined text-sm">chevron_right</span>
              <span className="text-chevron-blue">Hack Island Pump 07</span>
            </div>
            <div className="flex items-center gap-4">
              <h1 className="text-slate-900 text-3xl font-black">Hack Island Pump 07</h1>
              {/* <span className="bg-chevron-red text-white text-[10px] px-2 py-0.5 rounded font-black uppercase tracking-wider">Critical Alert</span> */}
            </div>
          </div>
          <div className="flex gap-3 flex-col md:flex-row">
            <button className="max-w-[350px] hover:bg-black duration-[.2s] hover:text-white min-w-fit inline-flex items-center justify-center px-4 py-2 border border-slate-200 rounded text-slate-600 text-xs font-black uppercase transition-colors">
              <span className="material-symbols-outlined text-sm mr-2 duration-[.2s]">download</span>
              Download Report
            </button>
            <div className=" bg-green-300 px-4 w-full min-w-[150px] max-w-[350px] inline-flex items-center justify-center py-3 border border-slate-200 rounded text-slate-600 text-xs font-black uppercase transition-colors">
              {/* severity status */}
              
              <p className='text-white'>Status: OK</p>
            </div>
            
          </div>
        </div>
  )
}
