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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xl animate-in fade-in select-none"
    >
      <div className="relative w-full max-w-md max-h-[85vh] rounded-3xl bg-slate-950/95 border border-white/10 p-5 shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <span className="text-[10px] font-bold tracking-widest text-cyan-400 uppercase block">Field Manual</span>
              <h2 className="text-base font-black italic tracking-tight text-white uppercase">RULES & STRATEGY</h2>
            </div>
          </div>

          <button
            id="btn-close-how-to-play"
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 active:scale-95 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto pr-1 py-3 flex flex-col gap-2.5">
          {/* Rule 1 */}
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex gap-3">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-black text-sm shrink-0 font-mono">
              01
            </div>
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-0.5">One Continuous Stroke</h3>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Connect all nodes and complete every single line vector without lifting your finger or cursor.
              </p>
            </div>
          </div>

          {/* Rule 2 */}
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex gap-3">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-black text-sm shrink-0 font-mono">
              02
            </div>
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-0.5">No Retracing Lines</h3>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                You cannot go over the same stroke path twice (unless it is marked as a special 2x Double Line).
              </p>
            </div>
          </div>

          {/* Rule 3: Special lines */}
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <Navigation className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-0.5">One-Way Chevrons</h3>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Lines marked with directional chevrons can only be crossed in the indicated vector direction.
              </p>
            </div>
          </div>

          {/* Rule 4: Double lines */}
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex gap-3">
            <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-purple-300 uppercase tracking-wider mb-0.5">Double Lines (2x)</h3>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Lines marked with 2x tracks must be traversed twice before the connection is completely locked.
              </p>
            </div>
          </div>

          {/* Pro tip */}
          <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex gap-3">
            <div className="w-8 h-8 rounded-xl bg-cyan-400 text-slate-950 flex items-center justify-center shrink-0 shadow">
              <Lightbulb className="w-4 h-4 fill-slate-950" />
            </div>
            <div>
              <h3 className="text-xs font-black text-cyan-300 uppercase tracking-wider mb-0.5">Eulerian Graph Secret</h3>
              <p className="text-[11px] text-slate-300 leading-relaxed">
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
            className="w-full py-3 px-4 rounded-2xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs uppercase tracking-widest flex items-center justify-center gap-1.5 shadow-[0_0_20px_rgba(34,211,238,0.4)] active:scale-[0.98] transition-all"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>ACKNOWLEDGE & PLAY</span>
          </button>
        </div>
      </div>
    </div>
  );
};
