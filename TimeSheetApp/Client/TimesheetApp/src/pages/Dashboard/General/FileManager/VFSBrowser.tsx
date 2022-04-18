import {
  ChonkyActions,
  ChonkyFileActionData,
  FileArray,
  FileData,
  FileHelper,
  FullFileBrowser,
} from "chonky";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Button from "@material-ui/core/Button";
import { showActionNotification } from "./util";
import { useSelector } from "react-redux";
import HttpClient from "../../../../services/HttpClient/HttpClient";
import HOST_NAME from "../../../../models/HostName/HostName";
import NativeStorage from "../../../../services/NativeStorage/NativeStorage";
// We define a custom interface for file data because we want to add some custom fields
// to Chonky's built-in `FileData` interface.
interface CustomFileData extends FileData {
  parentId?: string;
  childrenIds?: string[];
}
interface CustomFileMap {
  [fileId: string]: CustomFileData;
}

interface Props {
  filesArr: any;
}

export const VFSBrowser: React.FC<Props> = React.memo((props: Props) => {
  const filesArr = props.filesArr;

  const memberInfo = useSelector((s: any) => s.memberInfo);

  const useFiles = (
    fileMap: CustomFileMap,
    currentFolderId: string
  ): FileArray => {
    return useMemo(() => {
      const currentFolder = fileMap[currentFolderId];
      const childrenIds = currentFolder.childrenIds!;
      const files = childrenIds.map((fileId: string) => fileMap[fileId]);
      return files;
    }, [currentFolderId, fileMap]);
  };

  const useFolderChain = (
    fileMap: CustomFileMap,
    currentFolderId: string
  ): FileArray => {
    return useMemo(() => {
      const currentFolder = fileMap[currentFolderId];

      const folderChain = [currentFolder];

      let parentId = currentFolder.parentId;
      while (parentId) {
        const parentFile = fileMap[parentId];
        if (parentFile) {
          folderChain.unshift(parentFile);
          parentId = parentFile.parentId;
        } else {
          break;
        }
      }

      return folderChain;
    }, [currentFolderId, fileMap]);
  };

  const getMemberID = async (): Promise<string> => {
    var result = await NativeStorage.get("memberInfo");
    if (result) return JSON.parse(result).member_id;
    return "";
  };

  const downloadFileByItem = async (fileItem: any) => {
    var member_id = await getMemberID();
    var pathName =
      "Member" +
      member_id +
      (fileItem.parentPath ? fileItem.parentPath + "/" : "/") +
      fileItem.name;

    const url = HOST_NAME + "FileManager/" + pathName.replaceAll("/", "-");

    const link = document.createElement("a");
    link.href = url;

    // Start download
    link.click();
  };

  //const uploadFile = () => {};

  const useFileActionHandler = (
    setCurrentFolderId: (folderId: string) => void,
    deleteFiles: (files: CustomFileData[]) => void,
    moveFiles: (
      files: FileData[],
      source: FileData,
      destination: FileData
    ) => void,
    createFolder: (folderName: string) => void,
    uploadFile: (fileName: string) => void,
    downloadFiles: (fileName: string) => void
  ) => {
    return useCallback(
      (data: ChonkyFileActionData) => {
        if (data.id === ChonkyActions.OpenFiles.id) {
          const { targetFile, files } = data.payload;
          const fileToOpen = targetFile ?? files[0];
          if (fileToOpen && FileHelper.isDirectory(fileToOpen)) {
            setCurrentFolderId(fileToOpen.id);
            return;
          }
        } else if (data.id === ChonkyActions.DeleteFiles.id) {
          deleteFiles(data.state.selectedFilesForAction!);
        } else if (data.id === ChonkyActions.MoveFiles.id) {
          moveFiles(
            data.payload.files,
            data.payload.source!,
            data.payload.destination
          );
        } else if (data.id === ChonkyActions.CreateFolder.id) {
          const folderName = prompt("Provide the name for your new folder:");
          if (folderName) createFolder(folderName);
        } else if (data.id === ChonkyActions.UploadFiles.id) {
          console.log("upload");
          var input: any = document.createElement("input");
          input.type = "file";
          input.multiple = true;
          input.onchange = (e: any) => {
            uploadFile(e.target.files);
          };
          input.click();
        } else if (data.id === ChonkyActions.DownloadFiles.id) {
          downloadFileByItem({ ...data.state.contextMenuTriggerFile });
        }

        showActionNotification(data);
      },
      [
        createFolder,
        uploadFile,
        deleteFiles,
        moveFiles,
        setCurrentFolderId,
        downloadFiles,
      ]
    );
  };

  const prepareCustomFileMap = () => {
    const baseFileMap = filesArr.fileMap as unknown as CustomFileMap;
    const rootFolderId = filesArr.rootFolderId;
    return { baseFileMap, rootFolderId };
  };

  const useCustomFileMap = () => {
    const { baseFileMap, rootFolderId } = useMemo(prepareCustomFileMap, []);

    // Setup the React state for our file map and the current folder.
    const [fileMap, setFileMap] = useState(baseFileMap);
    const [currentFolderId, setCurrentFolderId] = useState(rootFolderId);

    // Setup the function used to reset our file map to its initial value. Note that
    // here and below we will always use `useCallback` hook for our functions - this is
    // a crucial React performance optimization, read more about it here:
    // https://reactjs.org/docs/hooks-reference.html#usecallback
    const resetFileMap = useCallback(() => {
      setFileMap(baseFileMap);
      setCurrentFolderId(rootFolderId);
    }, [baseFileMap, rootFolderId]);

    // Setup logic to listen to changes in current folder ID without having to update
    // `useCallback` hooks. Read more about it here:
    // https://reactjs.org/docs/hooks-faq.html#is-there-something-like-instance-variables
    const currentFolderIdRef = useRef(currentFolderId);
    useEffect(() => {
      currentFolderIdRef.current = currentFolderId;
    }, [currentFolderId]);

    // Function that will be called when user deletes files either using the toolbar
    // button or `Delete` key.
    const deleteFiles = useCallback(async (files: CustomFileData[]) => {
      // We use the so-called "functional update" to set the new file map. This
      // lets us access the current file map value without having to track it
      // explicitly. Read more about it here:
      // https://reactjs.org/docs/hooks-reference.html#functional-updates

      var defaultFiles: any = [...files];

      var member_id = await getMemberID();
      var pathName: string = "";
      if (currentFolderIdRef.current > 0)
        pathName =
          fileMap[currentFolderIdRef.current].parentPath +
          "/" +
          fileMap[currentFolderIdRef.current].name;
      if (files[0].isDir) {
        await HttpClient.post("FileManager/DeleteFolder", {
          folderName:
            "Member" + member_id + pathName + "/" + defaultFiles[0].name,
        });
      } else {
        await HttpClient.post("FileManager/DeleteFile", {
          fileName:
            "Member" + member_id + pathName + "/" + defaultFiles[0].name,
        });
      }

      setFileMap((currentFileMap) => {
        // Create a copy of the file map to make sure we don't mutate it.

        const newFileMap = { ...currentFileMap };

        files.forEach((file) => {
          // Delete file from the file map.
          delete newFileMap[file.id];

          // Update the parent folder to make sure it doesn't try to load the
          // file we just deleted.
          if (file.parentId) {
            const parent = newFileMap[file.parentId]!;
            const newChildrenIds = parent.childrenIds!.filter(
              (id) => id !== file.id
            );
            newFileMap[file.parentId] = {
              ...parent,
              childrenIds: newChildrenIds,
              childrenCount: newChildrenIds.length,
            };
          }
        });

        return newFileMap;
      });
    }, []);

    // Function that will be called when files are moved from one folder to another
    // using drag & drop.
    const moveFiles = useCallback(
      (
        files: CustomFileData[],
        source: CustomFileData,
        destination: CustomFileData
      ) => {
        setFileMap((currentFileMap) => {
          const newFileMap = { ...currentFileMap };
          const moveFileIds = new Set(files.map((f) => f.id));

          // Delete files from their source folder.
          const newSourceChildrenIds = source.childrenIds!.filter(
            (id) => !moveFileIds.has(id)
          );
          newFileMap[source.id] = {
            ...source,
            childrenIds: newSourceChildrenIds,
            childrenCount: newSourceChildrenIds.length,
          };

          // Add the files to their destination folder.
          const newDestinationChildrenIds = [
            ...destination.childrenIds!,
            ...files.map((f) => f.id),
          ];
          newFileMap[destination.id] = {
            ...destination,
            childrenIds: newDestinationChildrenIds,
            childrenCount: newDestinationChildrenIds.length,
          };

          // Finally, update the parent folder ID on the files from source folder
          // ID to the destination folder ID.
          files.forEach((file) => {
            newFileMap[file.id] = {
              ...file,
              parentId: destination.id,
            };
          });

          return newFileMap;
        });
      },
      []
    );

    // Function that will be called when user creates a new folder using the toolbar
    // button. That that we use incremental integer IDs for new folder, but this is
    // not a good practice in production! Instead, you should use something like UUIDs
    // or MD5 hashes for file paths.
    const idCounter = useRef(0);
    const createFolder = useCallback(async (folderName: string) => {
      var member_id = await getMemberID();
      var pathName: string = "";
      if (currentFolderIdRef.current > 0)
        pathName =
          fileMap[currentFolderIdRef.current].parentPath +
          "/" +
          fileMap[currentFolderIdRef.current].name;

      var c = 0;

      setFileMap((currentFileMap) => {
        const newFileMap = { ...currentFileMap };
        for (var z in currentFileMap) {
          var f = currentFileMap[z];

          if (
            f.name.indexOf(folderName) >= 0 &&
            f.parentId === currentFolderIdRef.current &&
            f.isDir
          )
            c++;
        }

        if (c > 0) folderName = folderName + "(" + c + ")";

        // Create the new folder
        const newFolderId = `new-folder-${idCounter.current++}`;
        newFileMap[newFolderId] = {
          id: newFolderId,
          name: folderName,
          isDir: true,
          modDate: new Date(),
          parentId: currentFolderIdRef.current,
          childrenIds: [],
          childrenCount: 0,
          parentPath: pathName,
        };

        // Update parent folder to reference the new folder.
        const parent = newFileMap[currentFolderIdRef.current];
        newFileMap[currentFolderIdRef.current] = {
          ...parent,
          childrenIds: [...parent.childrenIds!, newFolderId],
        };

        return newFileMap;
      });

      await HttpClient.post("FileManager/CreateFolder", {
        folderName: "Member" + member_id + pathName + "/" + folderName,
      });
    }, []);

    const uploadFile = useCallback(async (newFilesArr: any) => {
      var member_id = await getMemberID();
      var pathName: String = "";
      if (currentFolderIdRef.current > 0)
        pathName =
          fileMap[currentFolderIdRef.current].parentPath +
          "/" +
          fileMap[currentFolderIdRef.current].name;

      var c = 0;
      var fileName;
      var extension;

      setFileMap((currentFileMap: any): any => {
        const newFileMap = { ...currentFileMap };

        fileName = newFilesArr[0].name.substr(
          0,
          newFilesArr[0].name.indexOf(".")
        );
        extension = newFilesArr[0].name.substr(
          newFilesArr[0].name.indexOf("."),
          newFilesArr[0].name.length - 1
        );
        for (var z in currentFileMap) {
          var f = currentFileMap[z];

          if (
            f.name.indexOf(fileName) >= 0 &&
            f.parentId === currentFolderIdRef.current &&
            !f.isDir
          )
            c++;
        }

        // Create the new file
        for (var i = 0; i < newFilesArr.length; i++) {
          var value = newFilesArr[i];
          const newFileId = `new-file-${idCounter.current++}`;
          newFileMap[newFileId] = {
            id: newFileId,
            name: c > 0 ? fileName + "(" + c + ")" + extension : value.name,
            //name: value.name,
            modDate: new Date(),
            parentId: currentFolderIdRef.current,
            parentPath: pathName,
            isDir: false,
          };
          const parent = newFileMap[currentFolderIdRef.current];
          newFileMap[currentFolderIdRef.current] = {
            ...parent,
            childrenIds: [...parent.childrenIds!, newFileId],
          };
        }
        return newFileMap;
      });

      var data = new FormData();
      data.append("uploadedFile", newFilesArr[0]);

      var oldPath: string = await HttpClient.upload(
        "FileManager/UploadFile",
        data
      );

      await HttpClient.post("FileManager/RenameFile", {
        newPath:
          "Member" +
          member_id +
          pathName +
          "/" +
          (c > 0 ? fileName + "(" + c + ")" + extension : newFilesArr[0].name),
        oldPath: oldPath,
        member_id: member_id,
      });

      // Update parent folder to reference the new folder.
    }, []);

    const downloadFiles = useCallback(() => {}, []);

    return {
      fileMap,
      currentFolderId,
      setCurrentFolderId,
      resetFileMap,
      deleteFiles,
      moveFiles,
      createFolder,
      uploadFile,
      downloadFiles,
    };
  };

  const {
    fileMap,
    currentFolderId,
    setCurrentFolderId,
    resetFileMap,
    deleteFiles,
    moveFiles,
    createFolder,
    uploadFile,
    downloadFiles,
  } = useCustomFileMap();

  const files = useFiles(fileMap, currentFolderId);
  const folderChain = useFolderChain(fileMap, currentFolderId);
  const handleFileAction = useFileActionHandler(
    setCurrentFolderId,
    deleteFiles,
    moveFiles,
    createFolder,
    uploadFile,
    downloadFiles
  );

  const fileActions = [
    ChonkyActions.CreateFolder,
    ChonkyActions.UploadFiles,
    ChonkyActions.DeleteFiles,
    ChonkyActions.DownloadFiles,
  ];

  const thumbnailGenerator = useCallback((file: FileData) => {
    return file.thumbnailUrl ? `https://chonky.io${file.thumbnailUrl}` : null;
  }, []);

  return (
    <>
      <div style={{ height: "90%" }}>
        <FullFileBrowser
          files={files}
          folderChain={folderChain}
          fileActions={fileActions}
          onFileAction={handleFileAction}
          thumbnailGenerator={thumbnailGenerator}
          {...props}
        />
      </div>
    </>
  );
});
