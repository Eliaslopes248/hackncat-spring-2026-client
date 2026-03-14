import NavBar from '../components/ui/NavBar'
import TicketBannerData from '../components/tickets/TicketBannerData'

export default function Tickets() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-1 p-4 md:p-8 max-w-5xl mx-auto w-full">
        <TicketBannerData />
      </main>
      <footer className="shrink-0 border-t border-slate-100 py-6 px-6 text-center">
        <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">
          Pipe .NET
        </p>
      </footer>
    </div>
  )
}
