import { useState } from "react";
import PersistentRecordingUI from "./PersistantRecordingUi";
import { DoctorService } from "@/generated";

const App = ({ patientName }: { patientName: string }) => {
  type RecordingState =
    | "initial"
    | "recording"
    | "paused"
    | "stopped"
    | "review";
  const [recordingState, setRecordingState] =
    useState<RecordingState>("initial");
  const [time, setTime] = useState(0);
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

  const saveAndContinue = async () => {
    if (!patientName.trim()) {
      setIsSubmitting(true);
      return;
    }
    const recordedBlob = new Blob(chunks.current, { type: "audio/webm" });
    try {
      const formData = new FormData();
      formData.append("audio_file", recordedBlob);
      formData.append("patient_name", patientName);

      const payload = {
        formData: {
          patient_name: patientName,
          audio_file: recordedBlob,
        },
      };
      const response = await DoctorService.uploadAudioDoctorsUploadAudioPost(
        payload
      );

      setRecordingState("review");
      console.log(response);
    } catch (error) {
      console.log(error);
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
      />
    </>
  );
};
export default App;
