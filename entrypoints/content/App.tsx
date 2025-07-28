import { useState } from "react";
import PersistentRecordingUI from "./PersistantRecordingUi";
import { DoctorService } from "@/generated";

const App = ({
  patientName,
  onClose,
}: {
  patientName: string;
  onClose: () => void;
}) => {
  type RecordingState =
    | "initial"
    | "recording"
    | "paused"
    | "stopped"
    | "review";
  const [recordingState, setRecordingState] =
    useState<RecordingState>("review");
  const [time, setTime] = useState(0);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState("");
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunks = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const startTimer = () =>
    (timerRef.current = setInterval(() => setTime((t) => t + 1), 1000));
  const stopTimer = () => {
    clearInterval(timerRef.current!);
    timerRef.current = null;
  };
  const resetTimer = () => {
    stopTimer();
    setTime(0);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const mr = new MediaRecorder(stream);
      mediaRecorderRef.current = mr;

      mr.ondataavailable = (e) => chunks.current.push(e.data);
      mr.onstop = () => {
        const blob = new Blob(chunks.current, { type: "audio/webm" });
        chunks.current = [];
        console.log("Recording finished:", blob);
      };

      mr.start();
      setRecordingState("recording");
      startTimer();
    } catch (err) {
      console.error("Mic error:", err);
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current?.state === "recording") {
      mediaRecorderRef.current.pause();
      setRecordingState("paused");
      stopTimer();
    }
  };

  const resumeRecording = () => {
    if (mediaRecorderRef.current?.state === "paused") {
      mediaRecorderRef.current.resume();
      setRecordingState("recording");
      startTimer();
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach((t) => t.stop());
    }
    setRecordingState("stopped");
    stopTimer();
  };

  const newRecording = () => {
    resetTimer();
    startRecording();
    setTranscript("");
  };
  const saveAndContinue = async () => {
    setIsSubmitting(true);
    setError("");
    try {
      const audioBlob = new Blob(chunks.current, { type: "audio/webm" });

      const formData = new FormData();
      formData.append("audio_file", audioBlob);
      formData.append("patient_name", patientName);

      const res = await DoctorService.uploadAudioDoctorsUploadAudioPost({
        formData,
      });

      // setTranscript(res.transcript || "");
      console.log(res);
      setRecordingState("review");
    } catch (e: any) {
      setError(e?.message || "Upload failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <PersistentRecordingUI
        startRecording={startRecording}
        stopRecording={stopRecording}
        resumeRecording={resumeRecording}
        time={time}
        recordingState={recordingState}
        pauseRecording={pauseRecording}
        patientName={patientName}
        saveAndContinue={saveAndContinue}
        isSubmitting={isSubmitting}
        newRecording={newRecording}
        onClose={onClose}
      />
    </>
  );
};
export default App;
