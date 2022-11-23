import { useEffect, useState } from "react";
import { MediaRecorder, register } from 'extendable-media-recorder';
import { connect } from 'extendable-media-recorder-wav-encoder';


const useRecorder = () => {
  const [audioURL, setAudioURL] = useState("");
  const [audioData, setAudioData] = useState();
  const [isRecording, setIsRecording] = useState(false);
  const [recorder, setRecorder] = useState(null);

  useEffect(() => {
    // Lazily obtain recorder first time we're recording.
    if (recorder === null) {
      if (isRecording) {
        requestRecorder().then(setRecorder, console.error);
      }
      return;
    }

    // Manage recorder state.
    if (isRecording) {
      recorder.start();
    } else {
      recorder.stop();
    }

    //Obtain the audio when ready.
    //can this be converted to a wav??
    const handleData = e => {
      const url = URL.createObjectURL(e.data);
      setAudioURL(url);
      setAudioData(e.data);
    };

    recorder.addEventListener("dataavailable", handleData);
    return () => recorder.removeEventListener("dataavailable", handleData);
  }, [recorder, isRecording]);

  const startRecording = () => {
    setIsRecording(true);
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  return [audioURL, audioData, isRecording, startRecording, stopRecording];
};

async function requestRecorder() {
  await register(await connect());
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  return new MediaRecorder(stream, { mimeType: 'audio/wav' });
}
export default useRecorder;
