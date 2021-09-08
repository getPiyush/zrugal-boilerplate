import Canvas from "./Canvas";

export const getCanvasImageFromFile = (file) => {
  let imagedata = imageLoader(loadImage(file));
  return imagedata;
};

const imageLoader = async function (promis) {
  const res = await promis
    .then((img) => {
      return img.result;
    })
    .finally((result) => {
      return result;
    });
  return res;
};

const loadImage = (file) => {
  return new Promise(function (resolve, reject) {
    if (FileReader) {
      var fr = new FileReader();
      fr.onload = () => resolve(fr);
      fr.readAsDataURL(file);
    } else reject("FileReader not supported!");
  });
};

/// canvas functions
export const loadImageToCanvas = (imageData) => {
  const draw = (context, canvas) => {
    var image = new Image();
    image.src = imageData;
    image.onload = () => {
      console.log(image.width + "x" + image.height);
      canvas.width = image.width;
      canvas.height = image.height;
      context.drawImage(image, 0, 0, image.width, image.height);
    };
  };
  return <Canvas draw={draw} />;
};

export const convertToEffect = (effect, range) => {
  const draw = (context, canvas) => {
    console.log(
      "resolution:",
      canvas.width,
      "x",
      canvas.height,
      " range = ",
      range
    );
    var imageData = context.getImageData(0, 0, canvas.width, canvas.height);

    let newData = null;
    switch (effect) {
      case "grayscale":
        newData = toGrayscale(imageData, range);
        break;

      case "dotted":
        newData = toPixels(imageData, range);
        break;

      case "invert":
        newData = invert(imageData, range);
        break;
      case "special":
        newData = special(imageData, range);
        break;

      default:
        newData = imageData;
    }
    context.putImageData(newData, 0, 0);
  };
  return <Canvas draw={draw} />;
};

var toGrayscale = function (imageData, range) {
  const data = imageData.data;
  for (var i = 0; i < data.length; i += 4) {
    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3 + range / 25;
    data[i] = avg; // red
    data[i + 1] = avg; // green
    data[i + 2] = avg; // blue
  }
  return imageData;
};

var special = function (imageData, range) {
  const data = imageData.data;
  for (var i = 0; i < data.length; i += 4) {
    const pxArray = [data[i], data[i + 1], data[i + 2]];
    const avg =
      range > 0 ? Math.max.apply(Math, pxArray) : Math.min.apply(Math, pxArray);
    data[i] = avg; // red
    data[i + 1] = avg; // green
    data[i + 2] = avg; // blue
  }
  return imageData;
};

var toPixels = function (imageData) {
  const data = imageData.data;
  for (var i = 0; i < data.length; i += 4) {
    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    data[i] = filterHigherPixel(data[i], avg); // red
    data[i + 1] = filterHigherPixel(data[i + 1], avg); // green
    data[i + 2] = filterHigherPixel(data[i + 2], avg); // blue
  }
  return imageData;
};

var invert = function (imageData) {
  const data = imageData.data;
  for (var i = 0; i < data.length; i += 4) {
    data[i] = 255 - data[i]; // red
    data[i + 1] = 255 - data[i + 1]; // green
    data[i + 2] = 255 - data[i + 2]; // blue
  }
  return imageData;
};

var filterHigherPixel = (colorInt, avg) => {
  return colorInt > 100 ? 100 : avg;
};
