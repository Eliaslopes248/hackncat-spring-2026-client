import LOGO from "../../../logo2.png"
import React from "react";


type navOption = {
    name:string,
    link:string
}

export default function NavBar() {

    // nav options
    const navOptions : navOption[] = [
        {name:"Dashboard", link : "/dashboard"},
        {name:"Tickets", link : "/tickets"},
    ];

    // manage menu state
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <div className="border-b border-slate-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="">
                <img src={LOGO} alt="logo" className="max-w-[30px]" />
            </div>
            <h2 className="text-chevron-blue text-xl font-black tracking-tight uppercase">Pipe .Net</h2>
          </div>
          {/* desktop menu */}
          <nav className="hidden md:flex items-center gap-8">
            {
                navOptions.map((o, i)=> 
                {
                    return <a 
                    key={i} className="text-slate-500 hover:text-chevron-blue 
                    text-sm font-bold transition-colors" href={o.link}>{o.name}</a>
                })
            }
          </nav>
          {/* hamburger button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="relative w-[30px] h-[30px] flex flex-col justify-center gap-1.5 md:hidden ml-auto rounded focus:outline-none  focus:ring-chevron-blue/30"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <span
              className={`w-full border-[1.5px] border-gray-500 block transition-all duration-300 ease-out origin-center ${
                mobileMenuOpen
                  ? "absolute left-0 w-full top-1/2 -translate-y-1/2 rotate-45"
                  : ""
              }`}
            />
            <span
              className={`w-full border-[1.5px] border-gray-500 block transition-all duration-300 ease-out ${
                mobileMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-full border-[1.5px] border-gray-500 block transition-all duration-300 ease-out origin-center ${
                mobileMenuOpen
                  ? "absolute left-0 w-full top-1/2 -translate-y-1/2 -rotate-45"
                  : ""
              }`}
            />
          </button>
        </div>
        {/* mobile menu – slide down/up */}
        <div
          className={`grid transition-[grid-template-rows] duration-300 ease-in-out md:hidden overflow-hidden ${
            mobileMenuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="min-h-0">
            <div className="w-full border-t border-gray-200 flex flex-col justify-center gap-5 p-6 bg-white">
              {
                navOptions.map((o, i)=> 
                  <a
                    key={i}
                    href={o.link}
                    className="text-slate-500 hover:text-chevron-blue text-[18px] font-bold transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {o.name}
                  </a>
                )
              }
            </div>
          </div>
        </div>
      </div>
  )
}
