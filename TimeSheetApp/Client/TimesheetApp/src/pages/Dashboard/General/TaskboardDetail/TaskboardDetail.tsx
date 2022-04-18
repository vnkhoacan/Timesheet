// @flow
// modules
import { useEffect, useState } from "react";
import { useParams } from "react-router";
// components
import AddList from "../../../../components/Tasks/AddList/AddList";
import AddForm from "../../../../components/Tasks/AddForm/AddForm";
import TaskDetail from "../../../../components/Tasks/TaskDetail/TaskDetail";
import Header from "./Header/Header";
//stylesheet
import "./TaskboardDetail.css";
import ListTask from "../../../../components/Tasks/ListTask/ListTask";
import HttpClient from "../../../../services/HttpClient/HttpClient";
import { useSelector } from "react-redux";

const TaskboardDetail: React.FC = () => {
  const comment = useSelector((s: any) => s.comment);

  const socket = useSelector((s: any) => s.socket);

  const memberInfo = useSelector((s: any) => s.memberInfo);

  const project_id = useSelector((s: any) => s.project_id);

  const isLogedIn = useSelector((s: any) => s.isLogedIn);

  const [boardMember, setBoardMember] = useState<any>([]);

  const [isShownForm, setIsShownForm] = useState<boolean>(false);

  const [isShownTaskDetail, setIsShownTaskDetail] = useState<boolean>(false);

  const [taskDetail, setTaskDetail] = useState<any>({});

  const [listIndex, setListIndex] = useState<number>(-1);

  const [taskIndex, setTaskIndex] = useState<number>(-1);

  const [list, setList] = useState<any>([]);

  const { boardID } = useParams<any>();

  const openAddForm = (): void => {
    setIsShownForm(true);
  };

  const closeAddForm = (): void => {
    setIsShownForm(false);
  };

  const loadDataBoard = async (): Promise<void> => {
    const result = await HttpClient.post("Taskboard/LoadBoardData", {
      board_id: boardID,
      project_id: project_id,
      member_id: memberInfo.member_id,
      permission: memberInfo.permission,
    });

    if (result) {
      setList(result.list);
      setBoardMember(result.boardMember);
    }
  };

  const addList = async (title: string): Promise<void> => {
    if (title) {
      var result = await HttpClient.post("Taskboard/AddList", {
        list: { title: title, board_id: boardID },
      });
      var listItem: any = {
        list_id: result,
        title: title,
        tasks: [],
      };
      var newList = [...list];
      newList.push(listItem);
      setList(newList);
      
      setIsShownForm(false);
    }
  };

  const editList = async (title: string, index: number): Promise<void> => {
    if (title) {
      var newList = [...list];
      newList[index].title = title;

      var result = await HttpClient.post("Taskboard/EditList", {
        list: { title: title, list_id: newList[index].list_id },
      });

      setList(newList);
    }
  };

  const deleteList = async (index: number): Promise<void> => {
    var newList = [...list];
    newList = newList.filter((value: any, lIndex: number) => lIndex !== index);

    setList(newList);
  };

  const addTask = async (task: any, index: number): Promise<void> => {
    var result = await HttpClient.post("Taskboard/AddTask", {
      task: {
        list_id: task.list_id,
        task_name: task.task_name,
        task_start: new Date().toString()
      },
    });

    task.task_id = result;

    var newList: any = [...list];

    if (newList[index].tasks === undefined) newList[index].tasks = [];
    newList[index].tasks.push(task);

    setList(newList);
  };

  const editTask = async (): Promise<void> => {
    var newList = list;
    newList[listIndex].tasks[taskIndex] = taskDetail;
    console.log(taskDetail);
    setList(newList);
    await HttpClient.post("Taskboard/EditTask", {
      task: taskDetail,
    });
  };

  const deleteTask = async (): Promise<void> => {
    var newList = [...list];
    newList[listIndex].tasks = newList[listIndex].tasks.filter(
      (value: any, index: number) => taskIndex !== index
    );

    setList(newList);
    setIsShownTaskDetail(false);

    await HttpClient.post("Taskboard/DeleteTask", {
      task: { task_id: taskDetail.task_id },
    });
  };

  const handleChangeTask = async (
    value: any,
    keyName: string
  ): Promise<void> => {
    var newTaskDetail = { ...taskDetail };
    newTaskDetail[keyName] = value;
    setTaskDetail(newTaskDetail);
  };

  const openTaskDetail = (
    newListIndex: number,
    newTaskIndex: number,
    task: any
  ): void => {
    setIsShownTaskDetail(true);
    setTaskDetail({ ...task, title: list[newListIndex].title });
    setListIndex(newListIndex);
    setTaskIndex(newTaskIndex);
  };

  const closeTaskDetail = (): void => {
    setIsShownTaskDetail(false);
    editTask();
  };

  const editBoardMember = (newBoardMember: any): void => {
    setBoardMember(newBoardMember);
  };

  const sendComment = async (comment: any): Promise<void> => {
    var result = await HttpClient.post("Taskboard/SendComment", {
      comment: comment,
    });
    comment.comment_id = result;
    var newList = [...list];
    newList[listIndex].tasks[taskIndex].comments.push(comment);

    setList(newList);
    setTaskDetail(newList[listIndex].tasks[taskIndex]);
    
    comment.list_id = newList[listIndex].list_id;
    comment.email = memberInfo.email;
    socket.emit("SendComment",comment);
  };

  useEffect(() => {
    if (isLogedIn) loadDataBoard();
  }, [isLogedIn]);

  useEffect(() => {
    var newList = [...list];
    for(var i in newList)
    {
      var lValue = newList[i];
      if(lValue.list_id === comment.list_id)
      {
        for(var j in lValue.tasks)
        {
          var tValue = lValue.tasks[j];
          if(tValue.task_id === comment.task_id)
          {
            tValue.comments.push(comment);
          }
        }
      }
    }
    setList(newList);
  }, [comment]);

  return (
    <div className="task-board">
      {isShownTaskDetail ? (
        <>
          <div className="base-dark-bg" />
          <TaskDetail
            taskDetail={taskDetail}
            closeTaskDetail={closeTaskDetail}
            handleChangeTask={handleChangeTask}
            boardMember={boardMember}
            sendComment={sendComment}
            deleteTask={deleteTask}
          />
        </>
      ) : (
        ""
      )}
      <Header boardMember={boardMember} editBoardMember={editBoardMember} />
      <div className="task-board_body">
        <div className="task-board_scroll">
          {/* <ListTask tasks={temp} /> */}
          {list.map((item: any, index: number) => {
            return (
              <div className="px-3">
                <ListTask
                  openTaskDetail={openTaskDetail}
                  key={"list" + index}
                  keyName={index}
                  addTask={addTask}
                  title={item.title}
                  tasks={item.tasks}
                  list_id={item.list_id}
                  editList={editList}
                  deleteList={deleteList}
                />
              </div>
            );
          })}
          {isShownForm ? (
            <div className="px-3">
              <AddForm
                style={{ marginLeft: "15px" }}
                title="List title"
                addItem={addList}
                closeAddForm={closeAddForm}
              />
            </div>
          ) : (
            <div className="px-3">
              <AddList openAddForm={openAddForm} />
            </div>
          )}
        </div>
      </div>
      {/* <TaskboarDetail /> */}
    </div>
  );
};

export default TaskboardDetail;
