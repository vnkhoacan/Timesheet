// modules
import { useHistory, useParams } from "react-router";
import { useState } from "react";
import HttpClient from "../../../../../services/HttpClient/HttpClient";
// components
import TransparentInput from "../../../../../components/FormValidation/TransparentInput";
import BoardMember from "../../../../../components/Tasks/BoardMember/BoardMember";
import Alert_YESNO from "../../../../../components/Alert/ButtonAlert/Alert_YESNO/Alert_YESNO";

// stylesheet
import "./Header.css";
import { Link } from "react-router-dom";

interface Props {
  boardMember: any;
  editBoardMember:any;
}

const Header: React.FC<Props> = (props: Props) => {
  const history = useHistory();

  const { boardID, boardName } = useParams<any>();

  const [defaultBoardName, setDefaultBoardName] = useState<string>(boardName);

  const [isTransparent, setIsTransparent] = useState<boolean>(true);

  const [isShownBoardMember, setIsShownBoardMember] = useState<boolean>(false);

  const editBoard = async (): Promise<void> => {
    var result = await HttpClient.post("Taskboard/EditBoard", {
      board: {
        board_id: boardID,
        board_name: defaultBoardName,
      },
    });
  };

  const openInput = (): void => {
    setIsTransparent(false);
  };

  const closeInput = (): void => {
    setIsTransparent(true);
    editBoard();
  };

  const openBoardMember = (): void => {
    setIsShownBoardMember(!isShownBoardMember);
  };

  const deleteBoard = async (): Promise<void> => {
    await HttpClient.post("Taskboard/DeleteBoard", {
      board: { board_id: boardID },
    });
    history.goBack();
  };

  return (
    <header>
      <div className="task-board_navbar">
        <Link to="/dashboard/task-board" className="back-btn align-items-center">
          <i className="bx bx-bar-chart-square" style={{ color: "#333333" }} />
          <span className="board-name">Boards</span>
        </Link>
        <a className="project-name">
          {/* <i className="bx bx-show-alt" style={{ color: "#ffffff" }} /> */}
          <div>
            <TransparentInput
              defaultValue={defaultBoardName.replace("_", " ")}
              errorMessage="Title contain minimum 3 characters."
              regex={/^[A-Za-z\d\s]{3,}$/}
              isRequired={true}
              handleChange={(e: any) => {
                setDefaultBoardName(e.target.value);
              }}
              isSubmited={false}
              type="text"
              clickClose={() => {}}
              clickCheck={() => {}}
              isTransparent={isTransparent}
              open={openInput}
              close={closeInput}
            />
          </div>
        </a>
        <div className="right-container d-flex align-items-center">
          <div className="relative-position right-container_icon d-flex align-items-center">
            <i onClick={openBoardMember} className="material-icons-outlined">
              group
            </i>
            {isShownBoardMember ? (
              <div
                style={{ top: "40px", right: "0", zIndex: 2 }}
                className="absolute-position"
              >
                <BoardMember
                  clickCheck={() => {}}
                  boardMember={props.boardMember}
                  editBoardMember={props.editBoardMember}
                />
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="relative-position right-container_icon d-flex align-items-center">
            <i className="material-icons-outlined">delete</i>
            <Alert_YESNO
              header="Message"
              message="Do you want delete the board ?"
              yesText="Ok"
              noText="Cancel"
              yesFunction={deleteBoard}
              noFunction={() => {}}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
