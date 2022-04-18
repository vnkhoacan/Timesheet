// components
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeView from "@mui/lab/TreeView";
import TreeItem from "@mui/lab/TreeItem";
import { styled } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import TaskDetail from "../../../../components/Tasks/TaskDetail/TaskDetail";
import TreeTaskItem from "../../../../components/Tasks/TreeTaskItem/TreeTaskItem";

// modules
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import HttpClient from "../../../../services/HttpClient/HttpClient";

// stylesheet
import "./TaskList.css";

export default function TaskList() {
  const [taskList, setTaskList] = useState<any>([]);

  const [taskDetail, setTaskDetail] = useState<any>({});

  const [listIndex, setListIndex] = useState<number>(-1);

  const [taskIndex, setTaskIndex] = useState<number>(-1);

  const [isShownTaskDetail, setIsShownTaskDetail] = useState<boolean>(false);

  const memberInfo = useSelector((s: any) => s.memberInfo);

  const socket = useSelector((s: any) => s.socket);

  const isLogedIn = useSelector((s: any) => s.isLogedIn);

  const [expanded, setExpanded] = React.useState<string[]>([]);
  const [selected, setSelected] = React.useState<string[]>([]);

  const handleToggle = (event: React.SyntheticEvent, nodeIds: string[]) => {
    setExpanded(nodeIds);
  };

  const handleSelect = (event: React.SyntheticEvent, nodeIds: string[]) => {
    setSelected(nodeIds);
  };

  const loadTaskList = async (): Promise<void> => {
    var result = await HttpClient.post("TaskList/LoadTaskList", {
      member_id: memberInfo.member_id,
    });
    setTaskList(result);
  };

  const openTaskDetail = (task: any, lIndex: number, tIndex: number): void => {
    setIsShownTaskDetail(true);
    setTaskDetail(task);
    setListIndex(lIndex);
    setTaskIndex(tIndex);
  };

  const closeTaskDetail = (): void => {
    setIsShownTaskDetail(false);
  };

  const sendComment = async (comment: any): Promise<void> => {
    var result = await HttpClient.post("Taskboard/SendComment", {
      comment: comment,
    });
    comment.comment_id = result;
    var newTaskList = [...taskList];
    newTaskList[listIndex].tasks[taskIndex].comments.push(comment);
    setTaskList(taskList);
    setTaskDetail(newTaskList[listIndex].tasks[taskIndex]);
    comment.list_id = newTaskList[listIndex].list_id;
    comment.email = memberInfo.email;
    socket.emit("SendComment", comment);
  };

  const editTaskStatus = async (
    lIndex: number,
    tIndex: number,
    task_status: boolean
  ): Promise<void> => {
    var newTaskList = [...taskList];
    var task_id = newTaskList[lIndex].tasks[tIndex].task_id;
    newTaskList[lIndex].tasks[tIndex].task_status = !task_status;
    var result = await HttpClient.post("TaskList/EditTaskStatus", {
      task_id: task_id,
      task_status: task_status ? "0" : "1",
      member_id: memberInfo.member_id,
    });
    setTaskList(newTaskList);
  };

  const countTask = (): number => {
    var count = 0;
    taskList.map((lValue: any) => {
      lValue.tasks.map((tValue: any) => {
        count++;
      });
    });
    return count;
  };

  const getBoardMember = (): any => {
    if(listIndex >= 0 && taskIndex >= 0)
    {
      var arr = [...taskList[listIndex].tasks[taskIndex].members];
    for(var i in arr)
      arr[i].isAdded = true;
    return arr;
    }
    return [];
  };

  useEffect(() => {
    if (isLogedIn) loadTaskList();
  }, [isLogedIn]);

  var count = 0;

  return (
    <div className={"task-list " + (isShownTaskDetail ? "d-flex" : "")}>
      <div
        className={
          "task-list_list " + (isShownTaskDetail ? "task-list_list_on" : "")
        }
      >
        <Box>
          {/* them css cho phan header nhu mau */}
          <div className="header">
            <div className="header-content">
              <div className="task-list_header_title">Tasks</div>
              <div className="task-list_header_sub">
                {countTask() > 1
                  ? countTask() + " remaining tasks"
                  : countTask() + " remaining task"}
              </div>
            </div>
          </div>

          <TreeView
            aria-label="controlled"
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            expanded={expanded}
            selected={selected}
            onNodeToggle={handleToggle}
            onNodeSelect={handleSelect}
            multiSelect
          >
            {/* them className css lai cho phan title */}
            {taskList.map((lValue: any, lIndex: number) => {
              count++;
              return (
                <TreeItem
                  style={{
                    borderBottom: "1px solid #e2e8f0",
                    borderTop: lIndex === 0 ? "1px solid #e2e8f0" : "",
                  }}
                  nodeId={count.toString()}
                  label={<div className="title">{lValue.title}</div>}
                  key={lIndex}
                >
                  {lValue.tasks.map((tValue: any, tIndex: number) => {
                    count++;
                    
                    return (
                      <TreeItem
                        onClick={() => {
                          openTaskDetail(tValue, lIndex, tIndex);
                        }}
                        style={{
                          borderBottom: "1px solid #e2e8f0",
                          borderTop: tIndex === 0 ? "1px solid #e2e8f0" : "",
                        }}
                        key={tIndex}
                        nodeId={count.toString()}
                        label={
                          <TreeTaskItem
                            key={tIndex}
                            task_name={tValue.task_name}
                            due={tValue.task_due}
                            task_status={tValue.task_status}
                            editTaskStatus={() => {
                              editTaskStatus(
                                lIndex,
                                tIndex,
                                tValue.task_status
                              );
                            }}
                          />
                        }
                      />
                    );
                  })}
                </TreeItem>
              );
            })}
          </TreeView>
        </Box>
      </div>
      <div
        className={
          "task-list_task-detail " +
          (isShownTaskDetail ? "task-list_task-detail_on" : "")
        }
      >
        {isShownTaskDetail ? (
          <TaskDetail
            closeTaskDetail={closeTaskDetail}
            taskDetail={taskDetail}
            handleChangeTask={() => {}}
            boardMember={getBoardMember()}
            sendComment={(comment: any) => {
              sendComment(comment);
            }}
            deleteTask={() => {}}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
