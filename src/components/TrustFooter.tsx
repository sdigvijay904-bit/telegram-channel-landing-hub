import React from 'react';
import { ShieldCheck, Lock } from 'lucide-react';

interface TrustFooterProps {
  channelTitle: string;
  onOpenAdmin: () => void;
}

export function TrustFooter({ channelTitle, onOpenAdmin }: TrustFooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full mt-2 pt-2 border-t border-white/10 text-center space-y-1.5 pb-1">
      {/* Trust Icons Row */}
      <div className="flex items-center justify-center space-x-3 text-[11px] font-semibold text-blue-200/90">
        <span className="flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Free Channel Access</span>
        </span>
        <span className="text-white/30">•</span>
        <span className="flex items-center gap-1">
          <Lock className="w-3.5 h-3.5 text-cyan-400" />
          <span>Verified Channel</span>
        </span>
      </div>

      {/* Clean Copyright Line with discrete double-click admin trigger */}
      <div className="flex items-center justify-center space-x-2 text-[11px] text-white/60 pt-0.5">
        <span 
          onDoubleClick={onOpenAdmin}
          className="cursor-default select-none hover:text-white/80 transition"
          title="Money Hub Official"
        >
          © {currentYear} {channelTitle || "Money Hub"} • All Rights Reserved
        </span>
      </div>
    </footer>
  );
}
