import { TimeMarkers } from "./TimeMarkers";
import { AudioClipView } from "./AudioClipView";
import { AudioClip } from "../../types";

interface TimelineProps {
  clips: AudioClip[];
}

function Timeline({ clips }: TimelineProps) {
  return (
    <div className="relative h-32 bg-gray-800 rounded-lg overflow-hidden">
      <TimeMarkers markerCount={10} />
      <div className="relative h-24 border-b border-gray-700">
        {clips.map((clip) => (
          <AudioClipView key={clip.id} clip={clip} />
        ))}
      </div>
    </div>
  );
}

export { Timeline };
