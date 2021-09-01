import React, { useState } from "react";

const AllVideos = ({ data }) => {
  const { id, title, vidurl, rating } = data;
  
  const [count, setCount] = useState(0);
  const [video, setVideo] = useState([]);
  const [load, setLoad] = useState(false);

  const incrementVote = async (id) => {
    try {
      const body = { rating };
      await fetch(`/api/v1/videos/incr/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
        setCount((prevState) => prevState + 1);
    } catch (error) {
      console.error(error.message)
    }
  };

  const decrementVote = async (id) => {
    try {
      const body = { rating };
      await fetch(`/api/v1/videos/decr/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
        setCount((prevState) => prevState - 1);
    } catch (error) {
      console.error(error.message)
    }
  };

  const deleteVideo = async (id) => {
    try {
      await fetch(`/api/v1/videos/${id}`, {
        method: "DELETE"
      });
      setVideo(video.filter((value) => value.id !== id));
      setLoad(!load);
    } catch (error) {
      console.error(error.message)
    }
  };

  return (
    <div className="allVideos-container ">
      {!load && (
        <div className="video-container">
          <h5 id="video-title mb-2">{title}</h5>
          <div className="votes">
            <i
              className="fas fa-thumbs-up vote"
              onClick={() => incrementVote(id)}
            ></i>
            <h4>{rating ? count + rating : count} Votes</h4>
            <i
              className="fas fa-thumbs-down vote"
              onClick={() => decrementVote(id)}
            ></i>
          </div>
          <div className="playVid">
            <iframe
              height="315"
              src={`https://www.youtube.com/embed/${vidurl.slice(-11)}`}
              className="video"
              allowFullScreen
              title="Youtube video player"
            ></iframe>
          </div>
          <div className="delete">
            <button
              className="btn btn-danger"
              onClick={() => deleteVideo(id)}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllVideos;

