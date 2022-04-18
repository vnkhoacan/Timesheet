// modules
import HttpClient from "../../../services/HttpClient/HttpClient";
// components
import FlexAvatar from "../../Avatar/FlexAvatar";
import Checkbox from "@mui/material/Checkbox";
// stylesheet
import "./BoardMember.css";
import Divider from "@mui/material/Divider";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

interface Props {
  clickCheck: any;
  boardMember: any;
  editBoardMember: any;
}

const BoardMember: React.FC<Props> = (props: Props) => {
  const [bmTemp, setBmTemp] = useState<any>([...props.boardMember]);

  const { boardID } = useParams<any>();

  const searchBoardMember = (e: any): void => {
    var text = e.target.value;
    if (text) {
      var arr: any = [];
      bmTemp.map((value: any) => {
        if (value.member_name.indexOf(text) >= 0) arr.push(value);
      });
      setBmTemp(arr);
    } else setBmTemp(props.boardMember);
  };

  const editMemberIntoBoard = async (
    member_id: any,
    index: number,
    isAdded: boolean
  ): Promise<void> => {
    await HttpClient.post("Taskboard/EditMemberIntoBoard", {
      boardMember: {
        member_id: member_id,
        board_id: boardID,
        isAdded: isAdded,
      },
    });
    var newBoardMember = [...props.boardMember];
    newBoardMember[index].isAdded = isAdded;
    props.editBoardMember(newBoardMember);
  };

  return (
    <div className="board-member">
      <div className="p-2">
        <input
          onChange={searchBoardMember}
          type="text"
          placeholder="Search members"
          className="board-member_search form-control large-font-size"
        />
      </div>

      <div className="board-member_list-item mt-2">
        {bmTemp.length ? (
          bmTemp.map((value: any, index: number) => {
            return (
              <>
                {index > 0 ? (
                  <Divider
                    variant="inset"
                    style={{
                      borderBottomWidth: "inherit",
                      borderStyle: "hidden",
                    }}
                  />
                ) : (
                  ""
                )}
                <div className="board-member_item d-flex justify-content-between py-2 px-4">
                  <div className="d-flex align-items-center">
                    <FlexAvatar
                      style={{ width: "32px", height: "32px" }}
                      src={value.avatar}
                      name={value.member_name}
                    />
                    <div className="ms-2 medium-font-size">
                      {value.member_name}
                    </div>
                  </div>
                  <Checkbox
                    onChange={(e: any) => {
                      var isAdded = e.target.checked;
                      editMemberIntoBoard(value.member_id, index, isAdded);
                    }}
                    defaultChecked={value.isAdded}
                  />
                </div>
              </>
            );
          })
        ) : (
          <div className="p-3">Not found any members</div>
        )}
      </div>
    </div>
  );
};

export default BoardMember;
