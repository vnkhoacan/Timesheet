// components
import Board from "./Board/Board";
import AddBoard from "./AddBoard/AddBoard";
// stylesheet
import "./Taskboard.css";
import { useEffect, useState } from "react";
import HttpClient from "../../../../services/HttpClient/HttpClient";
import { useSelector } from "react-redux";

const Taskboard: React.FC = () => {
  const [boards, setBoards] = useState<any>([]);

  const memberInfo = useSelector((s: any) => s.memberInfo);
  const isLogedIn = useSelector((s: any) => s.isLogedIn);

  async function loadBoards() {
    var result = await HttpClient.post("Taskboard/LoadBoards", {
      member_id: memberInfo.member_id,
      permission: memberInfo.permission,
    });
    console.log(result);
    if (result) setBoards(result);
  }

  useEffect(() => {
    if (isLogedIn && !boards.length) loadBoards();
  }, [isLogedIn]);

  return (
    <div className="hero-scrumboard d-flex">
      <div
        className="d-flex w-100"
      >
        <div className="mx-auto">
          <p className="title text-center">Taskboard</p>
          <div className="hero-scrumboard_container">
            {boards.map((value: any, index: number) => {
              return (
                <Board
                  key={index}
                  board_id={value.board_id}
                  board_name={value.board_name}
                  title={value.board_name}
                />
              );
            })}
            <AddBoard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Taskboard;
