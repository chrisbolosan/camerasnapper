//globals
let width = 500,
  height = 0,
  filter = 'none',
  streaming = false;

//DOMS
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const photos = document.getElementById('photos');
const photoButton = document.getElementById('photo-button');
const clearButton = document.getElementById('clearButton');
const photoFilter = document.getElementById('photo-filter');

//mediastream

navigator.mediaDevices
  .getUserMedia({ video: true, audio: false })
  .then(function (stream) {
    //link to video source
    video.srcObject = stream;
    //playvideo
    video.play();
  })
  .catch(function (err) {
    console.log(`Error:${err}`);
  });

//Play when ready
video.addEventListener(
  'canplay',
  function (event) {
    if (!streaming) {
      //setvideo canvas/height
      height = video.videoHeight / (video.videoWidth / width);

      video.setAttribute('width', width);
      video.setAttribute('height', height);
      canvas.setAttribute('width', width);
      canvas.setAttribute('height', height);
      //after set canvas stream
      streaming = true;
    }
  },
  false
);

photoButton.addEventListener(
  'click',
  function (event) {
    takePicture();

    event.preventDefault();
  },
  false
);
function takePicture() {
  //Create canvas
  const context = canvas.getContext('2d');
  if (width && height) {
    //set canvas props

    canvas.width = width;
    canvas.height = height;
    //Draw image of video on canvas
    context.drawImage(video, 0, 0, width, height);
  }
}
