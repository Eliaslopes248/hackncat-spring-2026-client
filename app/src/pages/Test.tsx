export default function Test() {
    
  return (
    <header className="bg-white border-b border-border py-3 px-6 flex justify-between items-center sticky top-0 z-50">
      <div className="flex items-center gap-4" data-purpose="branding-container">
        <div className="w-8 h-8 flex items-center justify-center bg-white overflow-hidden">
          <img alt="Chevron Logo" className="object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuALAHm-2b9DiLW4fG9hIFfBUsDS_Pf78WZACC-24YaFM9EQzmoPJnzo96KJUZzPEHK-UtNzhgz7HPqLELRycqgdkufu5-kQ_ZUW_N0Qc3Ft7RQLQVyO1IkVbS9eFzx9I7P3Htx-4KXVY7DHEe1721pLB4IFBSPnrvSPs-FoEHz_1Z4vAYyAJDHb5zqUYibZN7Z791gp363IbA6d0nDpBKc5Z5IBXZqvClp74KEbJMAdGlHP7cFcETh-STEij5R96AzYkBEYvyhkipQ"/>
        </div>
        <div>
          <h1 className="text-lg font-bold tracking-tight text-chevronBlue">Chevron Digital Oilfield</h1>
          <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Monitoring &amp; Operations Control</p>
        </div>
      </div>
      <div className="flex items-center gap-4" data-purpose="user-controls">
        <div className="hidden md:flex items-center gap-2 text-xs font-medium text-slate-600">
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
          System Online
        </div>
        <div className="w-8 h-8 rounded-full bg-chevronBlue flex items-center justify-center text-white text-xs font-bold">
          JD
        </div>
      </div>
    </header>
  )
}
