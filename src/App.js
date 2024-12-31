import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import VideoPlayer from "./components/VideoPlayer";

function App() {
  const [videoUrl, setVideoUrl] = useState("");
  const [captions, setCaptions] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [captionText, setCaptionText] = useState("");

  const handleAddCaption = () => {
    setCaptions([
      ...captions,
      { start: startTime, end: endTime, text: captionText },
    ]);
    setStartTime("");
    setEndTime("");
    setCaptionText("");
  };

  return (
    <div className="container">
      <h1>Video Caption App</h1>
      <div className="form-group">
        <label>Video URL:</label>
        <input
          type="text"
          className="form-control"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Start Time:</label>
        <input
          type="text"
          className="form-control"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>End Time:</label>
        <input
          type="text"
          className="form-control"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Caption Text:</label>
        <input
          type="text"
          className="form-control"
          value={captionText}
          onChange={(e) => setCaptionText(e.target.value)}
        />
      </div>
      <button className="btn btn-primary" onClick={handleAddCaption}>
        Add Caption
      </button>
      <VideoPlayer url={videoUrl} captions={captions} />
    </div>
  );
}

export default App;
