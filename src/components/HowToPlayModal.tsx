import React from 'react';
import { X, Sparkles, CheckCircle2, Navigation, Layers, Lightbulb } from 'lucide-react';

interface HowToPlayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HowToPlayModal: React.FC<HowToPlayModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      id="how-to-play-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in select-none"
    >
      <div className="relative w-full max-w-md max-h-[85vh] rounded-3xl bg-[#041d12]/95 border border-emerald-500/30 p-5 shadow-[0_0_50px_rgba(16,185,129,0.3)] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shadow-inner">
              <Sparkles className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <span className="text-[10px] font-bold tracking-widest text-emerald-300 uppercase block">Field Manual</span>
              <h2 className="text-base font-black italic tracking-tight text-white uppercase">RULES & STRATEGY</h2>
            </div>
          </div>

          <button
            id="btn-close-how-to-play"
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 border border-white/20 text-white/70 hover:text-white hover:bg-white/20 active:scale-95 transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto pr-1 py-3 flex flex-col gap-2.5">
          {/* Rule 1 */}
          <div className="p-3 rounded-2xl bg-white/10 border border-white/15 flex gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/25 text-emerald-300 flex items-center justify-center font-black text-sm shrink-0 font-mono">
              01
            </div>
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-0.5">One Continuous Stroke</h3>
              <p className="text-[11px] text-emerald-100/70 leading-relaxed">
                Connect all nodes and complete every single line vector without lifting your finger or cursor.
              </p>
            </div>
          </div>

          {/* Rule 2 */}
          <div className="p-3 rounded-2xl bg-white/10 border border-white/15 flex gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/25 text-emerald-300 flex items-center justify-center font-black text-sm shrink-0 font-mono">
              02
            </div>
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-0.5">No Retracing Lines</h3>
              <p className="text-[11px] text-emerald-100/70 leading-relaxed">
                You cannot go over the same stroke path twice (unless it is marked as a special 2x Double Line).
              </p>
            </div>
          </div>

          {/* Rule 3: Special lines */}
          <div className="p-3 rounded-2xl bg-white/10 border border-white/15 flex gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/30 text-emerald-300 flex items-center justify-center shrink-0">
              <Navigation className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-emerald-300 uppercase tracking-wider mb-0.5">One-Way Chevrons</h3>
              <p className="text-[11px] text-emerald-100/70 leading-relaxed">
                Lines marked with directional chevrons can only be crossed in the indicated vector direction.
              </p>
            </div>
          </div>

          {/* Rule 4: Double lines */}
          <div className="p-3 rounded-2xl bg-white/10 border border-white/15 flex gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/30 text-emerald-300 flex items-center justify-center shrink-0">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-emerald-300 uppercase tracking-wider mb-0.5">Double Lines (2x)</h3>
              <p className="text-[11px] text-emerald-100/70 leading-relaxed">
                Lines marked with 2x tracks must be traversed twice before the connection is completely locked.
              </p>
            </div>
          </div>

          {/* Pro tip */}
          <div className="p-3 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex gap-3 shadow-inner">
            <div className="w-8 h-8 rounded-xl bg-emerald-400 text-slate-950 flex items-center justify-center shrink-0 shadow">
              <Lightbulb className="w-4 h-4 fill-slate-950" />
            </div>
            <div>
              <h3 className="text-xs font-black text-emerald-300 uppercase tracking-wider mb-0.5">Eulerian Graph Secret</h3>
              <p className="text-[11px] text-white leading-relaxed">
                Count the lines connected to each dot (its degree). If a figure has dots with an odd number of lines, you must START at one odd dot and FINISH at the other!
              </p>
            </div>
          </div>
        </div>

        {/* Got it button */}
        <div className="pt-2">
          <button
            id="btn-got-it"
            onClick={onClose}
            className="w-full py-3 px-4 rounded-2xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black text-xs uppercase tracking-widest flex items-center justify-center gap-1.5 shadow-[0_0_20px_rgba(16,185,129,0.5)] active:scale-[0.98] transition-all cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>ACKNOWLEDGE & PLAY</span>
          </button>
        </div>
      </div>
    </div>
  );
};
