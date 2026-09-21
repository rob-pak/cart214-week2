export default class CanvasRecorder {
  static recordCanvas(canvas, framerate, bitrate, durationSeconds) {
    const mediaStream = canvas.captureStream(framerate);
    const mediaRecorder = new MediaRecorder(mediaStream, { mimeType: "video/mp4", videoBitsPerSecond: bitrate });
    let recordedChunks = [];

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        recordedChunks.push(event.data);
      }
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(recordedChunks, { type: "video/mp4" });
      const videoUrl = URL.createObjectURL(blob);
      const videoElement = document.createElement("video");
      videoElement.src = videoUrl;
      videoElement.controls = true;
      document.body.appendChild(videoElement);

      const downloadLink = document.createElement("a");
      downloadLink.href = videoUrl;
      downloadLink.download = "canvas-recording.mp4";
      downloadLink.textContent = "Download recording";
      document.body.appendChild(downloadLink);
    };

    mediaRecorder.start();

    setTimeout(() => {
      mediaRecorder.stop();
    }, durationSeconds * 1000);
  }
}
