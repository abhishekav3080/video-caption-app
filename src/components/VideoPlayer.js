import React, { useState, useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import "./VideoPlayer.css";

function VideoPlayer({ url, captions }) {
  const [currentCaption, setCurrentCaption] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current.getInternalPlayer();
    if (videoElement) {
      const handleTimeUpdate = () => {
        const currentTime = videoElement.currentTime;
        const caption = captions.find(
          (c) =>
            currentTime >= parseTime(c.start) && currentTime <= parseTime(c.end)
        );
        setCurrentCaption(caption ? caption.text : "");
      };

      videoElement.addEventListener("timeupdate", handleTimeUpdate);

      return () => {
        videoElement.removeEventListener("timeupdate", handleTimeUpdate);
      };
    }
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
          ref={videoRef}
          url={url || "https://www.w3schools.com/html/mov_bbb.mp4"}
          controls
          width="100%"
          height="100%"
          style={{ position: "absolute", top: 0, left: 0 }}
        />
      </div>
      <div
        className={`caption ${isFullscreen ? "fullscreen" : ""}`}
        style={{
          position: "absolute",
          bottom: isFullscreen ? "5%" : "10%",
          width: isFullscreen ? "80%" : "90%",
          margin: "0 auto",
          textAlign: "center",
          fontSize: isFullscreen ? "20px" : "16px",
          color: "white",
          textShadow: "2px 2px 4px #000",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          padding: "5px",
          borderRadius: "5px",
          pointerEvents: "none",
          zIndex: 10,
        }}
      >
        {currentCaption}
      </div>
    </div>
  );
}

export default VideoPlayer;
