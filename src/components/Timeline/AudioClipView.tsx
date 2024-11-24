import { useRef, useEffect } from "react";
import { AudioClip } from "@/types";

interface AudioClipViewProps {
  clip: AudioClip;
}

function AudioClipView({ clip }: AudioClipViewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!clip.audioBuffer || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Log to verify we're getting data
    console.log("Drawing waveform:", {
      bufferLength: clip.audioBuffer.length,
      canvasWidth: canvas.width,
      canvasHeight: canvas.height,
    });

    const data = clip.audioBuffer.getChannelData(0);
    const step = Math.ceil(data.length / canvas.width);
    const amp = canvas.height / 2;

    // Clear with a background color to verify canvas is working
    ctx.fillStyle = "#334155"; // slate-700
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.strokeStyle = "#94a3b8"; // slate-400
    ctx.lineWidth = 2;

    for (let i = 0; i < canvas.width; i++) {
      let min = 1.0;
      let max = -1.0;

      for (let j = 0; j < step; j++) {
        const index = i * step + j;
        if (index < data.length) {
          const datum = data[index];
          if (datum < min) min = datum;
          if (datum > max) max = datum;
        }
      }

      const y1 = (1 + min) * amp;
      const y2 = (1 + max) * amp;

      if (i === 0) {
        ctx.moveTo(i, y1);
      } else {
        ctx.lineTo(i, y1);
        ctx.lineTo(i, y2);
      }
    }

    ctx.stroke();
  }, [clip.audioBuffer]);

  return (
    <div
      className="absolute bg-blue-600/50 rounded h-20 mt-2 cursor-move"
      style={{
        left: `${clip.start}px`,
        width: `${clip.width}px`,
      }}
    >
      <div className="px-2 py-1 text-xs truncate">{clip.name}</div>
      <div className="flex items-center justify-center h-12">
        <canvas
          ref={canvasRef}
          width={clip.width}
          height={48}
          className="w-full h-full"
        />
      </div>
    </div>
  );
}

export { AudioClipView };
