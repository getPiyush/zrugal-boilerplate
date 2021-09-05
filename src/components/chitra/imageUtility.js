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
