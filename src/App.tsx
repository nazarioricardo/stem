import { TransportControls } from "@/components/TransportControls";
import { Timeline } from "@/components/Timeline";
import { AudioClip } from "@/types";
import { useAudioRecorder } from "./hooks/useAudioRecorder";

const App: React.FC = () => {
  const {
    isRecording,
    isPlaying,
    hasRecordings,
    startRecording,
    stopRecording,
    playLastRecording,
    undoLastRecording,
  } = useAudioRecorder();

  const handleRecordToggle = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const clips = [{ id: 1, start: 100, width: 200, name: "Vocal Take 1" }];

  const handlePlay = () => {
    console.log("Play clicked");
  };

  const handleStop = () => {
    console.log("Stop clicked");
  };

  const handleSave = () => {
    console.log("Save clicked");
  };

  return (
    <div className="w-full h-screen bg-gray-900 text-white p-4">
      <TransportControls
        isRecording={isRecording}
        onRecordToggle={handleRecordToggle}
        onPlay={playLastRecording}
        onStop={stopRecording}
        onSave={handleSave}
      />
      <Timeline clips={clips} />
    </div>
  );
};

export default App;
