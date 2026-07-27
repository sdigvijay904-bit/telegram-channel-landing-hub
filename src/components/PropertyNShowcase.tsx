import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, TrendingUp, Wallet, ArrowUpRight, CheckCircle2, Building2 } from 'lucide-react';

export function PropertyNShowcase() {
  const [tickerIndex, setTickerIndex] = useState(0);

  const recharges = [
    { user: 'Kiran***290', amount: '₹490' },
    { user: 'Rahul***814', amount: '₹2,000' },
    { user: 'Amit***503', amount: '₹500' },
    { user: 'Priya***119', amount: '₹1,500' },
    { user: 'Suresh***672', amount: '₹490' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % recharges.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const currentRecharge = recharges[tickerIndex];

  return (
    <div className="w-full space-y-3.5 my-3 text-left">
      {/* Live Recharged Notification Ticker */}
      <div className="w-full bg-emerald-50/95 border border-emerald-200 rounded-xl px-3.5 py-2 flex items-center justify-between text-xs shadow-sm">
        <div className="flex items-center space-x-2 overflow-hidden">
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600"></span>
          </span>
          <motion.p
            key={tickerIndex}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="text-emerald-900 font-medium truncate"
          >
            <strong className="text-slate-900 font-extrabold">{currentRecharge.user}</strong> Recharged{' '}
            <span className="text-emerald-700 font-black">{currentRecharge.amount}</span>
          </motion.p>
        </div>
        <span className="px-1.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-300 shrink-0 ml-2">
          LIVE
        </span>
      </div>

      {/* DLF Luxury Villas & Residencies Banner Card */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm group">
        <div className="relative h-52 sm:h-60 w-full overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80"
            alt="DLF Luxury Villas & Residencies"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        <div className="p-3.5 sm:p-4 bg-white border-t border-slate-100 space-y-1">
          <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight leading-tight flex items-center gap-1.5">
            <Building2 className="w-4 h-4 text-emerald-600 shrink-0" />
            DLF Luxury Villas & Residencies
          </h3>
          <p className="text-xs text-slate-600 font-medium leading-relaxed">
            Secure property crowdfunding plans fully compliant with real-estate and financial guidelines.
          </p>
        </div>
      </div>

      {/* Account Balance Summary Cards */}
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-center text-emerald-600 mb-1">
            <Wallet className="w-4 h-4" />
          </div>
          <p className="text-xs font-black text-slate-900 sm:text-sm">₹19,620</p>
          <p className="text-[9px] sm:text-[10px] font-bold text-slate-500 uppercase tracking-wider">BALANCE</p>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-center text-amber-600 mb-1">
            <ArrowUpRight className="w-4 h-4" />
          </div>
          <p className="text-xs font-black text-slate-900 sm:text-sm">₹20,250</p>
          <p className="text-[9px] sm:text-[10px] font-bold text-slate-500 uppercase tracking-wider">RECHARGED</p>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-center text-blue-600 mb-1">
            <TrendingUp className="w-4 h-4" />
          </div>
          <p className="text-xs font-black text-slate-900 sm:text-sm">₹269</p>
          <p className="text-[9px] sm:text-[10px] font-bold text-slate-500 uppercase tracking-wider">INCOME</p>
        </div>
      </div>

      {/* Active Running Investment Plans */}
      <div className="rounded-2xl bg-slate-50 border border-slate-200 p-3.5 space-y-2.5 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-1.5 h-3.5 bg-emerald-500 rounded-full" />
            Active Plans & Yields
          </span>
          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
            3 Running
          </span>
        </div>

        <div className="space-y-2 text-xs">
          {/* Plan 1 */}
          <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="font-bold text-slate-900">Prestige Waterfront Villa Fund</p>
              <p className="text-[11px] text-slate-500">Slot 1 • Price: <strong className="text-emerald-700 font-bold">₹2,000</strong></p>
            </div>
            <div className="text-right">
              <span className="inline-block px-1.5 py-0.5 text-[9px] font-extrabold bg-emerald-100 text-emerald-800 rounded border border-emerald-300">
                ₹225/day
              </span>
            </div>
          </div>

          {/* Plan 2 */}
          <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="font-bold text-slate-900">Sovereign Commercial Plaza Fund</p>
              <p className="text-[11px] text-slate-500">Slot 1 • Price: <strong className="text-emerald-700 font-bold">₹500</strong></p>
            </div>
            <div className="text-right">
              <span className="inline-block px-1.5 py-0.5 text-[9px] font-extrabold bg-emerald-100 text-emerald-800 rounded border border-emerald-300">
                Active
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
