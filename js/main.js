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
const clearButton = document.getElementById('clear-button');
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

//Photo button event
photoButton.addEventListener(
  'click',
  function (event) {
    takePicture();

    event.preventDefault();
  },
  false
);

//Filter event
photoFilter.addEventListener('change', function (event) {
  //Set filter to chosen option
  filter = event.target.value;
  //Set filter to video
  video.style.filter = filter;

  event.preventDefault();
});
//Clear event
clearButton.addEventListener('click', function (event) {
  //clear photos
  photos.innerHTML = '';
  //change filter back to normal
  filter = 'none';
  //video to nothng
  video.style.filter = filter;
  //reset select list
  photoFilter.selectedIndex = 0;
});
//Take picture from canvas
function takePicture() {
  //Create canvas
  const context = canvas.getContext('2d');
  if (width && height) {
    //set canvas props

    canvas.width = width;
    canvas.height = height;
    //Draw image of video on canvas
    context.drawImage(video, 0, 0, width, height);

    //create image from the canvas
    const imgUrl = canvas.toDataURL('image/png');
    // console.log(imgUrl);
    //create img element
    const img = document.createElement('img');

    //set img src sets base 64 url to imgUrl
    img.setAttribute('src', imgUrl);

    //set image filter
    img.style.filter = filter;
    //add image to photos
    photos.appendChild(img);
  }
}
