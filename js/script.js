let fileInput = document.getElementById('file-input');
let imageSave;
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let brightness = document.getElementById('brightness');
let contrast = document.getElementById('contrast');
let transparent = document.getElementById('transparent');

//Upload file
fileInput.addEventListener('change', function (event1) {
  if (event1.target.files) {
    let file = event1.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function (event2) {
      let image = new Image();
      image.src = String(event2.target.result);
      image.onload = function () {
        canvas.width = image.width;
        canvas.height = image.height;
        ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0);
        imageSave = image;
      }
    }
  }
});

function editImage() {
  ctx.drawImage(imageSave, 0, 0);
  let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  let pixels = imageData.data;
  let contr = Number(contrast.value);
  let factor = 259 * (255 + contr) / (255 * (259 - contr));
  for (let i = 0; i < pixels.length; i++) {
    if ((i + 1) % 4 === 0) {
      pixels[i] *= transparent.value;
    } else {
      pixels[i] = truncate(factor * (pixels[i] - 128) + 128);
      pixels[i] = truncate(pixels[i] + Number(brightness.value));
    }
  }
  imageData.data = pixels;
  ctx.putImageData(imageData, 0, 0);
}

function truncate(value) {
  let result;
  if (value < 0) {
    result = 0;
  } else if (value > 255) {
    result = 255;
  } else {
    result = value;
  }
  return result;
}
