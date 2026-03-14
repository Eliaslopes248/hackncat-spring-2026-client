export default function CriticalAlert() {
    return (
        <section className="px-6 pt-4">
      <div className="bg-red-50 border border-chevronRed/20 p-3 rounded-custom flex items-center justify-between" data-purpose="critical-alert">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-chevronRed">warning</span>
          <span className="font-bold text-chevronRed uppercase tracking-wide text-xs md:text-sm">
            CRITICAL: Pump 07 at Hack Island is overheating. AI Workflow initiated.
          </span>
        </div>
        <button className="bg-chevronRed text-white text-[10px] font-bold py-1.5 px-4 rounded-custom hover:opacity-90 transition-opacity uppercase">
          RESPOND
        </button>
      </div>
    </section>
    )
}