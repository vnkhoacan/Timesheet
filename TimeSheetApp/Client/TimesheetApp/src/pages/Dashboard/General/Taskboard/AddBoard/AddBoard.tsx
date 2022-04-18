// modules
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import HttpClient from "../../../../../services/HttpClient/HttpClient";
// components
// stylesheet
import "./AddBoard.css";

const AddBoard: React.FC = () => {
  const history = useHistory();

  const memberInfo = useSelector((s: any) => s.memberInfo);

  const addBoard = async (): Promise<void> => {
    const board: any = {
      board_name: "Untitled Board",
      member_id: memberInfo.member_id,
    };
    var result = await HttpClient.post("Taskboard/AddBoard", { board: board });
    history.push("/dashboard/task-board/Untitled_Board-" + result);
    console.log(result);
  };

  return (
    <div onClick={addBoard} className="wrap p-16">
      <a className="add-board">
        <i className="bx bxs-plus-circle" style={{ color: "#22d3ee" }} />
        <p className="title-board">Add new board</p>
      </a>
    </div>
  );
};

export default AddBoard;
