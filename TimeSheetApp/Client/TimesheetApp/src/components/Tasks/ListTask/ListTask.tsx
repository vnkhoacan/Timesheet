// mobdules
import { useState } from "react";
import HttpClient from "../../../services/HttpClient/HttpClient";
// components
import AddIcon from "@mui/icons-material/Add";
import AddForm from "../AddForm/AddForm";
import TransparentInput from "../../FormValidation/TransparentInput";
import Alert_YESNO from "../../Alert/ButtonAlert/Alert_YESNO/Alert_YESNO";
// stylesheet
import Task from "../Task/Task";
import "./ListTask.css";

interface Props {
  title: string;
  tasks: any;
  addTask: any;
  keyName: number;
  openTaskDetail: any;
  list_id: string;
  editList: any;
  deleteList:any;
}

const ListTask: React.FC<Props> = (props: Props) => {
  const [titleTemp, setTitleTemp] = useState<string>(props.title);

  const [isTransparent, setIsTransparent] = useState<boolean>(true);

  const [isShownForm, setIsShownForm] = useState<boolean>(false);

  const openInput = (): void => {
    setIsTransparent(false);
  };

  const closeInput = (): void => {
    setIsTransparent(true);
    props.editList(titleTemp, props.keyName);
  };

  const openAddForm = (): void => {
    setIsShownForm(true);
  };

  const closeAddForm = (): void => {
    setIsShownForm(false);
  };

  const addItem = async (title: string): Promise<void> => {
    if (title) {
      var task: any = {
        list_id: props.list_id,
        task_name: title,
        members: [],
        task_due: "",
        task_start: "",
        comments:[],
      };
      props.addTask(task, props.keyName);
      setIsShownForm(false);
    }
  };

  const deleteList = async (): Promise<void> => {
    await HttpClient.post("Taskboard/DeleteList", {
      list:{list_id: props.list_id,}
    });
    props.deleteList(props.keyName);
  };

  return (
    <div className="add-card">
      <div className="add-card_header">
        <div className="titled">
          <div className={isTransparent ? "" : "light-border"}>
            <TransparentInput
              defaultValue={titleTemp}
              errorMessage="Title must contain minimum 3 characters."
              regex={/^[A-Za-z\d\s]{3,}$/}
              isRequired={true}
              handleChange={(e: any) => {
                setTitleTemp(e.target.value);
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
        </div>
        <div className="d-flex">
          <div className="pointer-cursor">
            <i
              onClick={openInput}
              className="material-icons-outlined light-color"
            >
              edit
            </i>
          </div>
          <div className="pointer-cursor relative-position">
            <i className="material-icons-outlined light-color">delete</i>
            <Alert_YESNO
              header="Message"
              message="Do you want to delete this list ?"
              yesText="Ok"
              noText="Cancel"
              yesFunction={deleteList}
              noFunction={() => {}}
            />
          </div>
        </div>
      </div>
      <div className="add-card_body">
        {/* card detail */}
        {props.tasks.map((task: any, index: number) => {
          console.log(task);
          return (
            <div
              onClick={() => {
                props.openTaskDetail(props.keyName, index, task);
              }}
            >
              <Task
                key={"task" + index}
                task_name={task.task_name}
                due={task.task_due}
                start={task.task_start}
                members={task.members}
                priority={task.task_priority}
                commentNumber={task.comments.length}
                task_status={task.task_status}
              />
            </div>
          );
        })}
        {/* end card details */}
      </div>
      <div className="add-card_footer">
        {isShownForm ? (
          <AddForm
            style={{ boxShadow: "none" }}
            title="Task title"
            addItem={addItem}
            closeAddForm={closeAddForm}
          />
        ) : (
          <div className="d-flex align-items-center" onClick={openAddForm}>
            <AddIcon />
            <div style={{ fontSize: "13px" }}>Add Card</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListTask;
