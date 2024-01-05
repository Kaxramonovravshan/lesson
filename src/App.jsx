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
  const [currentItem, setCurrentItem] = useState("");

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
    if (currentItem === "") {
      lessons.push({
        name: inpValue,
        video: newVideo
      });
    } else {
      lessons[currentItem] = {
        name: inpValue,
        video: newVideo
      };
      setCurrentItem("");
    }

    setLessonss([...lessons]);
    setSaveModal(!saveModal);
    saveLocal();
  }
  function saveLocal() {
    localStorage.setItem("lessons", JSON.stringify(lessons));
  }

  function delItem(i) {
    lessons.splice(i, 1);
    setLessonss([...lessons]);
    saveLocal();
  }

  function editItem(i, itm) {
    setCurrentItem(i);
    setSaveModal(!saveModal);
    setNewVideo(itm.video);
    setInpValue(itm.name);
  }

  function deleteInp(i) {
    newVideo.splice(i, 1);
    setNewVideo([...newVideo]);
    saveLocal();
  }

  return (
    <div>
      <h1>Lessons</h1>
      <div className="w-50 mx-auto d-flex justify-content-end mb-2">
        <button
          onClick={() => setSaveModal(!saveModal)}
          className="btn btn-success w-25 "
        >
          +
        </button>
      </div>
      <table className="table_ table w-50 mx-auto table-bordered table-hover">
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
                  <button
                    onClick={() => editItem(index, item)}
                    className="btn btn-warning"
                  >
                    edit
                  </button>
                  <button
                    onClick={() => delItem(index)}
                    className="btn btn-danger"
                  >
                    x
                  </button>
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
                    <td>
                      <a target={"_blank"} href={itm.vLink}>
                        {itm.vLink}
                      </a>
                    </td>
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
                  value={newVideo[i].vName}
                  onChange={(e) => saveValue(e, i)}
                  className="form-control"
                  type="text"
                />
                <input
                  value={newVideo[i].vLink}
                  onChange={(e) => saveValue2(e, i)}
                  className="form-control "
                  type="text"
                />
                <button onClick={() => deleteInp(i)} className="btn btn-danger">
                  X
                </button>
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
