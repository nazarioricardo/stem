import React, { useState } from "react";
import { TransportControls } from "@/components/TransportControls";
import { Timeline } from "@/components/Timeline";
import { AudioClip } from "@/types";

const App: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
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
        onRecordToggle={() => setIsRecording(!isRecording)}
        onPlay={handlePlay}
        onStop={handleStop}
        onSave={handleSave}
      />
      <Timeline clips={clips} />
    </div>
  );
};

export default App;
