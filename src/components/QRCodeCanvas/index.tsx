import React, { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";


interface Props {
  text: string;
}

const QRCodeCanvas: React.FC<Props> = ({ text }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isError, setError] = useState(false);
  const errorMessage = "Ocorreu um erro ao gerar o QRCode";

  const toError = (error: Error | null | undefined) => {
    if (error) {
      console.log("Canvas QRCode Error");
      console.log(error.message);
      setError(true);
    } else console.log("Canvas QRCode Succes");
  };

  useEffect(() => {
    QRCode.toCanvas(canvasRef.current, text, toError);
  },[text]);

  return (
    <div>
      {isError
        ? <>{errorMessage}</>
        : <canvas ref={canvasRef} id="canvas" />
      }
    </div>
  );
};

export default QRCodeCanvas;
