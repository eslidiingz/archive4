import React, { useState } from "react";
import Mainlayout from "../components/layouts/Mainlayout";


const data = [
  {
    id: "1",
    key: "1",
    title: "Title1",
    text: "Text1.",
    img: "../assets/image/card/img-04.webp"
  },
  {
    id: "2",
    key: "2",
    title: "Title2",
    text: "Text2.",
    img: "../assets/image/card/img-03.webp"
  },
  {
    id: "3",
    key: "3",
    title: "Title3",
    text: "Text3.",
    img: "../assets/image/card/img-02.webp"
  },
  {
    id: "4",
    key: "4",
    title: "Title4",
    text: "Text4",
    img: "../assets/image/card/img-01.webp"
  }
];

export default function App() {
  const [toggled, toggle] = useState("");
  return (
    <div className="App">
      {data.map(({ title, text, key, img }) => {
        return (
          <>
            <div className="main">
              <div className="text">
                <h1 onClick={() => toggle(key)}>{title} </h1>
                {toggled === key ? (
                  <>
                    <p>{text}</p>
                  </>
                ) : null}
              </div>

              <div className="img">
                {toggled === key ? (
                  <>
                    <img src={img} key={key} className="photo" />
                  </>
                ) : null}
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
}
