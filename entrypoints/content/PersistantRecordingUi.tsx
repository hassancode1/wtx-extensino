// PersistentRecordingUI.tsx
import { useState } from "react";
import { Play, Pause, Square, Minimize2, Maximize2, X } from "lucide-react";

type RecordingState = "initial" | "recording" | "paused" | "stopped";

interface Props {
  startRecording: () => void;
  stopRecording: () => void;
  resumeRecording: () => void;
  pauseRecording: () => void;
  time: number;
  recordingState: RecordingState;
}

const formatTime = (s: number) =>
  `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(
    2,
    "0"
  )}`;

export default function PersistentRecordingUI(props: Props) {
  const {
    startRecording,
    stopRecording,
    resumeRecording,
    pauseRecording,
    time,
    recordingState,
  } = props;
  const [isMinimized, setIsMinimized] = useState(false);
  const [patientName, setPatientName] = useState("");

  if (recordingState === "initial") startRecording();

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 left-4 z-50 font-sans">
        <div className="w-60 h-16 bg-white rounded-lg shadow-lg border border-gray-200 px-4 py-2 flex items-center justify-between">
          <span className="font-mono font-bold text-gray-800">
            {formatTime(time)}
          </span>

          <div className="flex gap-2">
            {recordingState === "recording" && (
              <button
                onClick={pauseRecording}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <Pause size={16} />
              </button>
            )}
            {recordingState === "paused" && (
              <button
                onClick={resumeRecording}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <Play size={16} />
              </button>
            )}
            <button
              onClick={stopRecording}
              className="p-1 hover:bg-gray-100 rounded text-red-500"
            >
              <Square size={16} />
            </button>
            <button onClick={() => setIsMinimized(false)}>
              <Maximize2 size={14} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 z-50 font-sans">
      <div className="w-80 h-[300px] bg-white rounded-lg shadow-lg border border-gray-200 flex flex-col">
        <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${
                recordingState === "paused" ? "bg-yellow-500" : "bg-red-500"
              } ${recordingState === "recording" ? "animate-pulse" : ""}`}
            />
            <span className="text-sm font-medium text-gray-800">
              {recordingState === "paused"
                ? "Paused"
                : recordingState === "recording"
                ? "Recording"
                : "Stopped"}{" "}
              - {patientName || "Patient"}
            </span>
          </div>
          <div className="flex gap-1">
            <button onClick={() => setIsMinimized(true)}>
              <Minimize2 size={14} />
            </button>
            <button onClick={stopRecording}>
              <X size={14} />
            </button>
          </div>
        </div>

        {/* body */}
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <div className="text-3xl font-mono font-bold text-gray-800 mb-6">
            {formatTime(time)}
          </div>

          <div className="flex gap-3">
            {recordingState === "recording" && (
              <button
                onClick={pauseRecording}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 bg-white hover:bg-gray-50 rounded-md text-sm"
              >
                <Pause size={16} /> Pause
              </button>
            )}
            {recordingState === "paused" && (
              <button
                onClick={resumeRecording}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 bg-white hover:bg-gray-50 rounded-md text-sm"
              >
                <Play size={16} /> Resume
              </button>
            )}
            <button
              onClick={stopRecording}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm"
            >
              <Square size={16} /> Stop
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
