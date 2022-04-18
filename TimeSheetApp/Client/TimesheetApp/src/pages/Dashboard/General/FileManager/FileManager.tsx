import { setChonkyDefaults } from "chonky";
import { ChonkyIconFA } from "chonky-icon-fontawesome";
import { useEffect, useState } from "react";
import HttpClient from "../../../../services/HttpClient/HttpClient";

import { VFSBrowser } from "./VFSBrowser";
import { useStoryLinks } from "./util";
import { useSelector } from "react-redux";
import './override.css';

setChonkyDefaults({
  iconComponent: ChonkyIconFA,
});
// Noty chonky
const storyName = "Advanced mutable VFS";
const FileManager: React.FC = () => {
  const [filesArr, setFilesArr] = useState<any>({
    rootFolderId: 0,
    fileMap: {
      0: {
        id: 0,
        name: "Root",
        isDir: true,
        childrenIds: [1],
        childrenCount: 6,
      },
      1: {
        id: 1,
        name: "23",
        isDir: false,
      },
    },
  });

  const memberInfo = useSelector((s:any)=>s.memberInfo);

  const isLogedIn = useSelector((s:any)=>s.isLogedIn);

  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  async function loadFileByMember() {
    var result = await HttpClient.post("FileManager/LoadFileByMember", {
      member_id: memberInfo.member_id,
    });
    setFilesArr(result);
    setIsLoaded(true);
  }

  

  useEffect(() => {
    if(isLogedIn) loadFileByMember();
  }, [isLogedIn]);

  return (
    <div className="file-manager">
      <div className="story-wrapper p-3">
        <div className="story-description"></div>
        {isLoaded ? <VFSBrowser filesArr={filesArr} /> : ""}
      </div>
    </div>
  );
};

(FileManager as any).storyName = storyName;

export default FileManager;
