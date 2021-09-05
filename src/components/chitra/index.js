import React, { useState } from "react";
import Canvas from "./Canvas";
import { getCanvasImageFromFile } from "./imageUtility";

export default function Chitra() {
  const [appState, setAppState] = useState();
  const [imageFile, setImageFile] = useState();

  const userSelectedImage = (evt) => {
    getCanvasImageFromFile(evt.target.files[0]).then((data) => {
      console.log("got then response ..");
      setImageFile(data);
      setAppState("imageSelected");
    });
  };

  const loadImageToCanvas = (imageData) => {
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
  const renderEffectsButtons = () => {
    return (
      <div>
        <span>Apply effects &gt; </span>
        <button>grayscale</button>
        <button>dotted</button>
        <button>spacial enhance</button>
      </div>
    );
  };

  const renderBrowseButton = () => {
    return (
      <div>
        <label>Browse to import image..</label>
        <input onChange={userSelectedImage} type="file" id="fileUploader" />
      </div>
    );
  };

  const render = () => {
    switch (appState) {
      case "imageSelected":
        return (
          <div>
            {renderEffectsButtons()}
            <br />
            {loadImageToCanvas(imageFile)}
          </div>
        );

      default:
        return <span>[No selection made..]</span>;
    }
  };

  return (
    <div>
      <h3>Chitra - Image processor</h3>
      {renderBrowseButton()}
      <br />
      {render()}
    </div>
  );
}
