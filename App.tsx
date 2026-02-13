
import React, { useState, useEffect, useRef } from 'react';
import { 
  LayoutDashboard, 
  TrendingUp, 
  AlertTriangle, 
  CreditCard, 
  Users, 
  Zap, 
  Menu, 
  X, 
  CheckCircle2, 
  Smartphone, 
  BarChart3,
  PieChart,
  BrainCircuit,
  Store,
  ArrowUpRight,
  ArrowDownRight,
  ChevronDown,
  ChevronUp,
  Star,
  ShieldCheck,
  Search,
  Bell,
  ArrowRight,
  Sparkles,
  Command,
  Activity,
  Package,
  Calendar,
  Layers,
  ShoppingCart,
  History,
  RefreshCw,
  PlusCircle
} from 'lucide-react';
import { ALERTS, INVENTORY, TESTIMONIALS, FAQS } from './constants';
import { GoogleGenAI } from '@google/genai';

/* --- HELPER COMPONENTS --- */

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-[100] transition-all duration-500 ${
      scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-100 py-3' : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="bg-indigo-600 text-white p-2.5 rounded-xl shadow-lg shadow-indigo-200 group-hover:rotate-6 transition-transform">
            <LayoutDashboard size={20} />
          </div>
          <span className="text-2xl font-extrabold tracking-tight text-slate-900">
            Dukaan<span className="text-indigo-600">Dash</span>
          </span>
        </div>

        <div className="hidden lg:flex items-center gap-10">
          {['Features', 'Dashboard', 'Integrations', 'Pricing'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors"
            >
              {item}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <button className="text-sm font-bold text-slate-700 hover:text-indigo-600 px-4">Sign In</button>
          <button className="bg-slate-900 text-white px-6 py-3 rounded-full text-sm font-bold hover:bg-slate-800 hover:shadow-xl hover:-translate-y-0.5 transition-all">
            Get Started Free
          </button>
        </div>

        <button className="lg:hidden text-slate-900" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div className={`lg:hidden fixed inset-0 bg-white z-[90] flex flex-col pt-24 px-8 gap-6 transition-transform duration-500 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {['Features', 'Dashboard', 'Integrations', 'Pricing'].map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`} className="text-3xl font-bold text-slate-900" onClick={() => setIsOpen(false)}>
            {item}
          </a>
        ))}
        <button className="w-full bg-indigo-600 text-white py-5 rounded-2xl text-xl font-bold mt-4">
          Free Trial
        </button>
      </div>
    </nav>
  );
};

const SmartBadge = ({ text, icon: Icon }: { text: string; icon?: any }) => (
  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100/50 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-6">
    {Icon && <Icon size={14} />}
    {text}
  </div>
);

