import { AudioClip } from "@/types";

interface AudioClipViewProps {
  clip: AudioClip;
}

function AudioClipView({ clip }: AudioClipViewProps) {
  return (
    <div
      className="absolute bg-blue-600 rounded h-20 mt-2 cursor-move"
      style={{
        left: `${clip.start}px`,
        width: `${clip.width}px`,
      }}
    >
      <div className="px-2 py-1 text-xs truncate">{clip.name}</div>
      <div className="flex items-center justify-center h-12">
        <svg viewBox="0 0 100 20" className="w-full h-full">
          <path
            d="M0 10 Q25 5, 50 10 T 100 10"
            stroke="rgba(255,255,255,0.5)"
            fill="none"
          />
        </svg>
      </div>
    </div>
  );
}

export { AudioClipView };
