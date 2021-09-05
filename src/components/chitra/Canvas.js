import React, { useRef, useEffect } from "react";

export default function Canvas(props) {
  const { draw } = props;
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    //Our first draw
    draw(context, canvas);
  }, [draw]);

  return <canvas id="myCanvas" ref={canvasRef} />;
}
