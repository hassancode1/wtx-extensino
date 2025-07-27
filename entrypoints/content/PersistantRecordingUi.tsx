import { useState, useEffect, useRef } from "react";
import { Play, Pause, Square, Minimize2, Maximize2, X } from "lucide-react";

interface RecordingState {
  isRecording: boolean;
  isPaused: boolean;
  startTime: number;
  patientName: string;
  recordingTime: number;
  isMinimized: boolean;
}

const PersistentRecordingUI = () => {
  // const { recordingState } = useRecording();
  const [isRecording, setIsRecording] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [patientName, setPatientName] = useState("");
  const [recordingTime, setRecordingTime] = useState(0);
  const [inputPatientName, setInputPatientName] = useState("");

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  const pausedTimeRef = useRef<number>(0);

  useEffect(() => {
    const savedState = localStorage.getItem("recordingState");
    if (savedState) {
      const state: RecordingState = JSON.parse(savedState);
      setIsRecording(state.isRecording);
      setIsPaused(state.isPaused);
      setIsMinimized(state.isMinimized);
      setPatientName(state.patientName);
      setRecordingTime(state.recordingTime);
      startTimeRef.current = state.startTime;

      if (state.isRecording) {
        startTimer();
      }
    }
  }, []);

  useEffect(() => {
    if (isRecording || isPaused) {
      const state: RecordingState = {
        isRecording,
        isPaused,
        startTime: startTimeRef.current,
        patientName,
        recordingTime,
        isMinimized,
      };
      localStorage.setItem("recordingState", JSON.stringify(state));
    } else {
      localStorage.removeItem("recordingState");
    }
  }, [isRecording, isPaused, isMinimized, patientName, recordingTime]);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setRecordingTime((prev) => {
        const newTime = prev + 1;
        return newTime;
      });
    }, 1000);
  };

  const handleStartRecording = () => {
    if (inputPatientName.trim()) {
      setPatientName(inputPatientName.trim());
      setIsRecording(true);
      setIsPaused(false);
      setRecordingTime(0);
      startTimeRef.current = Date.now();
      pausedTimeRef.current = 0;
      setInputPatientName("");
      startTimer();
    }
  };

  const handlePauseToggle = () => {
    setIsPaused(!isPaused);
    if (!isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
    } else {
      startTimer();
    }
  };

  const handleStop = () => {
    setIsRecording(false);
    setIsPaused(false);
    setRecordingTime(0);
    setPatientName("");
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div className="fixed bottom-4 left-4 z-50 font-sans">
      <div
        className={`bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden transition-all duration-300 ${
          isMinimized ? "w-60 h-16" : "w-80 h-[300px]"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${
                isPaused ? "bg-yellow-500" : "bg-red-500"
              } ${!isPaused ? "animate-pulse" : ""}`}
            ></div>
            <span className="text-sm font-medium text-gray-800">
              {isPaused ? "Paused" : "Recording"} - {patientName}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1 hover:bg-gray-200 rounded transition-colors"
              title={isMinimized ? "Expand" : "Minimize"}
            >
              {isMinimized ? <Maximize2 size={14} /> : <Minimize2 size={14} />}
            </button>
            <button
              onClick={handleStop}
              className="p-1 hover:bg-gray-200 rounded transition-colors text-gray-600"
              title="Stop Recording"
            >
              <X size={14} />
            </button>
          </div>
        </div>

        {!isMinimized ? (
          <div className="p-6 flex flex-col items-center justify-center h-full">
            <div className="text-3xl font-mono font-bold text-gray-800 mb-6">
              {formatTime(recordingTime)}
            </div>

            <div className="flex gap-3">
              <button
                onClick={handlePauseToggle}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 bg-white hover:bg-gray-50 rounded-md transition-colors text-sm"
              >
                {isPaused ? <Play size={16} /> : <Pause size={16} />}
                {isPaused ? "Resume" : "Pause"}
              </button>

              <button
                onClick={handleStop}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors text-sm"
              >
                <Square size={16} />
                Stop
              </button>
            </div>
          </div>
        ) : (
          <div className="px-4 py-2 flex items-center justify-between h-full">
            <div className="font-mono font-bold text-gray-800 text-lg">
              {formatTime(recordingTime)}
            </div>

            <div className="flex gap-2">
              <button
                onClick={handlePauseToggle}
                className="p-1 hover:bg-gray-100 rounded transition-colors text-sm"
              >
                {isPaused ? <Play size={16} /> : <Pause size={16} />}
              </button>

              <button
                onClick={handleStop}
                className="p-1 hover:bg-gray-100 rounded transition-colors text-sm text-red-500"
              >
                <Square size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersistentRecordingUI;