const InteractiveDashboard = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'inventory' | 'ai'>('overview');
  const [restockingItems, setRestockingItems] = useState<string[]>([]);

  const handleRestock = (itemName: string) => {
    setRestockingItems(prev => [...prev, itemName]);
    setTimeout(() => {
      setRestockingItems(prev => prev.filter(name => name !== itemName));
    }, 2000);
  };
  
  return (
    <div className="w-full max-w-6xl mx-auto mt-20 relative group">
      {/* Dynamic Gradients */}
      <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
      
      <div className="relative bg-white rounded-[2.2rem] shadow-2xl border border-slate-100 overflow-hidden">
        {/* Dashboard Header */}
        <div className="bg-slate-50/50 border-b border-slate-100 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
             <div className="flex gap-1.5 mr-4">
               <div className="w-3 h-3 rounded-full bg-rose-400"></div>
               <div className="w-3 h-3 rounded-full bg-amber-400"></div>
               <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
             </div>
             <div className="flex bg-white p-1 rounded-xl shadow-sm border border-slate-100">
               {['overview', 'inventory', 'ai'].map((tab) => (
                 <button 
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${
                    activeTab === tab ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'text-slate-500 hover:bg-slate-50'
                  }`}
                 >
                   {tab.toUpperCase()}
                 </button>
               ))}
             </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden lg:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input type="text" placeholder="Global search..." className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm w-64 focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none" />
            </div>
            <div className="flex items-center gap-3 bg-white p-1 rounded-full border border-slate-100 pl-4">
              <span className="text-xs font-bold text-slate-900">Anil Sharma</span>
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs ring-2 ring-white">AS</div>
            </div>
          </div>
        </div>

        <div className="p-8 bg-white min-h-[500px]">
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { label: 'Today\'s Revenue', val: '₹42,230', trend: '+12.5%', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                  { label: 'Active Customers', val: '248', trend: '+4%', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50' },
                  { label: 'Store Efficiency', val: '94%', trend: 'Steady', icon: Activity, color: 'text-purple-600', bg: 'bg-purple-50' },
                ].map((stat, i) => (
                  <div key={i} className="p-6 rounded-2xl border border-slate-100 bg-slate-50/30 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                        <stat.icon size={22} />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-wider px-2 py-1 bg-white rounded-md border border-slate-100">
                        {stat.trend}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-slate-500">{stat.label}</p>
                    <h3 className="text-3xl font-extrabold text-slate-900 mt-1">{stat.val}</h3>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-slate-900 rounded-3xl p-8 text-white">
                  <div className="flex justify-between items-center mb-10">
                    <div>
                      <h4 className="text-lg font-bold">Sales Trajectory</h4>
                      <p className="text-slate-400 text-sm">Revenue vs Projected Goals</p>
                    </div>
                    <div className="flex gap-2">
                       <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-indigo-500"></div><span className="text-[10px] text-slate-400 font-bold">Actual</span></div>
                       <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-white/20"></div><span className="text-[10px] text-slate-400 font-bold">Projected</span></div>
                    </div>
                  </div>
                  <div className="h-48 flex items-end justify-between gap-3">
                    {[35, 60, 45, 85, 70, 95, 65, 80, 55, 90, 75, 100].map((h, i) => (
                      <div key={i} className="flex-1 flex flex-col justify-end gap-1 group relative">
                        <div style={{ height: `${h}%` }} className="w-full bg-indigo-500/30 rounded-t-lg group-hover:bg-indigo-500 transition-all duration-300"></div>
                        <div className="opacity-0 group-hover:opacity-100 absolute -top-12 left-1/2 -translate-x-1/2 bg-white text-slate-900 text-[10px] font-bold py-1.5 px-3 rounded-lg shadow-xl whitespace-nowrap z-50">
                          ₹{h * 420}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-6 px-1">
                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(m => (
                      <span key={m} className="text-[10px] text-slate-500 font-bold">{m}</span>
                    ))}
                  </div>
                </div>
                
                <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="font-bold text-slate-900">Alert Center</h4>
                    <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-[10px] font-bold">3</span>
                  </div>
                  <div className="space-y-4">
                    {ALERTS.map(alert => (
                      <div key={alert.id} className="group p-4 rounded-2xl border border-slate-50 bg-slate-50/50 hover:bg-white hover:shadow-sm transition-all cursor-pointer">
                        <div className="flex gap-4">
                          <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${alert.type === 'critical' ? 'bg-rose-500 animate-pulse' : 'bg-amber-400'}`}></div>
                          <div>
                            <p className="text-sm font-bold text-slate-800 leading-tight group-hover:text-indigo-600">{alert.text}</p>
                            <span className="text-[10px] text-slate-400 font-bold mt-1 block">{alert.time}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'inventory' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Inventory Intelligence</h3>
                    <p className="text-slate-500 text-xs font-medium">Real-time tracking and automated alerts</p>
                  </div>
                  <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-50 transition-colors">
                      <History size={14} /> Log
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-colors">
                      <PlusCircle size={14} /> New Product
                    </button>
                  </div>
               </div>

               {/* LOW STOCK DYNAMIC ALERTS */}
               <div className="mb-10">
                 <div className="flex items-center gap-2 mb-4">
                   <AlertTriangle size={16} className="text-rose-500" />
                   <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">Attention Required</h4>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {INVENTORY.filter(item => item.stock < 50).map((item, idx) => (
                      <div 
                        key={idx} 
                        className={`p-5 rounded-2xl border flex flex-col justify-between group relative overflow-hidden transition-all hover:shadow-lg ${
                          item.stock < 10 
                          ? 'bg-rose-50 border-rose-100/50' 
                          : 'bg-amber-50 border-amber-100/50'
                        }`}
                      >
                        <div className="relative z-10">
                          <div className="flex justify-between items-start mb-3">
                            <span className={`px-2 py-1 rounded text-[10px] font-black uppercase tracking-wider ${
                              item.stock < 10 ? 'bg-rose-500 text-white' : 'bg-amber-500 text-white'
                            }`}>
                              {item.stock < 10 ? 'Critical' : 'Low Stock'}
                            </span>
                            <span className="text-[10px] font-bold text-slate-400">ID: #INV-{1024 + idx}</span>
                          </div>
                          <h5 className="font-extrabold text-slate-900 text-sm mb-1">{item.name}</h5>
                          <p className={`text-xl font-black ${item.stock < 10 ? 'text-rose-600' : 'text-amber-600'}`}>
                            {item.stock} <span className="text-[10px] font-bold uppercase text-slate-400">units remaining</span>
                          </p>
                        </div>
                        
                        <div className="mt-5 flex gap-2 relative z-10">
                          <button 
                            onClick={() => handleRestock(item.name)}
                            disabled={restockingItems.includes(item.name)}
                            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-extrabold transition-all ${
                              item.stock < 10 
                              ? 'bg-rose-600 text-white hover:bg-rose-700' 
                              : 'bg-amber-600 text-white hover:bg-amber-700'
                            }`}
                          >
                            {restockingItems.includes(item.name) ? (
                              <>
                                <RefreshCw size={14} className="animate-spin" />
                                Ordering...
                              </>
                            ) : (
                              <>
                                <ShoppingCart size={14} />
                                Quick Restock
                              </>
                            )}
                          </button>
                          <button className="bg-white/50 backdrop-blur-sm border border-slate-200 p-2.5 rounded-xl hover:bg-white transition-colors">
                            <ChevronRight size={14} className="text-slate-500" />
                          </button>
                        </div>

                        {/* Visual Pulse for Critical */}
                        {item.stock < 10 && (
                          <div className="absolute -top-4 -right-4 w-12 h-12 bg-rose-500/10 rounded-full animate-ping opacity-75"></div>
                        )}
                      </div>
                    ))}
                 </div>
               </div>

               <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm">
                 <div className="overflow-x-auto">
                   <table className="w-full text-left">
                     <thead>
                       <tr className="bg-slate-50/50 border-b border-slate-100">
                         <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Product</th>
                         <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Stock Level</th>
                         <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest text-center">Status</th>
                         <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
                       </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-50">
                       {INVENTORY.map((item, i) => (
                         <tr key={i} className="group hover:bg-slate-50/30 transition-colors">
                           <td className="px-8 py-6 pr-4">
                             <div className="flex items-center gap-4">
                               <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:scale-110 transition-transform">
                                 <Package size={22} />
                               </div>
                               <div>
                                 <span className="font-bold text-slate-900 block">{item.name}</span>
                                 <span className="text-[10px] text-slate-400 font-bold uppercase">SKU-{5000 + i}</span>
                               </div>
                             </div>
                           </td>
                           <td className="px-8 py-6 pr-4">
                              <div className="flex items-center gap-4 min-w-[200px]">
                                <div className="flex-1 bg-slate-100 h-2 rounded-full overflow-hidden">
                                  <div className={`h-full rounded-full transition-all duration-1000 ${
                                    item.stock === 0 ? 'bg-slate-300' :
                                    item.stock < 10 ? 'bg-rose-500' : 
                                    item.stock < 50 ? 'bg-amber-500' : 'bg-emerald-500'}`} 
                                    style={{ width: `${Math.min(item.stock, 100)}%` }}
                                  ></div>
                                </div>
                                <span className={`text-sm font-black w-8 text-right ${
                                  item.stock === 0 ? 'text-slate-400' :
                                  item.stock < 10 ? 'text-rose-600' : 
                                  item.stock < 50 ? 'text-amber-600' : 'text-emerald-600'
                                }`}>
                                  {item.stock}
                                </span>
                              </div>
                           </td>
                           <td className="px-8 py-6 pr-4 text-center">
                              <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase border tracking-widest ${item.color}`}>
                                {item.status}
                              </span>
                           </td>
                           <td className="px-8 py-6 text-right">
                              <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="p-2 hover:bg-indigo-50 text-indigo-600 rounded-lg transition-colors"><BarChart3 size={16} /></button>
                                <button className="p-2 hover:bg-slate-100 text-slate-600 rounded-lg transition-colors"><RefreshCw size={16} /></button>
                              </div>
                           </td>
                         </tr>
                       ))}
                     </tbody>
                   </table>
                 </div>
               </div>
            </div>
          )}

          {activeTab === 'ai' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-[2rem] p-8 text-white flex flex-col justify-between group overflow-hidden relative">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-125 transition-transform duration-1000"></div>
                 <div className="relative z-10">
                   <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6">
                      <Sparkles size={28} />
                   </div>
                   <h3 className="text-2xl font-extrabold mb-4">AI Demand Prediction</h3>
                   <p className="text-indigo-100 leading-relaxed text-sm opacity-90">
                     We've detected a <span className="font-bold text-white">high probability (84%)</span> of increased demand for bottled water and sunscreen this weekend due to predicted heatwaves.
                   </p>
                 </div>
                 <div className="relative z-10 mt-10 bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-5">
                   <div className="flex justify-between items-center">
                     <div>
                       <p className="text-[10px] font-bold uppercase text-indigo-200">Recommendation</p>
                       <p className="font-bold">Increase stock by 35%</p>
                     </div>
                     <button className="bg-white text-indigo-600 px-5 py-2.5 rounded-xl font-bold text-xs hover:bg-indigo-50 transition-colors">Apply Now</button>
                   </div>
                 </div>
              </div>

              <div className="bg-slate-50 rounded-[2rem] p-8 border border-slate-100">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-white shadow-sm rounded-xl flex items-center justify-center text-indigo-600">
                    <BrainCircuit size={20} />
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-900">Profit Optimization</h3>
                </div>
                <div className="space-y-6">
                  <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                     <p className="text-sm font-bold text-slate-800 mb-2">Segment analysis: Snacks</p>
                     <p className="text-xs text-slate-500 leading-relaxed">Your margins on 'Lays Family Pack' are 3% lower than industry average. Switching to 'Supplier B' could save you ₹4,200/mo.</p>
                     <div className="mt-4 flex gap-2">
                        <button className="flex-1 bg-indigo-50 text-indigo-600 py-2 rounded-lg text-[10px] font-bold">Compare Suppliers</button>
                        <button className="flex-1 bg-slate-900 text-white py-2 rounded-lg text-[10px] font-bold">Adjust Pricing</button>
                     </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-emerald-50 border border-emerald-100 rounded-2xl">
                    <div className="flex items-center gap-3">
                      <TrendingUp className="text-emerald-600" size={18} />
                      <span className="text-xs font-bold text-emerald-700">Optimal Price Found: ₹85.00</span>
                    </div>
                    <span className="text-[10px] font-black text-emerald-800 bg-white px-2 py-1 rounded-md">+₹12.50 margin</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ChevronRight = ({ size, className }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m9 18 6-6-6-6"/>
  </svg>
);

const BentoFeature = ({ title, desc, icon: Icon, className, children }: any) => (
  <div className={`group relative overflow-hidden rounded-[2.5rem] p-10 border transition-all duration-700 hover:-translate-y-2 ${className}`}>
    <div className="relative z-10">
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg mb-8 group-hover:scale-110 transition-transform duration-500">
        <Icon size={28} />
      </div>
      <h3 className="text-3xl font-extrabold mb-4 tracking-tight leading-tight">{title}</h3>
      <p className="text-lg font-medium opacity-80 leading-relaxed mb-8">{desc}</p>
      {children}
    </div>
    {/* Animated Decorative Element */}
    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000"></div>
  </div>
);

const App = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-24 lg:pt-56 lg:pb-40 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 inset-x-0 h-[1000px] bg-gradient-to-b from-indigo-50/50 via-white to-white -z-10"></div>
        <div className="absolute -top-24 -right-24 w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-[120px] -z-10 animate-pulse"></div>
        <div className="absolute top-[20%] -left-24 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[100px] -z-10"></div>

        <div className="max-w-7xl mx-auto px-6 text-center">
          <SmartBadge text="The Retail Revolution" icon={Sparkles} />
          
          <h1 className="text-5xl lg:text-8xl font-[900] tracking-tight text-slate-900 mb-8 leading-[1.05]">
            Run your store like a <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600">
              Tech Startup.
            </span>
          </h1>
          
          <p className="max-w-3xl mx-auto text-xl font-medium text-slate-500 leading-relaxed mb-12">
            The intelligent operating system that replaces your billing machine, your spreadsheets, and your guesswork. One platform to rule your entire retail empire.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20">
            <button className="group w-full sm:w-auto bg-slate-900 text-white px-10 py-5 rounded-[2rem] text-lg font-bold hover:bg-slate-800 transition-all hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center gap-2">
              Start Free Trial
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="w-full sm:w-auto bg-white border border-slate-200 text-slate-900 px-10 py-5 rounded-[2rem] text-lg font-bold hover:bg-slate-50 hover:shadow-lg transition-all flex items-center justify-center gap-2">
              <Calendar size={20} className="text-indigo-600" />
              Book a Demo
            </button>
          </div>

          <InteractiveDashboard />
        </div>
      </section>

      {/* TRUST TICKER */}
      <section className="py-16 border-y border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center mb-10">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Backing the backbone of Bharat</p>
        </div>
        <div className="flex overflow-hidden group">
          <div className="animate-marquee whitespace-nowrap flex gap-20 py-4 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
            {[1, 2, 3, 4, 5, 1, 2, 3, 4, 5].map((i, idx) => (
              <div key={idx} className="flex items-center gap-3 text-2xl font-black text-slate-800 tracking-tighter">
                <Store className="text-indigo-600" />
                {['RELIANCE FRESH', 'NATURALS', 'CHAIPOS', 'BLUE TOKAI', 'BIG BASKET'][i-1]}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BENTO GRID FEATURES */}
      <section id="features" className="py-32 bg-[#FAFAFB]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20">
            <SmartBadge text="Capabilities" />
            <h2 className="text-4xl lg:text-6xl font-black text-slate-900 tracking-tight">Everything you need, <br/>perfectly integrated.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
            <BentoFeature 
              className="md:col-span-4 bg-slate-900 text-white border-slate-800"
              title="Hyper-Unified Sales Tracking"
              desc="Real-time syncing from Amazon, Shopify, Zomato, Swiggy, and your physical counter. No more reconciliation headaches."
              icon={Layers}
            >
              <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Store', val: '72%', color: 'bg-indigo-500' },
                  { label: 'Online', val: '18%', color: 'bg-indigo-400' },
                  { label: 'Zomato', val: '7%', color: 'bg-rose-500' },
                  { label: 'Other', val: '3%', color: 'bg-slate-700' },
                ].map((p, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 p-4 rounded-2xl">
                    <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">{p.label}</p>
                    <p className="text-xl font-bold">{p.val}</p>
                    <div className="mt-2 w-full h-1 bg-white/10 rounded-full overflow-hidden">
                      <div className={`h-full ${p.color}`} style={{ width: p.val }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </BentoFeature>

            <BentoFeature 
              className="md:col-span-2 bg-indigo-600 text-white border-indigo-500"
              title="AI Stock Genius"
              desc="Our AI learns your sales cycles and tells you when to restock before you even notice."
              icon={BrainCircuit}
            >
              <div className="mt-6 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                 <div className="flex items-center gap-3 mb-3">
                   <div className="w-8 h-8 rounded-full bg-amber-400 text-white flex items-center justify-center font-bold">!</div>
                   <p className="text-xs font-bold leading-tight">Stock for 'Amul Milk' will run out by 4 PM today.</p>
                 </div>
                 <button className="w-full bg-white text-indigo-600 py-2 rounded-lg text-xs font-bold">Automate Reorder</button>
              </div>
            </BentoFeature>

            <BentoFeature 
              className="md:col-span-3 bg-white text-slate-900 border-slate-200"
              title="GST Filing on Autopilot"
              desc="Stop paying for manual accounting. We generate ready-to-file GST reports directly from your sales data."
              icon={CheckCircle2}
            >
              <div className="mt-6 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center justify-between">
                 <div>
                   <p className="text-[10px] font-black uppercase text-emerald-600 mb-1">Status</p>
                   <p className="text-sm font-bold text-slate-800 tracking-tight">GSTR-1 Ready for Jan</p>
                 </div>
                 <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-emerald-500 shadow-sm">
                   <CheckCircle2 size={24} />
                 </div>
              </div>
            </BentoFeature>

            <BentoFeature 
              className="md:col-span-3 bg-white text-slate-900 border-slate-200 shadow-sm"
              title="Loyalty Engine"
              desc="Identify your top 1% customers and send them automated WhatsApp rewards to keep them coming back."
              icon={Users}
            >
               <div className="mt-6 flex -space-x-3">
                 {[1,2,3,4,5].map(i => (
                   <img key={i} src={`https://picsum.photos/seed/${i+40}/50/50`} className="w-12 h-12 rounded-full border-4 border-white shadow-md" alt="User" />
                 ))}
                 <div className="w-12 h-12 rounded-full bg-indigo-600 text-white border-4 border-white shadow-md flex items-center justify-center font-bold text-xs">+12k</div>
               </div>
            </BentoFeature>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
             <SmartBadge text="Pricing" />
             <h2 className="text-4xl lg:text-6xl font-black text-slate-900 tracking-tight">One tool. One fair price.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
             <div className="p-10 rounded-[2.5rem] border border-slate-100 bg-slate-50/50 flex flex-col">
                <h3 className="text-xl font-bold mb-2">Starter</h3>
                <p className="text-slate-500 text-sm mb-6 font-medium">For micro-retailers</p>
                <div className="text-5xl font-black mb-8">₹0<span className="text-lg text-slate-400 font-bold ml-2">Forever</span></div>
                <ul className="space-y-4 mb-10 text-sm font-medium text-slate-600">
                  <li className="flex gap-3"><CheckCircle2 className="text-slate-300" size={18} /> Basic Billing</li>
                  <li className="flex gap-3"><CheckCircle2 className="text-slate-300" size={18} /> Daily Email Report</li>
                  <li className="flex gap-3"><CheckCircle2 className="text-slate-300" size={18} /> 1 Store Location</li>
                </ul>
                <button className="mt-auto w-full py-4 border-2 border-slate-200 rounded-2xl font-bold hover:border-slate-900 transition-colors">Start Free</button>
             </div>

             <div className="p-10 rounded-[2.5rem] bg-indigo-600 text-white shadow-2xl shadow-indigo-200 flex flex-col relative md:-translate-y-4">
                <div className="absolute top-0 right-10 -translate-y-1/2 bg-white text-indigo-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">Popular Choice</div>
                <h3 className="text-xl font-bold mb-2">Growth</h3>
                <p className="text-indigo-200 text-sm mb-6 font-medium">For ambitious store owners</p>
                <div className="text-5xl font-black mb-8">₹999<span className="text-lg text-indigo-300 font-bold ml-2">/mo</span></div>
                <ul className="space-y-4 mb-10 text-sm font-medium">
                  <li className="flex gap-3"><CheckCircle2 className="text-indigo-400" size={18} /> Unlimited Sales Volume</li>
                  <li className="flex gap-3"><CheckCircle2 className="text-indigo-400" size={18} /> AI Inventory Alerts</li>
                  <li className="flex gap-3"><CheckCircle2 className="text-indigo-400" size={18} /> Unified Multi-channel Sync</li>
                  <li className="flex gap-3"><CheckCircle2 className="text-indigo-400" size={18} /> Priority WhatsApp Support</li>
                </ul>
                <button className="mt-auto w-full py-4 bg-white text-indigo-600 rounded-2xl font-bold hover:bg-indigo-50 transition-all shadow-lg">Start 14-Day Free Trial</button>
             </div>

             <div className="p-10 rounded-[2.5rem] border border-slate-100 bg-slate-50/50 flex flex-col">
                <h3 className="text-xl font-bold mb-2">Franchise</h3>
                <p className="text-slate-500 text-sm mb-6 font-medium">For chain management</p>
                <div className="text-5xl font-black mb-8">₹2,999<span className="text-lg text-slate-400 font-bold ml-2">/mo</span></div>
                <ul className="space-y-4 mb-10 text-sm font-medium text-slate-600">
                  <li className="flex gap-3"><CheckCircle2 className="text-indigo-600" size={18} /> Everything in Growth</li>
                  <li className="flex gap-3"><CheckCircle2 className="text-indigo-600" size={18} /> Multi-store Dashboard</li>
                  <li className="flex gap-3"><CheckCircle2 className="text-indigo-600" size={18} /> Dedicated Account Manager</li>
                  <li className="flex gap-3"><CheckCircle2 className="text-indigo-600" size={18} /> API Access</li>
                </ul>
                <button className="mt-auto w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-lg">Contact Sales</button>
             </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 px-6">
         <div className="max-w-7xl mx-auto bg-slate-950 rounded-[3rem] p-12 lg:p-24 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 via-transparent to-purple-500/10 -z-0"></div>
            <div className="relative z-10">
              <h2 className="text-4xl lg:text-7xl font-[900] text-white tracking-tight mb-8">Ready to dash?</h2>
              <p className="text-slate-400 text-lg lg:text-xl font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
                Join 2,000+ modern retailers who have reclaimed their time and boosted their profits with DukaanDash.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button className="w-full sm:w-auto bg-indigo-600 text-white px-12 py-5 rounded-full text-lg font-bold hover:bg-indigo-500 hover:shadow-2xl shadow-indigo-500/20 transition-all">
                  Start Your Journey
                </button>
                <button className="w-full sm:w-auto bg-white/10 backdrop-blur-md border border-white/10 text-white px-12 py-5 rounded-full text-lg font-bold hover:bg-white/20 transition-all">
                  Talk to an Expert
                </button>
              </div>
              <p className="mt-10 text-slate-500 text-sm font-bold flex items-center justify-center gap-2 uppercase tracking-widest">
                <ShieldCheck size={16} /> No credit card required • Secure 256-bit encryption
              </p>
            </div>
         </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white pt-24 pb-12 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-8 group cursor-pointer">
                <div className="bg-indigo-600 text-white p-2 rounded-xl">
                  <LayoutDashboard size={18} />
                </div>
                <span className="text-xl font-extrabold tracking-tight text-slate-900">
                  DukaanDash
                </span>
              </div>
              <p className="text-sm font-medium text-slate-500 leading-relaxed mb-8">
                Empowering retailers with the tools of tomorrow. Built with love in Bengaluru for the world.
              </p>
              <div className="flex gap-4">
                 {[1,2,3].map(i => <div key={i} className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all cursor-pointer"><Command size={16} /></div>)}
              </div>
            </div>

            <div>
              <h4 className="text-slate-900 font-bold mb-6 uppercase text-[10px] tracking-widest">Platform</h4>
              <ul className="space-y-4 text-sm font-medium text-slate-500">
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Integrations</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Dashboard Preview</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Mobile App</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Security</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-slate-900 font-bold mb-6 uppercase text-[10px] tracking-widest">Company</h4>
              <ul className="space-y-4 text-sm font-medium text-slate-500">
                <li><a href="#" className="hover:text-indigo-600 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Press Kit</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-slate-900 font-bold mb-6 uppercase text-[10px] tracking-widest">Contact</h4>
              <ul className="space-y-4 text-sm font-medium text-slate-500">
                <li>hello@dukaandash.com</li>
                <li>+91 (800) 123-DASH</li>
                <li>12th Main, HSR Layout, BLR</li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4">
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">© 2026 DukaanDash Technologies Pvt Ltd.</p>
             <div className="flex gap-8 text-[10px] font-black uppercase text-slate-400 tracking-widest">
               <a href="#" className="hover:text-indigo-600">Privacy</a>
               <a href="#" className="hover:text-indigo-600">Terms</a>
               <a href="#" className="hover:text-indigo-600">Compliance</a>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
