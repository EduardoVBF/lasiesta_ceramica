export default function FloatingProcessCard() {
  return (
    <div className="absolute -bottom-10 -left-10 backdrop-blur-xl bg-white/40 border border-white/30 rounded-[28px] px-8 py-6 shadow-2xl max-w-xs">
      <p className="text-sm uppercase tracking-[0.3em] text-[#8c6d5a] mb-3">
        Processo Manual
      </p>

      <p className="text-lg leading-relaxed text-[#5c3d2e]">
        Cada peça nasce lentamente, moldada à mão e carregada de presença.
      </p>
    </div>
  );
}
