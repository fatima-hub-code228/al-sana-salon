import { Eye, Sparkles } from 'lucide-react';

interface ExperienceControlsProps {
  reducedMotion: boolean;
  onToggleReducedMotion: () => void;
  forceFallback2D: boolean;
  onToggleFallback2D: () => void;
}

export function ExperienceControls({
  reducedMotion,
  onToggleReducedMotion,
  forceFallback2D,
  onToggleFallback2D,
}: ExperienceControlsProps) {
  return (
    <div
      className="fixed right-4 bottom-4 z-30 flex items-center gap-2 rounded-xl border border-[#E5CAD3] bg-[#FDF9F7]/94 px-3 py-1.5 shadow-sm"
      role="region"
      aria-label="Visual accessibility controls"
    >
      <button
        type="button"
        onClick={onToggleReducedMotion}
        aria-pressed={reducedMotion}
        className="inline-flex min-h-[36px] items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium text-[#4C363F] transition-colors hover:bg-[#F7E6EC] whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#8F4E61]"
      >
        <Sparkles className="h-3.5 w-3.5 text-[#8F4E61]" aria-hidden="true" />
        <span>{reducedMotion ? 'Motion: Calm' : 'Motion: Full'}</span>
      </button>

      <span className="h-4 w-[1px] bg-[#E5CAD3]" aria-hidden="true" />

      <button
        type="button"
        onClick={onToggleFallback2D}
        aria-pressed={forceFallback2D}
        className="inline-flex min-h-[36px] items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium text-[#4C363F] transition-colors hover:bg-[#F7E6EC] whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#8F4E61]"
      >
        <Eye className="h-3.5 w-3.5 text-[#8F4E61]" aria-hidden="true" />
        <span>{forceFallback2D ? '2D View' : '3D Palace'}</span>
      </button>
    </div>
  );
}
