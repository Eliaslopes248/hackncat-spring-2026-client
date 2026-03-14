import React from "react";
import { Link } from "react-router-dom";
import type { Pump } from "../AssetMonitoring";
import type { Ticket } from "../../types/ticket";

interface MonitoringHeaderProps {
  pump?: Pump | null;
  ticket?: Ticket | null;
}

export default function MonitoringHeader({ pump, ticket }: MonitoringHeaderProps) {
  const displayName = pump?.name ?? "No pump selected";
  const statusLabel = pump?.status === "HEALTHY" ? "HEALTHY" : pump?.status === "WARNING" ? "WARNING" : pump?.status === "CRITICAL" ? "CRITICAL" : "—";
  const statusClass = pump?.status === "HEALTHY" ? "bg-green-400" : pump?.status === "WARNING" ? "bg-amber-400" : pump?.status === "CRITICAL" ? "bg-chevron-red" : "bg-slate-200";

  async function handleDownloadReport(
    e : React.MouseEvent<HTMLButtonElement>) 
  {
    
    try {
      e.preventDefault();

      window.print();
    } catch (error) {
      console.error("[ERROR] ", error);
    }

  }


  return (
    <div className="p-[25px] md:p-[35px] flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">
              <span>Details</span>
              <span className="material-symbols-outlined text-sm">chevron_right</span>
              <span className="text-chevron-blue">{displayName}</span>
            </div>
            <div className="flex items-center gap-4 flex-wrap">
              <h1 className="text-slate-900 text-3xl font-black">{displayName}</h1>
              {ticket && (
                <Link
                  to="/tickets"
                  className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-800 text-[10px] font-bold px-3 py-1.5 rounded uppercase tracking-wider hover:bg-amber-200 transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">confirmation_number</span>
                  Ticket filed #{ticket.ticketNumber}
                </Link>
              )}
            </div>
          </div>
          <div className="flex gap-3 flex-col md:flex-row">
            <button onClick={handleDownloadReport} className="max-w-[350px] hover:bg-black duration-200 hover:text-white min-w-fit inline-flex items-center justify-center px-4 py-2 border border-slate-200 rounded text-slate-600 text-xs font-black uppercase transition-colors">
              <span className="material-symbols-outlined text-sm mr-2 duration-200">download</span>
              Download Report
            </button>
            <div className={`${statusClass} px-4 w-full min-w-[150px] max-w-[350px] inline-flex items-center justify-center py-3 border border-slate-200 rounded text-slate-600 text-xs font-black uppercase transition-colors`}>
              <p className="text-white">Status: {statusLabel}</p>
            </div>
            
          </div>
        </div>
  )
}
