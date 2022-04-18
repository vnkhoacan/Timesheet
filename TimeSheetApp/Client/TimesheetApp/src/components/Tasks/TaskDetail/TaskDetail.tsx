// components
import BaseInput from "../../FormValidation/BaseInput";
import DateTimePicker from "../../FormValidation/DateTimePicker";
import SelectMulti from "../../FormValidation/SelectMultiTags";
import SelectSingleTag from "../../FormValidation/SelectSingleTag";
import Comment from "../Comment/Comment";
import Alert_YesNo from "../../Alert/ButtonAlert/Alert_YESNO/Alert_YESNO";
import TextArea from "../../FormValidation/TextArea";
import FlexAvatar from "../../Avatar/FlexAvatar";
import PriorityTag from "../Tags/Priority/Priority";
import { Button } from "@mui/material";
// stylesheet
import "./TaskDetail.css";
import DateConverter from "../../../services/Date/DateConverter";
import { useState } from "react";
import { useSelector } from "react-redux";

interface Props {
  closeTaskDetail: any;
  taskDetail: any;
  handleChangeTask: any;
  boardMember: any;
  sendComment: any;
  deleteTask: any;
}

const TaskDetail: React.FC<Props> = (props: Props) => {
  const memberInfo = useSelector((s: any) => s.memberInfo);

  const [content, setContent] = useState<string>("");

  const priority: any = [
    { name: "Low", color: "#4caf50" },
    { name: "Medium", color: "#2196f3" },
    { name: "High", color: "#ff9800" },
    { name: "Very High", color: "#f44336" },
  ];

  const getBoardMember = (): any => {
    var arr: any = [];
    props.boardMember.map((value: any) => {
      if (value.isAdded) arr.push(value);
    });
    return arr;
  };

  const members = getBoardMember();

  var Priority: React.FC = (props: any) => {
    return <PriorityTag color={props.color} name={props.name} />;
  };

  var SelectItem: React.FC = (props: any) => {
    return <p>{props.name}</p>;
  };

  var SelectMember: React.FC = (props: any) => {
    return (
      <div className="px-1">
        <div className="d-flex p-1 align-items-center">
          <FlexAvatar
            style={{ width: "24px", height: "24px", fontSize: "12px" }}
            src={props.avatar}
            name={props.member_name}
          />
          <span style={{ fontSize: "12px" }} className="ms-1">
            {props.member_name}
          </span>
        </div>
      </div>
    );
  };

  var Member: React.FC = (props: any) => {
    return (
      <div
        className="px-1"
        style={{ background: "#ebebeb", borderRadius: "20px" }}
      >
        <div className="d-flex p-1 align-items-center">
          <FlexAvatar
            style={{ width: "24px", height: "24px", fontSize: "12px" }}
            src={props.avatar}
            name={props.member_name}
          />
          <span style={{ fontSize: "12px" }} className="ms-1">
            {props.member_name}
          </span>
        </div>
      </div>
    );
  };

  const parseArrForSelect = (dValue: any, data: any, keyName: string): any => {
    var arr: any = [];
    data.map((value: any, index: number) => {
      var isExist = dValue.some((v: any) => v[keyName] === value[keyName]);
      if (isExist) arr.push(index);
    });
    return arr;
  };

  const parseValueForSelect = (
    dValue: any,
    data: any,
    keyName: string
  ): any => {
    var arr: any = [];
    data.map((value: any, index: number) => {
      var isExist = value[keyName] === dValue;
      if (isExist) arr.push(index);
    });
    return arr;
  };

  const sendComment = async (): Promise<void> => {
    if (content) {
      var comment = {
        task_id: props.taskDetail.task_id,
        member_id: memberInfo.member_id,
        member_name: memberInfo.first_name + " " + memberInfo.last_name,
        comment_content: content,
        avatar: memberInfo.avatar,
        comment_date: new Date().toString(),
      };
      props.sendComment(comment);
    }
  };

  return (
    <div className="task-detail">
      <div className="task-detail-container">
        <div className="task-detail-header">
          <div className="task-detail-header-icon">
            <div className="d-flex align-items-center">
              <i className="material-icons-outlined"> calendar_today</i>
            </div>
            <div className="d-flex align-items-center">
              <i className="material-icons-outlined"> label_important </i>
            </div>
            <div className="d-flex align-items-center">
              <i className="material-icons-outlined"> person</i>
            </div>
            <div className="d-flex align-items-center">
              <i className="material-icons-outlined"> attach_file</i>
            </div>

            <div className="d-flex align-items-center">
              <i className="material-icons-outlined"> more_horiz </i>
            </div>
            <div className="d-flex align-items-center relative-position">
              <i className="material-icons-outlined">delete</i>
              <Alert_YesNo
                header="Message"
                message="Do you want to delete this task ?"
                yesText="Ok"
                noText="Cancel"
                yesFunction={props.deleteTask}
                noFunction={() => {}}
              />
            </div>
          </div>
          <div
            onClick={() => {
              props.closeTaskDetail();
            }}
            className="task-detail-close d-flex align-items-center"
          >
            <i className="material-icons">close</i>
          </div>
        </div>

        <div className="task-detail-scroll">
          <div className="task-detail-body">
            <div className="row">
              <div className="col-12 col-xl-7">
                <p className="d-flex align-items-center">
                  <span className="medium-font-size">
                    {props.taskDetail.title}
                  </span>
                  <i className="material-icons-outlined">chevron_right</i>

                  <span className="medium-font-size">
                    {props.taskDetail.task_name}
                  </span>
                </p>
              </div>
              {/* <div className="col-4"></div> */}
              <div className="col-12 col-xl-5 mb-2">
                <DateTimePicker
                  handleChange={(value: any) => {
                    console.log(new Date(value).toLocaleDateString());
                    props.handleChangeTask(
                      DateConverter.parseDateTimeForSQL(value),
                      "task_due"
                    );
                  }}
                  defaultValue={props.taskDetail.task_due}
                  isRequired={false}
                  isSubmited={false}
                />
              </div>
            </div>
            <BaseInput
              defaultValue={props.taskDetail.task_name}
              errorMessage="Title must contain minimum 3 characters."
              label="Title"
              regex={/^[A-Za-z\d\s]{3,}$/}
              isRequired={true}
              handleChange={(e: any) => {
                props.handleChangeTask(e.target.value, "task_name");
              }}
              isSubmited={false}
            />
            <TextArea
              defaultValue={props.taskDetail.task_description}
              errorMessage="This field must contains a-z A-Z 0-9 and minimum 3 characters."
              label="Description"
              regex={/^[A-Za-z\d\s]{3,}$/}
              handleChange={(e: any) => {
                props.handleChangeTask(e.target.value, "task_description");
              }}
              isRequired={true}
              isSubmited={false}
            />
          </div>

          <div className="task-detail-end">
            <div className="row ">
              <div className="col-12 col-xl-6 mt-2">
                <div className="task-detail-end-labels">
                  <div className="d-flex align-items-center">
                    <i className="material-icons-outlined"> label</i>
                    <label className="ms-2 medium-weight">Labels</label>
                  </div>

                  <div className="mt-3">
                    <SelectSingleTag
                      label="Priority"
                      SelectItem={SelectItem}
                      Item={Priority}
                      data={priority}
                      handleChange={(e: any) => {
                        var selectValue: any = e.target.value;
                        props.handleChangeTask(
                          priority[selectValue].name,
                          "task_priority"
                        );
                      }}
                      defaultValue={parseValueForSelect(
                        props.taskDetail.task_priority,
                        priority,
                        "name"
                      )}
                      message="Priority is empty"
                    />
                  </div>
                </div>
              </div>
              <div className="col-12 col-xl-6 mt-2">
                <div className="task-detail-end-member">
                  <div className="d-flex align-items-center">
                    <i className="material-icons-outlined"> people </i>
                    <label className="ms-2 medium-weight">Member</label>
                  </div>
                  <div className="mt-3">
                    <SelectMulti
                      label="Member"
                      SelectItem={SelectMember}
                      Item={Member}
                      data={members}
                      defaultValue={parseArrForSelect(
                        props.taskDetail.members,
                        members,
                        "member_id"
                      )}
                      message="You need to add a member into the board"
                      handleChange={(e: any) => {
                        var selectValue: any = e.target.value;
                        var arr: any = [];
                        selectValue.map((value: any) => {
                          arr.push(members[value]);
                        });
                        props.handleChangeTask(arr, "members");
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="task-detail-footer w-100">
            <div className="task-detail-footer-comment ">
              <div className="task-detail-footer-comment-icon d-flex align-items-center">
                <i className="material-icons-outlined me-2"> comment </i>
                <label className="medium-weight">Comment</label>
              </div>
              <div className="d-flex mt-3">
                <FlexAvatar
                  style={{ width: "32px", height: "32px", fontSize: "14px" }}
                  src={""}
                  name={"Le Viet"}
                />
                <textarea
                  onChange={(e: any) => {
                    setContent(e.target.value);
                  }}
                  value={content}
                  className="w-100 ms-3 light-border"
                ></textarea>
              </div>
              <div className="py-3">
                <Button
                  onClick={sendComment}
                  variant="contained"
                  className="ms-5 mb-3"
                >
                  Save
                </Button>
              </div>
              <div>
                <div className="d-flex align-items-center">
                  <i className="material-icons-outlined">chat</i>
                  <div className="ms-2 medium-weight">Activity</div>
                </div>
                <div>
                  {props.taskDetail.comments.length ? (
                    props.taskDetail.comments.map(
                      (value: any, index: number) => {
                        return (
                          <Comment
                            key={"comment" + index}
                            member_name={value.member_name}
                            avatar={value.avatar}
                            content={value.comment_content}
                            comment_date={value.comment_date}
                          />
                        );
                      }
                    )
                  ) : (
                    <p className="py-3 large-font-size">
                      Activity have no comments in recent time
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
