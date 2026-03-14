type EventItem = {
  id: number;
  time: string;
  message: string;
  colorClass: string;
};

const mockEvents: EventItem[] = [
  {
    id: 1,
    time: "14:32:01",
    message:
      "Anomaly detected: Pump 07 High-Temp (212°F). AI Supervisor auto-adjusting flow valve V-102.",
    colorClass: "text-chevronRed",
  },
  {
    id: 2,
    time: "14:32:15",
    message:
      "Work order #8842 generated for onsite maintenance at Hack Island.",
    colorClass: "text-chevronBlue",
  },
  {
    id: 3,
    time: "14:15:00",
    message: "Daily diagnostic report completed. 23/24 assets responsive.",
    colorClass: "text-green-600",
  },
  {
    id: 4,
    time: "14:15:00",
    message: "Daily diagnostic report completed. 23/24 assets responsive.",
    colorClass: "text-green-600",
  }
  ,
  {
    id: 5,
    time: "14:15:00",
    message: "Daily diagnostic report completed. 23/24 assets responsive.",
    colorClass: "text-green-600",
  }
  ,
  {
    id: 7,
    time: "14:15:00",
    message: "Daily diagnostic report completed. 23/24 assets responsive.",
    colorClass: "text-green-600",
  }
  
  
];

export default function TopMetrics() {
  return (
    <div>
      <section className="bg-white border border-border rounded-custom p-4 shadow-sm">
        <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">history</span>
          Recent AI Events
        </h3>

        <div className="space-y-2.5">
          {mockEvents.map((event) => (
            <div
              key={event.id}
              className="flex items-start gap-3 text-[12px] leading-relaxed"
            >
              <span
                className={`${event.colorClass} font-mono font-bold whitespace-nowrap`}
              >
                [{event.time}]
              </span>
              <span className="text-slate-600">{event.message}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}