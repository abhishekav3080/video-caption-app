import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import "./VideoPlayer.css";

function VideoPlayer({ url, captions }) {
  const [currentCaption, setCurrentCaption] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const videoElement = document.querySelector("video");
      if (videoElement) {
        const currentTime = videoElement.currentTime;
        const caption = captions.find(
          (c) =>
            currentTime >= parseTime(c.start) && currentTime <= parseTime(c.end)
        );
        setCurrentCaption(caption ? caption.text : "");
      }
    }, 500);

    return () => clearInterval(interval);
  }, [captions]);

  const parseTime = (time) => {
    const [minutes, seconds] = time.split(":").map(Number);
    return minutes * 60 + seconds;
  };

  const handleFullscreenChange = () => {
    const fullscreenElement =
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement;
    setIsFullscreen(!!fullscreenElement);
  };

  useEffect(() => {
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "MSFullscreenChange",
        handleFullscreenChange
      );
    };
  }, []);

  return (
    <div
      id="video-container"
      className={isFullscreen ? "fullscreen" : ""}
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "640px",
        margin: "auto",
        background: "black",
      }}
    >
      <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
        <ReactPlayer
          url={url}
          controls
          width="100%"
          height="100%"
          style={{ position: "absolute", top: 0, left: 0 }}
        />
      </div>
      <div className={`caption ${isFullscreen ? "fullscreen-caption" : ""}`}>
        {currentCaption}
      </div>
    </div>
  );
}

export default VideoPlayer;
