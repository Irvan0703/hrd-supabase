import { useEffect, useRef, useState } from "react";
import { Hands, HAND_CONNECTIONS } from "@mediapipe/hands";
import { Camera } from "@mediapipe/camera_utils";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";
import * as fp from "fingerpose";
import { useNavigate, useParams } from "react-router-dom";

export default function CapturePhoto() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [captured, setCaptured] = useState<string | null>(null);

  const navigate = useNavigate();
  const { jobId } = useParams();

  const ThreeFingerPose = new fp.GestureDescription("three_fingers");

  ThreeFingerPose.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl);
  ThreeFingerPose.addCurl(fp.Finger.Middle, fp.FingerCurl.NoCurl);
  ThreeFingerPose.addCurl(fp.Finger.Ring, fp.FingerCurl.NoCurl);

  const GE = new fp.GestureEstimator([ThreeFingerPose]);

  useEffect(() => {
    if (!videoRef.current) return;

    const hands = new Hands({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
    });

    hands.setOptions({
      maxNumHands: 1,
      modelComplexity: 1,
      minDetectionConfidence: 0.7,
      minTrackingConfidence: 0.7,
    });

    hands.onResults(onResults);

    const camera = new Camera(videoRef.current, {
      onFrame: async () => {
        await hands.send({ image: videoRef.current! });
      },
      width: 640,
      height: 480,
    });

    camera.start();
  }, []);

  const onResults = (results: any) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);

    if (results.multiHandLandmarks?.length) {
      const lm = results.multiHandLandmarks[0];

      drawConnectors(ctx, lm, HAND_CONNECTIONS, { color: "#00f" });
      drawLandmarks(ctx, lm, { color: "#0f0", radius: 5 });

      const est = GE.estimate(lm, 7.5);

      if (est.gestures?.length > 0) {
        const best = est.gestures.reduce((a, b) =>
          a.score > b.score ? a : b
        );

        if (best.name === "three_fingers" && !captured) {
          autoCapture();
        }
      }
    }
    ctx.restore();
  };

  const autoCapture = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const img = canvas.toDataURL("image/png");
    setCaptured(img);
  };

  const savePhoto = () => {
    if (!captured) return;

    const file = dataURLtoFile(captured, "photo.png");

    navigate(`/jobs/${jobId}/apply`, {
      state: { capturedFile: file },
    });
  };

  function dataURLtoFile(data: string, filename: string) {
    const arr = data.split(",");
    const mime = arr[0].match(/:(.*?);/)![1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8 = new Uint8Array(n);
    while (n--) u8[n] = bstr.charCodeAt(n);
    return new File([u8], filename, { type: mime });
  }

  return (
    <div className="p-4 max-w-lg mx-auto text-center">
      <h1 className="text-xl font-semibold mb-3">Take Photo</h1>
      <p className="text-gray-600 text-sm mb-3">
        Show 3 fingers to capture photo automatically ✋
      </p>

      {!captured && (
        <div className="relative">
          <video ref={videoRef} className="w-full rounded-lg" autoPlay muted />
          <canvas
            ref={canvasRef}
            width={640}
            height={480}
            className="absolute inset-0 w-full h-full"
          />
        </div>
      )}

      {captured && (
        <div>
          <img src={captured} className="rounded-lg shadow-md" />
          <button
            className="w-full bg-blue-600 text-white py-2 rounded-lg mt-4"
            onClick={savePhoto}
          >
            Save Photo
          </button>

          <button
            className="w-full bg-gray-200 py-2 rounded-lg mt-2"
            onClick={() => setCaptured(null)}
          >
            Retake Photo
          </button>
        </div>
      )}
    </div>
  );
}
