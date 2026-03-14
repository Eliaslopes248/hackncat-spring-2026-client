import React from "react";
import { NavLink } from "react-router-dom";
import LOGO from "../../../logo2.png";

type NavOption = {
  name: string;
  link: string;
};

const navOptions: NavOption[] = [
  { name: "Dashboard", link: "/dashboard" },
  { name: "Tickets", link: "/tickets" },
];

export default function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <div className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div>
            <img src={LOGO} alt="logo" className="max-w-[30px]" />
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">Chevron Admin</p>
            <h2 className="text-xl font-black tracking-tight uppercase text-chevron-blue">Pipe .Net</h2>
          </div>
        </div>

        <nav className="hidden items-center gap-5 md:flex">
          {navOptions.map((option) => (
            <NavLink
              key={option.link}
              to={option.link}
              className={({ isActive }) =>
                `text-sm font-bold transition-colors ${
                  isActive ? "text-chevron-blue" : "text-slate-500 hover:text-chevron-blue"
                }`
              }
            >
              {option.name}
            </NavLink>
          ))}
        </nav>

    

        <button
          type="button"
          onClick={() => setMobileMenuOpen((open) => !open)}
          className="relative ml-auto flex h-[30px] w-[30px] flex-col justify-center gap-1.5 rounded focus:outline-none focus:ring-chevron-blue/30 md:hidden"
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          <span
            className={`block w-full origin-center border-[1.5px] border-gray-500 transition-all duration-300 ease-out ${
              mobileMenuOpen ? "absolute left-0 top-1/2 w-full -translate-y-1/2 rotate-45" : ""
            }`}
          />
          <span
            className={`block w-full border-[1.5px] border-gray-500 transition-all duration-300 ease-out ${
              mobileMenuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-full origin-center border-[1.5px] border-gray-500 transition-all duration-300 ease-out ${
              mobileMenuOpen ? "absolute left-0 top-1/2 w-full -translate-y-1/2 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      <div
        className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-in-out md:hidden ${
          mobileMenuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0">
          <div className="flex w-full flex-col justify-center gap-5 border-t border-gray-200 bg-white p-6">
            {navOptions.map((option) => (
              <NavLink
                key={option.link}
                to={option.link}
                className={({ isActive }) =>
                  `text-[18px] font-bold transition-colors ${
                    isActive ? "text-chevron-blue" : "text-slate-500 hover:text-chevron-blue"
                  }`
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                {option.name}
              </NavLink>
            ))}
            
          </div>
        </div>
      </div>
    </div>
  );
}
