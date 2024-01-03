import React from "react";
import { useState } from "react";
import Rodal from "rodal";

const App = () => {
  let x = JSON.parse(localStorage.getItem("lessons"));
  const [lessons, setLessonss] = useState(x || []);
  const [currentLesson, setCurrentLesson] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [saveModal, setSaveModal] = useState(false);
  const [inpValue, setInpValue] = useState("");
  const [newVideo, setNewVideo] = useState([]);

  function openVideo(i) {
    setCurrentLesson(i);
    setIsOpen(!isOpen);
  }

  function saveVideo() {
    newVideo.push({
      vName: "",
      vLink: ""
    });
    setNewVideo([...newVideo]);
  }

  function saveValue(e, i) {
    newVideo[i].vName = e.target.value;
    setNewVideo([...newVideo]);
  }
  function saveValue2(e, i) {
    newVideo[i].vLink = e.target.value;
    setNewVideo([...newVideo]);
  }

  function saveLesson() {
    lessons.push({
      name: inpValue,
      video: newVideo
    });
    setLessonss([...lessons]);
    setSaveModal(!saveModal);
    saveLocal();
  }
  function saveLocal() {
    localStorage.setItem("lessons", JSON.stringify(lessons));
  }

  return (
    <div>
      <button
        onClick={() => {
          console.log(newVideo);
        }}
      >
        test
      </button>
      <h1>Lessons</h1>
      <div className="w-50 mx-auto d-flex justify-content-end mb-2">
        <button
          onClick={() => setSaveModal(!saveModal)}
          className="btn btn-success w-25 "
        >
          +
        </button>
      </div>
      <table className="table w-50 mx-auto table-bordered table-hover">
        <thead>
          <tr>
            <th>Lesson name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {lessons.map((item, index) => {
            return (
              <tr key={index}>
                <td onClick={() => openVideo(index)}>{item.name}</td>
                <td>
                  <button className="btn btn-warning">edit</button>
                  <button className="btn btn-danger">x</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <Rodal
        width={600}
        height={300}
        visible={isOpen}
        onClose={() => setIsOpen(!isOpen)}
      >
        <div className="py-4">
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th>Video name</th>
                <th>Video URL</th>
              </tr>
            </thead>
            <tbody>
              {lessons[currentLesson]?.video.map((itm, i) => {
                return (
                  <tr key={i}>
                    <td>{itm.vName}</td>
                    <td>{itm.vLink}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Rodal>

      <Rodal
        width={500}
        height={300}
        visible={saveModal}
        onClose={() => setSaveModal(!saveModal)}
      >
        <div className="d-flex flex-column gap-2 py-4">
          <input
            value={inpValue}
            onChange={(e) => setInpValue(e.target.value)}
            className="form-control"
            type="text"
            placeholder="lesson name"
          />

          {newVideo.map((itm, i) => {
            return (
              <div key={i} className="mb-2 d-flex gap-2">
                <input
                  onChange={(e) => saveValue(e, i)}
                  className="form-control"
                  type="text"
                />
                <input
                  onChange={(e) => saveValue2(e, i)}
                  className="form-control "
                  type="text"
                />
              </div>
            );
          })}

          <button onClick={saveVideo} className="btn btn-dark w-50">
            add video
          </button>
          <button
            onClick={saveLesson}
            className="btn btn-success w-50 d-block mx-auto"
          >
            save
          </button>
        </div>
      </Rodal>
    </div>
  );
};

export default App;
