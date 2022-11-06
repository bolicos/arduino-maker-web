import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';

type Props = {
  text: string;
};

const QRCodeCanvas: React.FC<Props> = ({ text }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isError, setError] = useState(false);

  const errorMessage = 'Ocorreu um erro ao gerar o QRCode';

  const toError = (error: Error | null | undefined) => {
    if (error) {
      console.error('Canvas QRCode Error');
      console.error(error.message);
      setError(true);
    } else console.log('Canvas QRCode Succes');
  };

  useEffect(() => {
    const value = text || 'write something here';
    QRCode.toCanvas(canvasRef.current, value, toError);
  }, [text]);

  return <div>{isError ? <>{errorMessage}</> : <canvas ref={canvasRef} id="qrcode-canvas" />}</div>;
};

export default QRCodeCanvas;
