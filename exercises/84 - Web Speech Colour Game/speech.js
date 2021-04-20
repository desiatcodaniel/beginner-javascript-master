import { handleResult } from './handlers';

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

function start() {
  // Check if the browser supports the Speech Recognition
  if (!('SpeechRecognition' in window)) {
    console.log('Browser does not support Speech Recognition');
    return;
  }
  // It works so we continue
  console.log('Starting...');
  // Make a new speech recognition
  const recognition = new SpeechRecognition();
  // Continually look for speech recognition
  recognition.continuous = true;
  // Continually provide results even when not done speaking yet
  recognition.interimResults = false;
  // Similar to defining a callback for a listener
  recognition.onresult = handleResult;
  console.log(recognition);
  // Start listening
  recognition.start();
}

start();
