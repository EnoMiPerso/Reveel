interface Props { onOpen: () => void; hasReviewed?: boolean; }

export default function FeedbackButton({ onOpen, hasReviewed }: Props) {
  if (hasReviewed) {
    return (
      <div className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold"
        style={{ background: 'rgba(13,148,136,0.10)', color: '#0d9488', border: '1px solid rgba(13,148,136,0.18)' }}>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
        Reviewed
      </div>
    );
  }

  return (
    <button onClick={onOpen} className="tap-scale relative overflow-hidden flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium"
      style={{
        background: 'rgba(255,255,255,0.72)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.90)',
        boxShadow: '0 1px 8px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.95)',
        color: '#6b7280',
      }}>
      {/* subtle shimmer */}
      <span className="absolute inset-0 pointer-events-none rounded-full" style={{
        background: 'linear-gradient(105deg,transparent 30%,rgba(255,255,255,0.55) 50%,transparent 70%)',
        animation: 'kpiGlint 4s ease-in-out infinite',
      }}/>
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'relative' }}>
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
      </svg>
      <span style={{ position: 'relative' }}>Give feedback</span>
    </button>
  );
}
