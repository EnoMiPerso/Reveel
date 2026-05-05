interface Props {
  message: string;
  detail?: string;
  tag?: string;
  className?: string;
}

export default function TruthCard({ message, detail, tag = 'TRUTH', className = '' }: Props) {
  return (
    <div className={`truth-card irid-overlay rounded-2xl px-4 py-4 ${className}`}>
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-2.5">
          <span className="text-[10px] font-bold tracking-widest uppercase text-[#7c6ed0] bg-[#7c6ed0]/15 rounded-full px-2.5 py-0.5 border border-[#7c6ed0]/20">
            {tag}
          </span>
        </div>
        <p className="text-white font-semibold text-sm leading-relaxed">{message}</p>
        {detail && <p className="text-white/50 text-xs mt-1.5 leading-relaxed">{detail}</p>}
      </div>
    </div>
  );
}
