import { useState, useRef } from "react";

interface AudioRecorderState {
  isRecording: boolean;
  isPlaying: boolean;
  recordings: AudioBuffer[];
}

export const useAudioRecorder = () => {
  const [state, setState] = useState<AudioRecorderState>({
    isRecording: false,
    isPlaying: false,
    recordings: [],
  });

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        const arrayBuffer = await audioBlob.arrayBuffer();

        if (!audioContextRef.current) {
          audioContextRef.current = new AudioContext();
        }

        const audioBuffer =
          await audioContextRef.current.decodeAudioData(arrayBuffer);

        setState((prev) => ({
          ...prev,
          isRecording: false,
          recordings: [...prev.recordings, audioBuffer],
        }));
      };

      mediaRecorderRef.current.start();
      setState((prev) => ({ ...prev, isRecording: true }));
    } catch (err) {
      console.error("Error starting recording:", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && state.isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream
        .getTracks()
        .forEach((track) => track.stop());
    }
  };

  const playLastRecording = async () => {
    if (state.recordings.length === 0 || state.isPlaying) return;

    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    }

    const source = audioContextRef.current.createBufferSource();
    source.buffer = state.recordings[state.recordings.length - 1];
    source.connect(audioContextRef.current.destination);

    setState((prev) => ({ ...prev, isPlaying: true }));

    source.onended = () => {
      setState((prev) => ({ ...prev, isPlaying: false }));
    };

    source.start();
  };

  const undoLastRecording = () => {
    setState((prev) => ({
      ...prev,
      recordings: prev.recordings.slice(0, -1),
    }));
  };

  return {
    isRecording: state.isRecording,
    isPlaying: state.isPlaying,
    hasRecordings: state.recordings.length > 0,
    startRecording,
    stopRecording,
    playLastRecording,
    undoLastRecording,
  };
};
