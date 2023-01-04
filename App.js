import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
  let [title, setTitle] = useState([
    "남자 코트 추천",
    "강남 우동맛집",
    "자바스크립트 독학",
  ]);
  let [modalTitle, setModalTitle] = useState(0);
  let [like, setLike] = useState([0, 0, 0]);
  let [modal, setModal] = useState(false);
  let [inputValue, setInputValue] = useState("");
  let date = new Date();

  return (
    <div className="App">
      <div className="black-nav">
        <h4>ReactBlog</h4>
      </div>
      {title.map((item, i) => {
        return (
          <div className="list" key={i}>
            <h4
              onClick={() => {
                setModal(!modal);
                setModalTitle(i);
                // modal === false ? setModal(true) : setModal(false);
                // !modal을 쓸경우 Boolean값이 렌더링 할때마다 바뀌므로 삼항연산자보다 간결함.
              }}
            >
              {title[i]}
              <span
                onClick={(event) => {
                  event.stopPropagation();
                  let copyLike = [...like];
                  copyLike[i] = ++like[i];
                  setLike(copyLike);
                }}
              >
                👍
              </span>{" "}
              {like[i]}{" "}
            </h4>
            <p>
              {date.getMonth() + 1}월 {date.getDate()}일
            </p>
            <button
              onClick={() => {
                let copyTitle = [...title];
                copyTitle.splice(i, 1);
                setTitle(copyTitle);
              }}
            >
              삭제
            </button>
          </div>
        );
      })}
      <input
        onChange={(event) => {
          setInputValue(event.target.value);
        }}
      />
      <button
        onClick={(event) => {
          if (inputValue === "") {
            event.preventDefault();
          } else {
            let copyTitle = [...title];
            let copyLike = [...like];
            copyTitle.unshift(inputValue);
            copyLike.unshift(0);
            setTitle(copyTitle);
            setLike(copyLike);
          }
        }}
      >
        글발행
      </button>
      {modal == true ? (
        <Modal title={title} setTitle={setTitle} modalTitle={modalTitle} />
      ) : null}
    </div>
  );
}

function Modal(props) {
  return (
    <div className="modal">
      <h4>{props.title[props.modalTitle]}</h4>
      <p>날짜</p>
      <p>상세내용</p>
      <button
        type="button"
        onClick={() => {
          let copyTitle = [...props.title];
          copyTitle[0] = "여자 코트 추천";
          props.setTitle(copyTitle);
        }}
      >
        제목 수정
      </button>
    </div>
  );
}

export default App;
