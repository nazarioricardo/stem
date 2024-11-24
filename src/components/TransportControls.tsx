import { Play, Square, Mic, Save } from "lucide-react";

interface TransportControlsProps {
  isRecording: boolean;
  onRecordToggle: () => void;
  onPlay: () => void;
  onStop: () => void;
  onSave: () => void;
}

function TransportControls({
  isRecording,
  onRecordToggle,
  onPlay,
  onStop,
  onSave,
}: TransportControlsProps) {
  return (
    <div className="flex items-center gap-4 mb-6 p-4 bg-gray-800 rounded-lg">
      <button onClick={onPlay} className="p-2 hover:bg-gray-700 rounded">
        <Play className="w-6 h-6" />
      </button>
      <button onClick={onStop} className="p-2 hover:bg-gray-700 rounded">
        <Square className="w-6 h-6" />
      </button>
      <button
        onClick={onRecordToggle}
        className={`p-2 rounded ${isRecording ? "bg-red-600" : "hover:bg-gray-700"}`}
      >
        <Mic className="w-6 h-6" />
      </button>
      <button onClick={onSave} className="p-2 hover:bg-gray-700 rounded">
        <Save className="w-6 h-6" />
      </button>
      <div className="ml-4 font-mono">00:00:00</div>
    </div>
  );
}
export { TransportControls };
