import React, { useState, useEffect } from "react";
import "./chitra.css";
import {
  getCanvasImageFromFile,
  loadImageToCanvas,
  convertToEffect
} from "./imageUtility";

export default function Chitra() {
  const [appState, setAppState] = useState("init");
  const [imageFile, setImageFile] = useState(null);
  const [range, setRange] = useState(1);
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
    setAppState(evt.target.value);
    setRange(1);
    document.getElementById("canvasEffect").value = evt.target.value;
  };

  const rangeUpdated = (evt) => {
    setRange(parseInt(evt.target.value, 10));
  };

  const saveCanvas = () => {
    console.log("saving canvas ...");
    const canvas = document.getElementById("myCanvas");
    const image = canvas
      .toDataURL("image/jpeg")
      .replace("image/jpeg", "image/octet-stream"); // here is the most important part because if you dont replace you will get a DOM 18 exception.

    // window.open(image, "_blank", "image.jpg"); // it will save locally
    // create temporary link
    var tmpLink = document.createElement("a");
    tmpLink.download =
      appState +
      "-" +
      new Date().toLocaleString().replace(/ |:|,|\//g, "_") +
      "-image.jpg"; // set the name of the download file
    tmpLink.href = image;

    // temporarily add link to body and initiate the download
    document.body.appendChild(tmpLink);
    tmpLink.click();
    document.body.removeChild(tmpLink);
  };

  const renderEffectsButtons = () => {
    return (
      <div>
        <select name="effects" onChange={buttonClicked} id="canvasEffect">
          <option value="reset">Please choose an effect</option>
          <option value="grayscale">grayscale</option>
          <option value="dotted">dotted</option>
          <option value="invert">invert</option>
          <option value="special">spacial enhance</option>
        </select>
        &nbsp;
        <button value="reset" onClick={buttonClicked}>
          reset
        </button>
        &nbsp;
        <button value="save" onClick={saveCanvas}>
          save to device
        </button>
        <br />
        <input
          type="range"
          onInput={rangeUpdated}
          value={range}
          min="-50"
          max="50"
          step="1"
          width="100wh"
        />{" "}
        {range}
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
            {convertToEffect(appState, range)}
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
