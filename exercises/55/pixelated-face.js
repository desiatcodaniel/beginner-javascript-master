/* eslint-disable no-use-before-define */
const video = document.querySelector(`.webcam`);

const canvas = document.querySelector(`.video`);
const ctx = canvas.getContext(`2d`);

const faceCanvas = document.querySelector(`.face`);
const faceCtx = faceCanvas.getContext(`2d`);

const faceDetector = new window.FaceDetector();

const SIZE = 10;
const SCALE = 1.5;

// Write a function that will populate the user's video

// Special kind of function (promise)
async function populateVideo() {
  // Get permission from the user for use of Camera
  const stream = await navigator.mediaDevices.getUserMedia({
    // Ask for options(video, audio, etc...)
    video: { width: 1280, height: 720 },
  });
  // Set element selected to be the stream destination
  video.srcObject = stream;
  // Output the object into the element
  // Await is necessary so the everything is set AFTER values have been established as the program will wait for the web cam to be allowed before getting values
  await video.play();
  // Set the canvas size to be the same size as the video
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  faceCanvas.width = video.videoWidth;
  faceCanvas.height = video.videoHeight;
}

// Work with the face detection API
async function detect() {
  // Detect faces that are in the shot. Pass faceDetector reference to the video
  const faces = await faceDetector.detect(video);

  faces.forEach(drawFace);
  faces.forEach(censor);
  // RequestAnimationFrame will tell the browser to call the necessary function again. In this case, it will call detect next animation frame
  requestAnimationFrame(detect);
}

// Get boundingBox property from the face object
function drawFace({ boundingBox }) {
  // take the dimensions from the face variable which is the size of the detected face
  const { width, height, top, left } = boundingBox;

  // Clear currently existing rectangle (starting at top left, to bottom right)
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Set style
  ctx.strokeStyle = `#FFC600`;
  ctx.lineWidth = 4;
  // Draw rectangle
  ctx.strokeRect(left, top, width, height);
}

// Get boundingBox property and set it to a new variable named face
function censor({ boundingBox: face }) {
  // Disable smoothening for a better pixelated censor
  faceCtx.imageSmootheningEnabled = false;
  // Clear previous censor image
  faceCtx.clearRect(0, 0, faceCanvas.width, faceCanvas.height);
  // Draw small face
  faceCtx.drawImage(
    // 5 source arguments
    video, // Source of the image
    // Pull data from these (starting coordinates, ending coordinates)
    face.x,
    face.y,
    face.width,
    face.height,

    // 4 source arguments
    // Draw the pulled data to these (starting coordinates, ending coordinates)
    face.x,
    face.y,
    SIZE,
    SIZE
  );

  // Set scaled ending coordinates
  const width = face.width * SCALE;
  const height = face.height * SCALE;
  // Take that face back out and draw it back at normal size.
  faceCtx.drawImage(
    faceCanvas, // Source will be itself in order to scale up the low quality image
    // Pull data from these (starting coordinates, ending coordinates)
    // In this case it's the exact box of the drawn image
    face.x,
    face.y,
    SIZE,
    SIZE,

    // Draw the pulled data to these (starting coordinates, ending coordinates)
    // In this case it's the exact box of the face detected
    face.x - (width - face.width) / 2,
    face.y - (height - face.height) / 2,
    width,
    height
  );
}

// Promise based calling of functions so it has an order of operations
populateVideo().then(detect);
