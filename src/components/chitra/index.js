import React, { useState, useEffect } from "react";
import {
  getCanvasImageFromFile,
  loadImageToCanvas,
  convertToEffect
} from "./imageUtility";

export default function Chitra() {
  const [appState, setAppState] = useState("init");
  const [imageFile, setImageFile] = useState(null);
  const [canvas, setCanvas] = useState(null);

  useEffect(() => {
    if (imageFile !== null) setCanvas(loadImageToCanvas(imageFile));
  }, [imageFile]);

  useEffect(() => {
    if (canvas !== null) setAppState("imageSelected");
  }, [canvas]);

  const userSelectedImage = (evt) => {
    getCanvasImageFromFile(evt.target.files[0]).then((data) => {
      console.log("got then response ..");
      setImageFile(data);
    });
  };
  const buttonClicked = (evt) => {
    console.log(evt.target.value);
    setAppState(evt.target.value);
  };
  const renderEffectsButtons = () => {
    return (
      <div>
        <select name="effects" onChange={buttonClicked} id="canvasEffect">
          <option value="reset">--Please choose an effect--</option>
          <option value="grayscale">grayscale</option>
          <option value="dotted">dotted</option>
          <option value="invert">invert</option>
          <option value="special">spacial enhance</option>
        </select>
        &nbsp;
        <button value="reset" onClick={buttonClicked}>
          reset
        </button>
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
            {canvas}
          </div>
        );
      case "grayscale":
      case "dotted":
      case "special":
      case "invert":
        return (
          <div>
            {renderEffectsButtons()}
            <br />
            {convertToEffect(appState)}
          </div>
        );

      case "reset":
        return (
          <div>
            {renderEffectsButtons()}
            <br />
            {canvas}
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
