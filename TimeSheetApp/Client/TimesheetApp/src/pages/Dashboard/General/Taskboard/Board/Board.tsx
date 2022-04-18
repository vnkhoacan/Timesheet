// components
import { Link } from "react-router-dom";
// stylesheet
import "./Board.css";

interface Props {
  board_id: string;
  board_name:string;
  title: string;
}

const Board: React.FC<Props> = (props: Props) => {
  console.log(props.title);
  return (
    <div className="wrap p-16">
      <Link to={"/dashboard/task-board/"+props.board_name.replaceAll(" ","_")+"-"+props.board_id} className="board">
        <i className="bx bx-bar-chart-square" />
        <p className="title-board">{props.title}</p>
      </Link>
    </div>
  );
};

export default Board;
